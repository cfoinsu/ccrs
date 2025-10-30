#!/bin/bash

# SCSS Watch Script
# Usage: ./watch-scss.sh

echo "🔍 Watching SCSS files for changes..."
echo "📦 Auto-compiling en.bundle.css"
echo "Press Ctrl+C to stop"
echo ""

sass --watch type/www/scss/en.bundle.scss:type/www/css/en.bundle.css
