#!/bin/bash

# SCSS Watch Script with Version Auto-Add
# Usage: ./watch-scss.sh

echo "🔍 Watching SCSS files for changes..."
echo "📦 Auto-compiling bundle_en.css, main_en.css, styles_en_override.css, layout_en_override.css"
echo "🔢 Auto-adding version query parameters to @import statements"
echo "Press Ctrl+C to stop"
echo ""

# Function to add version to bundle_en.css after compilation
add_version() {
    python3 add_version_to_bundle.py
}

# Watch all SCSS files in the scss directory
# When any .scss file changes, it will recompile
# After compilation, automatically add version to bundle_en.css
sass --watch type/www/scss:type/www/css --style=expanded &
SASS_PID=$!

# Watch for bundle_en.css changes and add version
while true; do
    if [ -f "type/www/css/bundle_en.css" ]; then
        # Wait a bit for file to be fully written
        sleep 0.5
        add_version
    fi
    sleep 1
done &

VERSION_PID=$!

# Wait for sass process
wait $SASS_PID

# Cleanup
kill $VERSION_PID 2>/dev/null
