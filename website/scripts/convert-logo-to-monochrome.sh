#!/usr/bin/env bash
# convert-logo-to-monochrome.sh
#
# Converts colored logos (PNG/JPG/SVG) to clean monochrome SVGs with normalized padding.
#
# Dependencies:
#   - imagemagick (provides 'convert' command)
#   - potrace (for raster-to-SVG tracing)
#
# Usage:
#   bash convert-logo-to-monochrome.sh input.png output.svg [--color "#E5E7EB"]
#
# Examples:
#   bash convert-logo-to-monochrome.sh logo.png logo-mono.svg
#   bash convert-logo-to-monochrome.sh logo.jpg logo-mono.svg --color "#D1D5DB"

set -euo pipefail

# Check dependencies
check_dependencies() {
    local missing=()
    
    if ! command -v convert >/dev/null 2>&1; then
        missing+=("imagemagick (provides 'convert' command)")
    fi
    
    if ! command -v potrace >/dev/null 2>&1; then
        missing+=("potrace")
    fi
    
    if [ ${#missing[@]} -gt 0 ]; then
        echo "ERROR: Missing required dependencies:" >&2
        for dep in "${missing[@]}"; do
            echo "  - $dep" >&2
        done
        echo "" >&2
        echo "Install instructions:" >&2
        echo "  Ubuntu/Debian: sudo apt-get install imagemagick potrace" >&2
        echo "  macOS: brew install imagemagick potrace" >&2
        echo "  Fedora/RHEL: sudo dnf install imagemagick potrace" >&2
        return 1
    fi
}

# Show usage
usage() {
    echo "Usage: $0 <input-file> <output-file> [--color COLOR]"
    echo ""
    echo "Arguments:"
    echo "  input-file   Path to input image (PNG/JPG/SVG)"
    echo "  output-file  Path to output SVG file"
    echo "  --color      Optional hex color for output (default: #E5E7EB)"
    echo ""
    echo "Example:"
    echo "  $0 logo.png logo-mono.svg --color \"#D1D5DB\""
}

# Parse arguments
parse_args() {
    if [ $# -lt 2 ]; then
        usage
        return 1
    fi
    
    INPUT_FILE="$1"
    OUTPUT_FILE="$2"
    COLOR="#E5E7EB"
    
    shift 2
    
    while [ $# -gt 0 ]; do
        case "$1" in
            --color)
                if [ $# -lt 2 ]; then
                    echo "ERROR: --color requires a value" >&2
                    return 1
                fi
                COLOR="$2"
                shift 2
                ;;
            *)
                echo "ERROR: Unknown argument: $1" >&2
                usage
                return 1
                ;;
        esac
    done
}

# Validate input file
validate_input() {
    if [ ! -f "$INPUT_FILE" ]; then
        echo "ERROR: Input file does not exist: $INPUT_FILE" >&2
        return 1
    fi
    
    local ext="${INPUT_FILE##*.}"
    ext="${ext,,}"  # Convert to lowercase
    
    case "$ext" in
        png|jpg|jpeg|svg)
            return 0
            ;;
        *)
            echo "ERROR: Unsupported file format: .$ext" >&2
            echo "Supported formats: PNG, JPG, JPEG, SVG" >&2
            return 1
            ;;
    esac
}

# Convert image to monochrome SVG
convert_to_monochrome() {
    local input="$INPUT_FILE"
    local output="$OUTPUT_FILE"
    local color="$COLOR"
    
    # Create temporary directory
    local tmpdir
    tmpdir=$(mktemp -d)
    trap 'rm -rf "$tmpdir"' EXIT
    
    local ext="${input##*.}"
    ext="${ext,,}"
    
    # Step 1: Convert to grayscale bitmap with normalized padding
    local bmp="$tmpdir/temp.bmp"
    
    if [ "$ext" = "svg" ]; then
        # For SVG input, rasterize first
        convert "$input" -background white -flatten -colorspace Gray -resize 1000x1000 -gravity center -extent 1200x1200 "$bmp"
    else
        # For raster input (PNG/JPG)
        convert "$input" -background white -flatten -colorspace Gray -resize 1000x1000 -gravity center -extent 1200x1200 "$bmp"
    fi
    
    # Step 2: Apply threshold to get clean black/white
    local bmp_threshold="$tmpdir/threshold.bmp"
    convert "$bmp" -threshold 50% "$bmp_threshold"
    
    # Step 3: Trace to SVG using potrace
    local svg_mono="$tmpdir/mono.svg"
    potrace "$bmp_threshold" -s -o "$svg_mono" 2>/dev/null || {
        echo "ERROR: potrace conversion failed" >&2
        return 1
    }
    
    # Step 4: Replace black color with specified color
    if [ "$color" != "#000000" ] && [ "$color" != "black" ]; then
        sed "s/fill=\"#000000\"/fill=\"$color\"/g; s/fill=\"black\"/fill=\"$color\"/g" "$svg_mono" > "$output"
    else
        cp "$svg_mono" "$output"
    fi
    
    echo "✓ Successfully converted: $input -> $output (color: $color)"
}

# Main execution
main() {
    check_dependencies || exit 1
    parse_args "$@" || exit 1
    validate_input || exit 1
    convert_to_monochrome || exit 1
}

main "$@"
