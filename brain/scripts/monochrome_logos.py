#!/usr/bin/env python3
"""Monochrome-stamp conversion for SVG logos.

Converts colored SVGs under:
  ../website/public/logos/_colored
into stamped monochrome SVGs written to:
  ../website/public/logos

Design goals:
- Preserve geometry (paths, viewBox, transforms, ids, masks/clipPaths)
- Remap colors (fill/stroke/stop-color/color) based on relative luminance
- Preserve existing alpha (do not “blow out” transparency)
- Never output pure white (#ffffff); lightest tone is off-white
- Ensure any explicit background rectangle is made transparent so the logo
  comps correctly on any page background.

No external dependencies; uses stdlib XML parsing.

Run:
  python3 scripts/monochrome_logos.py

Notes:
- This script WILL make “obvious white hole” shapes transparent (in addition to
  full-canvas background rects). “Obvious” is defined conservatively as:
  - fill is pure/near white (e.g. #fff, #ffffff, rgb(255,255,255), rgba(...,1))
  - effective (opacity * fill-opacity) is ~1
  - stroke is missing/none/transparent
  This targets common exported logo artifacts like a white inner circle placed
  above a gradient ring.
"""

from __future__ import annotations

import re
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Optional, Tuple


# Target palette (IMPORTANT: never pure white)
LIGHT = "#fbfaf8"  # off-white so it won't disappear on #ffffff
MID = "#f3f0ec"
DARK = "#e6e1d8"


HEX_RE = re.compile(r"^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$")
RGB_RE = re.compile(r"^rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)$")
RGBA_RE = re.compile(
    r"^rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9.]+)\s*\)$"
)

STYLE_DECL_RE = re.compile(r"(?P<prop>[a-zA-Z\-]+)\s*:\s*(?P<val>[^;]+)\s*;?")

COLOR_PROPS = {"fill", "stroke", "stop-color", "color"}
OPACITY_PROPS = {"opacity", "fill-opacity", "stroke-opacity", "stop-opacity"}

# Threshold: if luminance is at/above this, and the element is an un-stroked filled shape,
# treat it as an intentional "hole" artifact and make it transparent.
WHITE_HOLE_LUMINANCE_THRESHOLD = 0.985

# If effective opacity (opacity * fill-opacity) is below this, we won't punch it out.
WHITE_HOLE_EFFECTIVE_OPACITY_MIN = 0.95


@dataclass(frozen=True)
class Palette:
    light: Tuple[int, int, int]
    mid: Tuple[int, int, int]
    dark: Tuple[int, int, int]


PALETTE = Palette(
    light=(0xFB, 0xFA, 0xF8),
    mid=(0xF3, 0xF0, 0xEC),
    dark=(0xE6, 0xE1, 0xD8),
)


def clamp01(x: float) -> float:
    if x < 0.0:
        return 0.0
    if x > 1.0:
        return 1.0
    return x


def hex_to_rgb(h: str) -> Tuple[int, int, int]:
    h = h.strip().lstrip("#")
    if len(h) == 3:
        r, g, b = (int(h[0] * 2, 16), int(h[1] * 2, 16), int(h[2] * 2, 16))
    else:
        r, g, b = (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))
    return r, g, b


def rgb_to_hex(rgb: Tuple[int, int, int]) -> str:
    r, g, b = rgb
    return f"#{r:02x}{g:02x}{b:02x}"


def parse_color(value: str) -> Optional[Tuple[int, int, int]]:
    if value is None:
        return None
    v = value.strip().lower()

    # Preserve these semantics
    if v in {"none", "transparent", "currentcolor", "inherit"}:
        return None

    if HEX_RE.match(v):
        return hex_to_rgb(v)

    m = RGB_RE.match(v)
    if m:
        r, g, b = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        return (max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b)))

    m = RGBA_RE.match(v)
    if m:
        r, g, b = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        return (max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b)))

    # Named colors and other formats not handled: safe fallback = don't change
    return None


def srgb_to_linear(c_255: int) -> float:
    c = c_255 / 255.0
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def relative_luminance(rgb: Tuple[int, int, int]) -> float:
    r, g, b = rgb
    R = srgb_to_linear(r)
    G = srgb_to_linear(g)
    B = srgb_to_linear(b)
    return 0.2126 * R + 0.7152 * G + 0.0722 * B


def lerp(a: int, b: int, t: float) -> int:
    return int(round(a + (b - a) * t))


def blend(c1: Tuple[int, int, int], c2: Tuple[int, int, int], t: float) -> Tuple[int, int, int]:
    t = clamp01(t)
    return (lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t))


def map_luminance_to_palette(lum: float, pivot: float = 0.70) -> Tuple[int, int, int]:
    """Piecewise mapping luminance -> palette.

    0.0 .. pivot => DARK -> MID
    pivot .. 1.0 => MID  -> LIGHT
    """

    lum = clamp01(lum)
    if lum <= pivot:
        t = lum / pivot if pivot > 0 else 0.0
        return blend(PALETTE.dark, PALETTE.mid, t)

    t = (lum - pivot) / (1.0 - pivot) if (1.0 - pivot) > 0 else 1.0
    return blend(PALETTE.mid, PALETTE.light, t)


def _strip_ns(tag: str) -> str:
    # ET tag is either "{ns}local" or "local"
    if tag.startswith("{"):
        return tag.split("}", 1)[1]
    return tag


def _parse_style(style: str) -> list[tuple[str, str]]:
    """Parse style string into ordered list of (prop, val).

    Preserves unknown props and order (important for minimizing diffs).
    """

    if not style:
        return []

    decls: list[tuple[str, str]] = []
    # We do a permissive parse; if it doesn't match well, just return raw.
    for m in STYLE_DECL_RE.finditer(style):
        prop = m.group("prop").strip()
        val = m.group("val").strip()
        decls.append((prop, val))
    return decls


def _serialize_style(decls: list[tuple[str, str]]) -> str:
    return "; ".join([f"{k}: {v}" for (k, v) in decls if k])


def remap_color_value(value: str) -> str:
    rgb = parse_color(value)
    if rgb is None:
        return value

    lum = relative_luminance(rgb)
    mapped = map_luminance_to_palette(lum)
    hx = rgb_to_hex(mapped)

    # Belt + suspenders: never introduce pure white
    if hx.lower() == "#ffffff":
        return LIGHT

    return hx


def remap_style_attr(style: str) -> str:
    decls = _parse_style(style)
    if not decls:
        return style

    out: list[tuple[str, str]] = []
    for prop, val in decls:
        prop_l = prop.strip().lower()
        if prop_l in COLOR_PROPS:
            out.append((prop, remap_color_value(val)))
        else:
            out.append((prop, val))

    serialized = _serialize_style(out)
    return serialized.replace("#ffffff", LIGHT)


def get_style_prop(style: str, prop_name: str) -> Optional[str]:
    if not style:
        return None
    pn = prop_name.strip().lower()
    for prop, val in _parse_style(style):
        if prop.strip().lower() == pn:
            return val.strip()
    return None


def parse_opacity(value: Optional[str]) -> Optional[float]:
    if value is None:
        return None
    v = value.strip().lower()
    if not v:
        return None
    if v.endswith("%"):
        try:
            return float(v[:-1]) / 100.0
        except ValueError:
            return None
    try:
        return float(v)
    except ValueError:
        return None


def effective_fill_opacity(el: ET.Element) -> float:
    """Compute effective fill visibility multiplier from opacity attributes/styles.

    This does NOT change anything; it is only used for the "white hole" heuristic.
    """

    style = el.get("style") or ""

    opacity = parse_opacity(el.get("opacity"))
    if opacity is None:
        opacity = parse_opacity(get_style_prop(style, "opacity"))

    fill_opacity = parse_opacity(el.get("fill-opacity"))
    if fill_opacity is None:
        fill_opacity = parse_opacity(get_style_prop(style, "fill-opacity"))

    # If unspecified, SVG defaults are 1.
    if opacity is None:
        opacity = 1.0
    if fill_opacity is None:
        fill_opacity = 1.0

    return clamp01(opacity) * clamp01(fill_opacity)


def element_has_stroke(el: ET.Element) -> bool:
    style = el.get("style") or ""

    stroke = el.get("stroke")
    if stroke is None:
        stroke = get_style_prop(style, "stroke")

    if stroke is None:
        return False

    s = stroke.strip().lower()
    return s not in {"none", "transparent"}


def element_fill_value(el: ET.Element) -> Optional[str]:
    style = el.get("style") or ""

    fill = el.get("fill")
    if fill is None:
        fill = get_style_prop(style, "fill")

    return fill


def should_punch_out_white_hole(el: ET.Element) -> bool:
    """Decide if an element is an "obvious internal white" to make transparent.

    Conservative by design to avoid destroying intentional highlights.
    """

    tag = _strip_ns(el.tag)
    # Only consider paintable shapes; skip gradient stops and structural elements.
    if tag in {
        "svg",
        "defs",
        "linearGradient",
        "radialGradient",
        "stop",
        "clipPath",
        "mask",
        "pattern",
        "filter",
        "metadata",
        "title",
        "desc",
        "style",
        "g",
    }:
        return False

    fill_val = element_fill_value(el)
    if fill_val is None:
        return False

    fv = fill_val.strip().lower()
    if fv in {"none", "transparent"}:
        return False

    # If fill is a gradient/url(), don't punch it out.
    if fv.startswith("url("):
        return False

    rgb = parse_color(fill_val)
    if rgb is None:
        return False

    lum = relative_luminance(rgb)
    if lum < WHITE_HOLE_LUMINANCE_THRESHOLD:
        return False

    if element_has_stroke(el):
        return False

    if effective_fill_opacity(el) < WHITE_HOLE_EFFECTIVE_OPACITY_MIN:
        return False

    return True


def make_element_fill_transparent(el: ET.Element) -> None:
    # Legacy behavior (kept for callers that want it): hide the element.
    # Note: this does NOT create a cut-out; it only removes paint.
    el.set("fill", "none")

    style = el.get("style")
    if style:
        decls = _parse_style(style)
        out: list[tuple[str, str]] = []
        for prop, val in decls:
            if prop.strip().lower() == "fill":
                out.append((prop, "none"))
            else:
                out.append((prop, val))
        el.set("style", _serialize_style(out))


def _ns_uri(tag: str) -> Optional[str]:
    if tag.startswith("{") and "}" in tag:
        return tag[1:].split("}", 1)[0]
    return None


def _mk_tag(root: ET.Element, local: str) -> str:
    ns = _ns_uri(root.tag)
    return f"{{{ns}}}{local}" if ns else local


def _ensure_defs(root: ET.Element) -> ET.Element:
    for child in list(root):
        if _strip_ns(child.tag) == "defs":
            return child
    defs_el = ET.Element(_mk_tag(root, "defs"))
    # Put defs first for readability/compat.
    root.insert(0, defs_el)
    return defs_el


def _unique_id(existing: set[str], base: str) -> str:
    if base not in existing:
        existing.add(base)
        return base
    i = 2
    while f"{base}-{i}" in existing:
        i += 1
    out = f"{base}-{i}"
    existing.add(out)
    return out


def apply_punchout_mask(root: ET.Element, punch_elems: list[ET.Element]) -> None:
    """Apply a mask that subtracts punch_elems from the rendered artwork.

    This is what makes white circles become true transparent holes instead of
    being mapped to off-white fills.
    """

    if not punch_elems:
        return

    defs_el = _ensure_defs(root)

    existing_ids: set[str] = set()
    for el in root.iter():
        el_id = el.get("id")
        if el_id:
            existing_ids.add(el_id)

    mask_id = _unique_id(existing_ids, "mono-punch")

    mask_el = ET.SubElement(defs_el, _mk_tag(root, "mask"), {"id": mask_id})

    # White background = fully visible.
    ET.SubElement(
        mask_el,
        _mk_tag(root, "rect"),
        {
            "x": "0",
            "y": "0",
            "width": "100%",
            "height": "100%",
            "fill": "white",
        },
    )

    # Black shapes = punched out.
    for el in punch_elems:
        clone = ET.fromstring(ET.tostring(el, encoding="unicode"))
        # Ensure it is solid black in the mask, regardless of original style.
        clone.attrib.pop("style", None)
        clone.set("fill", "black")
        clone.set("stroke", "black")
        clone.attrib.pop("opacity", None)
        clone.attrib.pop("fill-opacity", None)
        clone.attrib.pop("stroke-opacity", None)
        mask_el.append(clone)

    # Wrap all non-defs children into a group with the mask applied.
    masked_group = ET.Element(_mk_tag(root, "g"), {"mask": f"url(#{mask_id})"})

    # Move children (except defs) into the masked group.
    for child in list(root):
        if _strip_ns(child.tag) == "defs":
            continue
        root.remove(child)
        masked_group.append(child)

    root.append(masked_group)


def parse_viewbox(svg_el: ET.Element) -> Optional[Tuple[float, float, float, float]]:
    vb = svg_el.get("viewBox") or svg_el.get("viewbox")
    if not vb:
        return None

    parts = re.split(r"[\s,]+", vb.strip())
    if len(parts) != 4:
        return None

    try:
        return (float(parts[0]), float(parts[1]), float(parts[2]), float(parts[3]))
    except ValueError:
        return None


def _is_zeroish(v: Optional[str]) -> bool:
    if v is None:
        return True
    vv = v.strip()
    return vv in {"0", "0.0", "0px"}


def _parse_num(v: str) -> Optional[float]:
    if v is None:
        return None
    vv = v.strip().lower()
    if vv.endswith("px"):
        vv = vv[:-2]
    try:
        return float(vv)
    except ValueError:
        return None


def is_background_rect(rect_el: ET.Element, svg_el: ET.Element) -> bool:
    """Heuristic: detect a canvas/background rect.

    We only want to remove obvious background blocks (full-canvas rects), not
    interior design elements.
    """

    if _strip_ns(rect_el.tag) != "rect":
        return False

    # Avoid touching rounded rects or transformed rects (often logo geometry)
    if rect_el.get("rx") or rect_el.get("ry") or rect_el.get("transform"):
        return False

    # Must have a fill (either attr or style); if there's no fill, it's not a background.
    fill = rect_el.get("fill")
    style = rect_el.get("style") or ""
    style_fill = None
    for prop, val in _parse_style(style):
        if prop.strip().lower() == "fill":
            style_fill = val
            break

    effective_fill = fill if fill is not None else style_fill
    if effective_fill is None:
        return False

    if effective_fill.strip().lower() in {"none", "transparent"}:
        return False

    # Must start at origin.
    if not _is_zeroish(rect_el.get("x")) or not _is_zeroish(rect_el.get("y")):
        return False

    w = rect_el.get("width")
    h = rect_el.get("height")
    if not w or not h:
        return False

    # Accept percentage full canvas.
    if w.strip() == "100%" and h.strip() == "100%":
        return True

    vb = parse_viewbox(svg_el)
    if vb is None:
        return False

    _, _, vb_w, vb_h = vb

    wn = _parse_num(w)
    hn = _parse_num(h)
    if wn is None or hn is None:
        return False

    # Allow small tolerance: some tools export 512, 512.0 etc.
    tol = 1e-3
    return abs(wn - vb_w) <= tol and abs(hn - vb_h) <= tol


def make_rect_transparent(rect_el: ET.Element) -> None:
    """Make an explicit background rect transparent without removing geometry."""

    # Prefer fill="none" because it keeps shape but doesn't paint.
    rect_el.set("fill", "none")

    # Preserve opacity attributes rather than overriding them.
    # If style contains fill, update it.
    style = rect_el.get("style")
    if style:
        decls = _parse_style(style)
        out: list[tuple[str, str]] = []
        for prop, val in decls:
            if prop.strip().lower() == "fill":
                out.append((prop, "none"))
            else:
                out.append((prop, val))
        rect_el.set("style", _serialize_style(out))


def remap_svg_tree(tree: ET.ElementTree) -> None:
    root = tree.getroot()

    # 1) Background removal: look for full-canvas rects directly under svg or as first child of a top-level <g>.
    for child in list(root):
        if is_background_rect(child, root):
            make_rect_transparent(child)
            continue

        # Common pattern: <svg><g><rect width="100%" height="100%" .../></g> ...
        if _strip_ns(child.tag) == "g":
            for gchild in list(child)[:2]:  # only inspect first couple elements; background usually first
                if is_background_rect(gchild, root):
                    make_rect_transparent(gchild)

    # 2) Punch out "obvious internal whites" (e.g. white dots / inner circle sitting on top of a gradient)
    #
    # Important: to create *real* holes (not just invisible paint), we build a mask
    # and apply it to the artwork.
    punch_elems: list[ET.Element] = []
    for el in root.iter():
        if should_punch_out_white_hole(el):
            punch_elems.append(el)

    if punch_elems:
        # Remove the original punch elements so they don't render as shapes.
        for el in punch_elems:
            parent = None
            for candidate in root.iter():
                if el in list(candidate):
                    parent = candidate
                    break
            if parent is not None:
                parent.remove(el)

        apply_punchout_mask(root, punch_elems)

    # 3) Remap all elements for attr colors and style colors.
    for el in root.iter():
        # style="..."
        style = el.get("style")
        if style:
            el.set("style", remap_style_attr(style))

        # direct attrs
        for attr in list(el.attrib.keys()):
            attr_l = attr.lower()
            if attr_l in COLOR_PROPS:
                val = el.get(attr)
                if val is None:
                    continue
                v_l = val.strip().lower()
                if v_l in {"none", "transparent", "currentcolor", "inherit"}:
                    continue
                el.set(attr, remap_color_value(val))

    # Global safeguard
    xml = ET.tostring(root, encoding="unicode")
    if "#ffffff" in xml.lower():
        # Reparse after replacement to avoid missing text nodes; this is conservative.
        fixed = re.sub(r"#ffffff\b", LIGHT, xml, flags=re.IGNORECASE)
        tree._setroot(ET.fromstring(fixed))


def iter_svg_files(in_dir: Path) -> list[Path]:
    return sorted([p for p in in_dir.rglob("*.svg") if p.is_file()])


def main() -> int:
    here = Path(__file__).resolve()
    brain_root = here.parents[1]
    website_root = brain_root.parent / "website"

    in_dir = website_root / "public" / "logos" / "_colored"
    out_dir = website_root / "public" / "logos"

    if not in_dir.exists():
        print(f"ERROR: input folder not found: {in_dir}", file=sys.stderr)
        print(
            "This script expects to be run from the brain repo with a sibling 'website/' directory.",
            file=sys.stderr,
        )
        return 2

    out_dir.mkdir(parents=True, exist_ok=True)

    svgs = iter_svg_files(in_dir)
    if not svgs:
        print(f"No SVG files found in: {in_dir}")
        return 0

    count = 0
    for src in svgs:
        rel = src.relative_to(in_dir)

        # Output naming: strip "-color" suffix from filename (logo-01-color.svg -> logo-01.svg)
        # while preserving relative subdirectories.
        out_name = rel.name.replace("-color.svg", ".svg")
        if out_name == rel.name:
            out_name = rel.stem.replace("-color", "") + rel.suffix

        dst = out_dir / rel.parent / out_name
        dst.parent.mkdir(parents=True, exist_ok=True)

        try:
            tree = ET.parse(src)
        except ET.ParseError:
            # Some SVGs contain leading BOM or weirdness; fall back to text-based replacement
            txt = src.read_text(encoding="utf-8", errors="replace")
            # Minimal safe behavior: just avoid pure white
            dst.write_text(re.sub(r"#ffffff\b", LIGHT, txt, flags=re.IGNORECASE), encoding="utf-8")
            print(f"⚠ {rel} (parse error; wrote minimal-safe output)")
            count += 1
            continue

        remap_svg_tree(tree)

        # Write without XML declaration (typical for SVG assets)
        xml_out = ET.tostring(tree.getroot(), encoding="unicode")
        xml_out = re.sub(r"#ffffff\b", LIGHT, xml_out, flags=re.IGNORECASE)
        dst.write_text(xml_out, encoding="utf-8")
        print(f"✔ {rel}")
        count += 1

    print(f"\nDone. Wrote {count} file(s) to: {out_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
