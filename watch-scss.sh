#!/bin/bash

# SCSS Watch Script
# Usage: ./watch-scss.sh

echo "🔍 Watching SCSS files for changes..."
echo "📦 Auto-compiling bundle_en.css, main_en.css, styles_en_override.css, layout_en_override.css"
echo "Press Ctrl+C to stop"
echo ""

# Watch all SCSS files in the scss directory
# When any .scss file changes, it will recompile
sass --watch type/www/scss:type/www/css --style=expanded
