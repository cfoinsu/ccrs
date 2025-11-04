#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add init.js to HTML files that are missing it
init.js가 없는 HTML 파일에 추가
"""

import re
from pathlib import Path

def add_init_js(file_path):
    """Add init.js to a file if it's missing"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if init.js already exists
    if 'includes/init.js' in content:
        return False

    # Skip test files
    test_files = ['chat.html', 'work.html', 'work_2.html', 'youtube.html',
                  'loadingbar.html', 'sample_style.html', 'sidemenu_stickey.html',
                  '이용수기_pdf.html']
    if file_path.name in test_files:
        return False

    # Pattern to find script section with jQuery, Swiper, AOS
    pattern = r'(<script src="/type/www/js/jquery-2\.2\.4\.min\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/plugins/swiper\.min\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/plugins/aos\.js\?ver=1\.9"></script>)'

    if re.search(pattern, content):
        # Add init.js after AOS
        replacement = r'\1\n    <script src="includes/init.js"></script>'
        content = re.sub(pattern, replacement, content)

        # Remove any trailing commented scripts or empty lines
        content = re.sub(r'(<script src="includes/init\.js"></script>)\s*<!--.*?-->\s*</body>', r'\1\n</body>', content, flags=re.DOTALL)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        return True

    return False

def main():
    """Add init.js to all HTML files missing it"""

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # Get all HTML files
    html_files = [f for f in html_dir.glob('*.html')
                  if not f.name.endswith('.backup')]

    success_count = 0
    skip_count = 0
    fail_count = 0
    failed_files = []

    print(f"총 {len(html_files)}개 파일 확인 중...\n")

    for file_path in sorted(html_files):
        # Check if init.js is missing
        with open(file_path, 'r', encoding='utf-8') as f:
            if 'includes/init.js' not in f.read():
                if add_init_js(file_path):
                    success_count += 1
                    print(f"✓ {file_path.name}")
                elif file_path.name in ['chat.html', 'work.html', 'work_2.html', 'youtube.html',
                                        'loadingbar.html', 'sample_style.html', 'sidemenu_stickey.html',
                                        '이용수기_pdf.html']:
                    skip_count += 1
                    print(f"⊘ {file_path.name} - 테스트 파일 스킵")
                else:
                    fail_count += 1
                    failed_files.append(file_path.name)
                    print(f"⚠ {file_path.name} - 패턴 매칭 실패")
            else:
                skip_count += 1

    print(f"\n추가 완료!")
    print(f"  - 성공: {success_count}개")
    print(f"  - 스킵: {skip_count}개 (이미 있거나 테스트 파일)")
    print(f"  - 실패: {fail_count}개")

    if failed_files:
        print(f"\n실패한 파일 목록:")
        for f in failed_files:
            print(f"  - {f}")

if __name__ == '__main__':
    main()
