#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
서브 페이지들의 header를 header_content로 변경
main.html은 제외 (topbanner 있음)
"""

import os
import re
from pathlib import Path

def migrate_sub_page_header(file_path):
    """서브 페이지의 header를 header_content로 변경"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 기존: <div id="header-container"></div>
    # 변경: <header id="header" class="header">
    #          <div id="header-content-container"></div>
    #       </header>

    # 패턴 1: <div id="header-container"></div> 형태
    pattern1 = r'<div id="header-container"></div>'
    replacement1 = '''<header id="header" class="header">
\t\t\t<div id="header-content-container"></div>
\t\t</header>'''

    if pattern1 in content:
        content = content.replace(pattern1, replacement1)
        return content, True

    return content, False

def main():
    """모든 서브 페이지 마이그레이션"""

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # main.html과 백업 파일 제외
    exclude_files = {
        'main.html',
        'main.html.backup',
        'migrate_all_pages.py',
        'migrate_main.py',
        'migrate_main_final.py',
        'migrate_sub_pages_header.py'
    }

    # 모든 HTML 파일 찾기
    html_files = [f for f in html_dir.glob('*.html')
                  if f.name not in exclude_files and not f.name.endswith('.backup')]

    success_count = 0
    skip_count = 0

    print(f"총 {len(html_files)}개 파일 처리 중...\n")

    for file_path in sorted(html_files):
        content, changed = migrate_sub_page_header(file_path)

        if changed:
            # 파일 저장
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            success_count += 1
            print(f"✓ {file_path.name}")
        else:
            skip_count += 1

    print(f"\n마이그레이션 완료!")
    print(f"  - 변경됨: {success_count}개")
    print(f"  - 스킵됨: {skip_count}개 (이미 변경됨 또는 다른 구조)")
    print(f"\n변경 내용:")
    print(f"  <div id=\"header-container\"></div>")
    print(f"  ↓")
    print(f"  <header id=\"header\" class=\"header\">")
    print(f"      <div id=\"header-content-container\"></div>")
    print(f"  </header>")

if __name__ == '__main__':
    main()
