#!/usr/bin/env python3
import os
import re
from pathlib import Path

# html_en 디렉토리의 모든 HTML 파일 찾기
html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html_en')
html_files = list(html_dir.glob('*.html'))

print(f"Found {len(html_files)} HTML files")

for html_file in html_files:
    print(f"\nProcessing: {html_file.name}")

    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Header 부분을 placeholder로 교체
    header_pattern = r'<!-- header:s -->.*?<!-- header:e -->'
    new_header = '<!-- header:s -->\n        <div id="header-container"></div>\n        <!-- header:e -->'

    if re.search(header_pattern, content, re.DOTALL):
        content = re.sub(header_pattern, new_header, content, flags=re.DOTALL)
        print(f"  ✓ Header replaced")
    else:
        print(f"  ✗ Header pattern not found")

    # 2. Footer 부분을 placeholder로 교체
    # Institution Links부터 Footer까지 전체를 찾아서 교체
    footer_pattern = r'<!-- Institution Links:s -->.*?<!-- Footer:e -->'
    new_footer = '\n        <!-- Footer:s -->\n        <div id="footer-container"></div>\n        <!-- Footer:e -->'

    if re.search(footer_pattern, content, re.DOTALL):
        content = re.sub(footer_pattern, new_footer, content, flags=re.DOTALL)
        print(f"  ✓ Footer replaced")
    else:
        # Footer만 있는 경우
        footer_only_pattern = r'<!-- Footer:s -->.*?<!-- Footer:e -->'
        if re.search(footer_only_pattern, content, re.DOTALL):
            content = re.sub(footer_only_pattern, new_footer, content, flags=re.DOTALL)
            print(f"  ✓ Footer replaced (without Institution Links)")
        else:
            print(f"  ✗ Footer pattern not found")

    # 3. AllMenu 부분을 placeholder로 교체
    allmenu_pattern = r'<!-- all-menu 사이트맵 -->.*?<!-- //all-menu 사이트맵 -->'
    new_allmenu = '<!-- all-menu 사이트맵 -->\n    <div id="allmenu-container"></div>\n    <!-- //all-menu 사이트맵 -->'

    if re.search(allmenu_pattern, content, re.DOTALL):
        content = re.sub(allmenu_pattern, new_allmenu, content, flags=re.DOTALL)
        print(f"  ✓ AllMenu replaced")
    else:
        print(f"  ✗ AllMenu pattern not found")

    # 4. Search 부분을 placeholder로 교체
    search_pattern = r'<!-- 검색영역 -->.*?<!-- 검색영역 -->'
    new_search = '<!-- 검색영역 -->\n    <div id="search-container"></div>\n    <!-- 검색영역 -->'

    if re.search(search_pattern, content, re.DOTALL):
        content = re.sub(search_pattern, new_search, content, flags=re.DOTALL)
        print(f"  ✓ Search replaced")
    else:
        print(f"  ✗ Search pattern not found")

    # 5. 스크립트 부분 수정
    # 기존 스크립트 로딩 패턴 찾기 (버전 쿼리 있는 것과 없는 것 모두)
    script_pattern1 = r'<script src="/type/www/js/jquery-2\.2\.4\.min\.js\?ver=1\.8"></script>\s*<script src="/type/www/js/plugins/aos\.js\?ver=1\.8"></script>\s*<script src="/type/www/js/common\.js\?ver=1\.8"></script>\s*<script src="/type/www/js/layout\.js\?ver=1\.8"></script>\s*<script src="/type/www/js/script\.js\?ver=1\.8"></script>\s*<script src="/type/www/js/component/ui-script\.js\?ver=1\.8"></script>'

    script_pattern2 = r'<script src="/type/www/js/jquery-2\.2\.4\.min\.js"></script>\s*<script src="/type/www/js/plugins/aos\.js"></script>\s*<script src="/type/www/js/common\.js"></script>\s*<script src="/type/www/js/layout\.js"></script>\s*<script src="/type/www/js/script\.js"></script>\s*<script src="/type/www/js/component/ui-script\.js"></script>'

    new_scripts = '''<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.8"></script>
    <script src="/type/www/js/plugins/aos.js?ver=1.8"></script>
    <script src="includes/init.js"></script>'''

    if re.search(script_pattern1, content):
        content = re.sub(script_pattern1, new_scripts, content)
        print(f"  ✓ Scripts replaced (with ver)")
    elif re.search(script_pattern2, content):
        content = re.sub(script_pattern2, new_scripts, content)
        print(f"  ✓ Scripts replaced (without ver)")
    else:
        print(f"  ✗ Script pattern not found (might be already modified)")

    # 파일 저장
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ File updated")

print("\n✅ All files processed!")
