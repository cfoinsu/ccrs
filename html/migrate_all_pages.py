#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Korean Site Migration Script
Migrates all HTML pages to component-based architecture
"""

import os
import re
import sys
from pathlib import Path

# 제외할 파일들 (이미 변환된 파일, 특수 파일)
EXCLUDE_FILES = [
    'chat.html',
    'loadingbar.html',
    'sample_style.html',
    'sidemenu_stickey.html',
    'work.html',
    'work_2.html',
    'youtube.html',
    'main.html',  # 메인 페이지는 구조가 다를 수 있으므로 일단 제외
    '채무조정길잡이_소개.html',  # 이미 완료
    '채무조정길잡이_소개.html.backup',  # 백업 파일
]

def backup_file(filepath):
    """파일 백업"""
    backup_path = f"{filepath}.backup"
    if not os.path.exists(backup_path):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✓ Backed up: {os.path.basename(filepath)}")
    return backup_path

def replace_css_with_bundle(content):
    """CSS 링크들을 bundle.css로 교체"""
    # CSS 섹션 패턴 찾기
    css_pattern = r'<link rel="stylesheet" href="/type/www/css/common\.css">.*?<link rel="stylesheet" href="https://maxst\.icons8\.com/vue-static/landings/line-awesome/line-awesome/1\.3\.0/css/line-awesome\.min\.css">'

    # 단일 bundle.css로 교체
    replacement = '<link rel="stylesheet" href="/type/www/css/bundle.css">'

    content = re.sub(css_pattern, replacement, content, flags=re.DOTALL)

    # 개별 CSS 링크가 남아있다면 제거 (다양한 순서 대응)
    individual_css = [
        r'<link rel="stylesheet" href="/type/www/css/common\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/main\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/layout\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/component/output\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/styles\.css">\s*',
        r'<link rel="stylesheet" href="/type/www/css/all\.min\.css">\s*',
    ]

    # bundle.css가 이미 있는지 확인
    if 'bundle.css' not in content:
        # bundle.css가 없으면 첫 번째 CSS 링크를 bundle.css로 교체
        for pattern in individual_css:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement + '\n    ', content, count=1)
                break

    # 나머지 개별 CSS 링크 제거
    for pattern in individual_css:
        content = re.sub(pattern, '', content)

    return content

def replace_skip_nav(content):
    """Skip Navigation을 컨테이너로 교체"""
    pattern = r'<!-- Skip Navigation -->\s*<div id="skip_nav">.*?</div>'
    replacement = '<!-- Skip Navigation -->\n    <div id="skip-nav-container"></div>'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_header(content):
    """Header를 컨테이너로 교체"""
    pattern = r'<!-- header:s -->\s*<header id="header" class="header">.*?</header>\s*<!-- header:e -->'
    replacement = '<!-- header:s -->\n        <div id="header-container"></div>\n        <!-- header:e -->'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_quickmenu(content):
    """QuickMenu를 컨테이너로 교체"""
    # Quick Menu:s 또는 Quick Menu:s2 패턴 모두 대응
    pattern = r'<!-- Quick Menu:s\d* -->.*?<!-- Quick Menu:e -->'
    replacement = '<!-- Quick Menu:s -->\n\t\t<div id="quickmenu-container"></div>\n        <!-- Quick Menu:e -->'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_footer(content):
    """Footer와 Institution Links를 컨테이너로 교체"""
    # Institution Links + Footer 전체를 하나의 footer-container로 교체
    pattern = r'<!-- Institution Links:s -->.*?<!-- Footer:e -->'
    replacement = '<!-- Footer:s -->\n        <div id="footer-container"></div>\n        <!-- Footer:e -->'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_allmenu(content):
    """AllMenu를 컨테이너로 교체"""
    pattern = r'<!-- all-menu 사이트맵 -->.*?<!-- //all-menu 사이트맵 -->'
    replacement = '<!-- all-menu 사이트맵 -->\n    <div id="allmenu-container"></div>\n    <!-- //all-menu 사이트맵 -->'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_search(content):
    """Search를 컨테이너로 교체"""
    pattern = r'<!-- 검색영역 -->.*?<!-- 검색영역 -->'
    replacement = '<!-- 검색영역 -->\n    <div id="search-container"></div>\n    <!-- 검색영역 -->'
    return re.sub(pattern, replacement, content, flags=re.DOTALL)

def replace_scripts(content):
    """Scripts를 정리"""
    # jQuery가 body 끝에 있는 경우 제거 (head에 이미 있을 수 있음)
    # 기존 스크립트 섹션 찾기
    old_scripts_pattern = r'<script src="/type/www/js/jquery-2\.2\.4\.min\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/plugins/swiper\.min\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/plugins/aos\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/common\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/layout\.js\?ver=1\.9"></script>\s*<script src="/type/www/js/script\.js"></script>\s*<script src="/type/www/js/component/ui-script\.js\?ver=1\.9"></script>'

    new_scripts = '''<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
    <script src="/type/www/js/plugins/swiper.min.js?ver=1.9"></script>
    <script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
    <script src="includes/init.js"></script>'''

    content = re.sub(old_scripts_pattern, new_scripts, content)

    # 개별 스크립트가 남아있다면 제거하고 새로운 스크립트로 교체
    if 'includes/init.js' not in content:
        # 기존 common.js 등을 찾아서 교체
        script_replace_pattern = r'<script src="/type/www/js/common\.js\?ver=1\.9"></script>.*?<script src="/type/www/js/component/ui-script\.js\?ver=1\.9"></script>'
        content = re.sub(script_replace_pattern, new_scripts, content, flags=re.DOTALL)

    return content

def migrate_page(filepath):
    """단일 페이지 마이그레이션"""
    try:
        # 파일 읽기
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content

        # 1. CSS 교체
        content = replace_css_with_bundle(content)

        # 2. Skip Nav 교체
        content = replace_skip_nav(content)

        # 3. Header 교체
        content = replace_header(content)

        # 4. QuickMenu 교체
        content = replace_quickmenu(content)

        # 5. Footer 교체 (Institution Links 포함)
        content = replace_footer(content)

        # 6. AllMenu 교체
        content = replace_allmenu(content)

        # 7. Search 교체
        content = replace_search(content)

        # 8. Scripts 교체
        content = replace_scripts(content)

        # 변경사항이 있는 경우에만 저장
        if content != original_content:
            # 백업
            backup_file(filepath)

            # 파일 쓰기
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

            return True, "Success"
        else:
            return False, "No changes needed"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """메인 실행 함수"""
    print("=" * 70)
    print("Korean Site Migration Script")
    print("=" * 70)
    print()

    # HTML 디렉토리
    html_dir = Path(__file__).parent

    # 모든 HTML 파일 찾기
    html_files = sorted(html_dir.glob('*.html'))

    # 제외 파일 필터링
    html_files = [f for f in html_files if f.name not in EXCLUDE_FILES]

    print(f"Total files to migrate: {len(html_files)}")
    print(f"Excluded files: {len(EXCLUDE_FILES)}")
    print()

    # 확인
    response = input("Proceed with migration? (y/n): ")
    if response.lower() != 'y':
        print("Migration cancelled.")
        return

    print()
    print("Starting migration...")
    print("-" * 70)

    # 결과 추적
    success_count = 0
    skip_count = 0
    error_count = 0
    errors = []

    # 각 파일 마이그레이션
    for i, filepath in enumerate(html_files, 1):
        success, message = migrate_page(filepath)

        if success:
            success_count += 1
            print(f"[{i}/{len(html_files)}] ✓ {filepath.name}")
        elif "No changes" in message:
            skip_count += 1
            print(f"[{i}/{len(html_files)}] - {filepath.name} (skipped)")
        else:
            error_count += 1
            errors.append((filepath.name, message))
            print(f"[{i}/{len(html_files)}] ✗ {filepath.name}: {message}")

    # 결과 요약
    print()
    print("=" * 70)
    print("Migration Summary")
    print("=" * 70)
    print(f"Total files processed: {len(html_files)}")
    print(f"Successfully migrated: {success_count}")
    print(f"Skipped (no changes): {skip_count}")
    print(f"Errors: {error_count}")

    if errors:
        print()
        print("Errors:")
        for filename, error in errors:
            print(f"  - {filename}: {error}")

    print()
    print("✓ Migration completed!")
    print()
    print("Next steps:")
    print("1. Test several pages in browser")
    print("2. Check for any console errors")
    print("3. Verify all components load correctly")
    print("4. If everything works, commit the changes")

if __name__ == "__main__":
    main()
