#!/usr/bin/env python3
"""
Add common.js script to HTML files that don't have it
"""

import os
import re
from pathlib import Path

def add_common_js_to_file(file_path):
    """
    Add common.js script tag to HTML file if it doesn't exist
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if common.js already exists
    if 'common.js' in content:
        print(f"⏭️  Skip (already has common.js): {file_path}")
        return False

    # Find the init.js script tag
    init_pattern = r'(<script src="includes/init\.js(?:\?ver=[\d.]+)?"></script>)'

    if re.search(init_pattern, content):
        # Add common.js before init.js
        new_content = re.sub(
            init_pattern,
            r'<script src="/type/www/js/common.js?ver=1.9"></script>\n    \1',
            content
        )

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ Added common.js: {file_path}")
        return True
    else:
        # Try to find other script patterns and add before closing body tag
        body_close_pattern = r'(</body>)'

        if re.search(body_close_pattern, content):
            # Find all script tags before </body>
            script_section_pattern = r'(<script[^>]*>.*?</script>\s*)+\s*(</body>)'

            match = re.search(script_section_pattern, content, re.DOTALL)
            if match:
                scripts_section = match.group(0)
                # Check if we can insert before the last script tag
                last_script_pattern = r'(<script[^>]*>[^<]*</script>)\s*(</body>)'

                new_content = re.sub(
                    last_script_pattern,
                    r'<script src="/type/www/js/common.js?ver=1.9"></script>\n    \1\n\2',
                    content
                )

                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

                    print(f"✅ Added common.js (before body): {file_path}")
                    return True

        print(f"⚠️  Could not add (no suitable location): {file_path}")
        return False

def main():
    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # Get all HTML files (excluding includes directory)
    html_files = [
        f for f in html_dir.glob('*.html')
        if f.is_file() and 'includes' not in str(f)
    ]

    print(f"Found {len(html_files)} HTML files\n")

    success_count = 0
    skip_count = 0
    fail_count = 0

    for html_file in sorted(html_files):
        result = add_common_js_to_file(html_file)
        if result is True:
            success_count += 1
        elif result is False and 'already has' in str(result):
            skip_count += 1
        else:
            fail_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Successfully added: {success_count} files")
    print(f"⏭️  Skipped (already have common.js): {skip_count} files")
    print(f"⚠️  Failed: {fail_count} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
