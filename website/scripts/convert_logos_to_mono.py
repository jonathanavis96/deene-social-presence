#!/usr/bin/env python3
"""
convert_logos_to_mono.py

Converts colored SVG logos to monochrome SVGs by replacing fill/stroke colors.

Usage:
    python3 convert_logos_to_mono.py [--color COLOR]

Arguments:
    --color COLOR    Target monochrome color (default: #E5E7EB)

Input:  ../public/logos/_colored/*.svg
Output: ../public/logos/*.svg (e.g., logo-01-color.svg -> logo-01.svg)

The script:
- Reads all SVG files from ../public/logos/_colored/
- Replaces fill/stroke color values with the target monochrome color
- Preserves viewBox and other SVG attributes
- Outputs to ../public/logos/ with "-color" suffix removed
- Is idempotent: running multiple times produces the same output
"""

import re
import sys
from pathlib import Path
from typing import Optional


def convert_svg_to_mono(svg_content: str, target_color: str) -> str:
    """
    Convert SVG colors to monochrome by replacing fill/stroke attributes.
    
    Args:
        svg_content: Original SVG content
        target_color: Target monochrome color (e.g., "#E5E7EB")
    
    Returns:
        Modified SVG content with monochrome colors
    """
    # Replace fill="..." with target color (skip "none")
    svg_content = re.sub(
        r'fill="(?!none)[^"]*"',
        f'fill="{target_color}"',
        svg_content
    )
    
    # Replace stroke="..." with target color (skip "none")
    svg_content = re.sub(
        r'stroke="(?!none)[^"]*"',
        f'stroke="{target_color}"',
        svg_content
    )
    
    # Replace fill:... in style attributes (skip "none")
    svg_content = re.sub(
        r'fill:\s*(?!none)[^;}"]+',
        f'fill:{target_color}',
        svg_content
    )
    
    # Replace stroke:... in style attributes (skip "none")
    svg_content = re.sub(
        r'stroke:\s*(?!none)[^;}"]+',
        f'stroke:{target_color}',
        svg_content
    )
    
    return svg_content


def main(target_color: str = "#E5E7EB") -> None:
    """
    Main conversion logic.
    
    Args:
        target_color: Target monochrome color
    """
    # Get script directory and compute paths
    script_dir = Path(__file__).parent
    input_dir = script_dir.parent / "public" / "logos" / "_colored"
    output_dir = script_dir.parent / "public" / "logos"
    
    # Ensure input directory exists
    if not input_dir.exists():
        print(f"ERROR: Input directory not found: {input_dir}")
        sys.exit(1)
    
    # Ensure output directory exists
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Find all SVG files in input directory
    svg_files = sorted(input_dir.glob("*.svg"))
    
    if not svg_files:
        print(f"WARNING: No SVG files found in {input_dir}")
        return
    
    # Process each file
    converted_count = 0
    for input_path in svg_files:
        # Read input SVG
        svg_content = input_path.read_text(encoding="utf-8")
        
        # Convert to monochrome
        mono_content = convert_svg_to_mono(svg_content, target_color)
        
        # Determine output filename (remove "-color" suffix)
        output_filename = input_path.name.replace("-color.svg", ".svg")
        output_path = output_dir / output_filename
        
        # Write output SVG
        output_path.write_text(mono_content, encoding="utf-8")
        
        converted_count += 1
        print(f"✓ Converted: {input_path.name} -> {output_filename}")
    
    print(f"\nSuccessfully converted {converted_count} logo(s) to monochrome ({target_color})")


if __name__ == "__main__":
    # Parse command line arguments
    target_color = "#E5E7EB"  # Default monochrome color
    
    if len(sys.argv) > 1:
        if sys.argv[1] in ("-h", "--help"):
            print(__doc__)
            sys.exit(0)
        elif sys.argv[1] == "--color" and len(sys.argv) > 2:
            target_color = sys.argv[2]
        else:
            print(f"ERROR: Invalid arguments. Use --help for usage info.")
            sys.exit(1)
    
    main(target_color)
