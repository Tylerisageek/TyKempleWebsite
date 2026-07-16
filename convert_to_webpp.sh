#!/usr/bin/env bash
#
# convert_to_webp.sh
#
# Recursively converts image files found in ./Photos into .webp copies,
# mirroring the folder structure inside ./WEBP.
#
# Usage:
#   ./convert_to_webp.sh [source_dir] [dest_dir] [quality]
#
# Defaults:
#   source_dir = Photos
#   dest_dir   = WEBP
#   quality    = 80   (0-100, higher = better quality/larger file)
#
# Requires: ffmpeg installed and available on PATH.

set -euo pipefail

SRC_DIR="${1:-Photos}"
DEST_DIR="${2:-WEBP}"
QUALITY="${3:-80}"

# Image extensions to look for (case-insensitive)
EXTENSIONS=("jpg" "jpeg" "png" "bmp" "tiff" "tif" "gif")

if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed or not on PATH." >&2
    echo "Install it, e.g.:" >&2
    echo "  macOS:   brew install ffmpeg" >&2
    echo "  Ubuntu:  sudo apt install ffmpeg" >&2
    echo "  Windows: winget install ffmpeg" >&2
    exit 1
fi

if [ ! -d "$SRC_DIR" ]; then
    echo "Error: source folder '$SRC_DIR' does not exist." >&2
    exit 1
fi

mkdir -p "$DEST_DIR"

# Resolve both directories to absolute, normalized paths (no trailing slash,
# no leading "./", symlinks resolved). This is important: if SRC_DIR is left
# as a relative path with a trailing slash (e.g. "Photos/") or a leading
# "./" (e.g. "./Photos"), the later prefix-stripping step that computes each
# file's path relative to SRC_DIR can mismatch and cut into the folder name
# instead of removing it cleanly (this is what caused "Photos" to show up as
# "otos"). Using absolute paths guarantees the prefix always matches exactly.
SRC_DIR="$(cd "$SRC_DIR" && pwd)"
DEST_DIR="$(cd "$DEST_DIR" && pwd)"

# Build a find expression that matches any of the extensions, case-insensitively
FIND_EXPR=()
for ext in "${EXTENSIONS[@]}"; do
    if [ ${#FIND_EXPR[@]} -gt 0 ]; then
        FIND_EXPR+=(-o)
    fi
    FIND_EXPR+=(-iname "*.${ext}")
done

count=0
skipped=0

echo "Scanning '$SRC_DIR' for images..."

# Use find -print0 / read -d '' to safely handle spaces and special characters
while IFS= read -r -d '' file; do
    # Path of the file relative to SRC_DIR
    rel_path="${file#"$SRC_DIR"/}"
    rel_dir="$(dirname "$rel_path")"
    base_name="$(basename "$rel_path")"
    name_no_ext="${base_name%.*}"

    out_dir="$DEST_DIR"
    if [ "$rel_dir" != "." ]; then
        out_dir="$DEST_DIR/$rel_dir"
    fi
    mkdir -p "$out_dir"

    out_file="$out_dir/$name_no_ext.webp"

    if [ -f "$out_file" ]; then
        echo "Skip (already exists): $out_file"
        skipped=$((skipped + 1))
        continue
    fi

    echo "Converting: $file -> $out_file"
    if ffmpeg -y -loglevel error -i "$file" -quality "$QUALITY" "$out_file"; then
        count=$((count + 1))
    else
        echo "  Warning: failed to convert '$file'" >&2
    fi
done < <(find "$SRC_DIR" -type f \( "${FIND_EXPR[@]}" \) -print0)

echo ""
echo "Done. Converted: $count, Skipped (existing): $skipped"
