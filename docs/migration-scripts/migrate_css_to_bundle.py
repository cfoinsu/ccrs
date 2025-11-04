#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
모든 페이지의 CSS를 bundle.css로 통합
"""

import os
import re
from pathlib import Path

def migrate_css_to_bundle(file_path):
    """개별 CSS 링크를 bundle.css로 통합"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 이미 bundle.css를 사용하는지 확인
    if 'bundle.css' in content:
        return content, False

    # 패턴 1: 가장 일반적인 패턴 (common.css부터 시작)
    pattern1 = r'<link rel="stylesheet" href="/type/www/css/common\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/main\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css[^>]+>\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css[^>]+> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/component/output\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/styles\.css[^>]+>\s*<!-- Font Awesome -->\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css[^>]+>\s*<link rel="stylesheet" href="https://maxst\.icons8\.com/vue-static/landings/line-awesome/line-awesome/1\.3\.0/css/line-awesome\.min\.css"[^>]*>'

    replacement = '<link rel="stylesheet" href="/type/www/css/bundle.css">'

    if re.search(pattern1, content):
        content = re.sub(pattern1, replacement, content)
        return content, True

    # 패턴 2: styles.css부터 시작하는 경우
    pattern2 = r'<link rel="stylesheet" href="/type/www/css/styles\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/common\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/main\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css[^>]+>\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css[^>]+> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/component/output\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css[^>]+>'

    if re.search(pattern2, content):
        content = re.sub(pattern2, replacement, content)
        return content, True

    # 패턴 3: Line Awesome이 마지막에 있는 경우
    pattern3 = r'<link rel="stylesheet" href="/type/www/css/common\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/main\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css[^>]+>\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css[^>]+> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/component/output\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/styles\.css[^>]+>\s*<!-- Font Awesome -->\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css[^>]+>\s*<link rel="stylesheet" href="https://maxst\.icons8\.com/vue-static/landings/line-awesome/line-awesome/1\.3\.0/css/line-awesome\.min\.css"[^>]*>\s*<meta name="msapplication-TileColor"'

    replacement3 = replacement + '\n    <meta name="msapplication-TileColor"'

    if re.search(pattern3, content):
        content = re.sub(pattern3, replacement3, content)
        return content, True

    return content, False

def main():
    """모든 HTML 페이지의 CSS를 bundle.css로 통합"""

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # 백업 파일과 스크립트 제외
    exclude_files = {
        'migrate_all_pages.py',
        'migrate_main.py',
        'migrate_main_final.py',
        'migrate_sub_pages_header.py',
        'migrate_css_to_bundle.py'
    }

    # 모든 HTML 파일 찾기
    html_files = [f for f in html_dir.glob('*.html')
                  if f.name not in exclude_files and not f.name.endswith('.backup')]

    success_count = 0
    skip_count = 0
    fail_count = 0
    failed_files = []

    print(f"총 {len(html_files)}개 파일 처리 중...\n")

    for file_path in sorted(html_files):
        content, changed = migrate_css_to_bundle(file_path)

        if changed:
            # 파일 저장
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

            success_count += 1
            print(f"✓ {file_path.name}")
        elif 'bundle.css' in content:
            skip_count += 1
        else:
            fail_count += 1
            failed_files.append(file_path.name)
            print(f"⚠ {file_path.name} - 패턴 매칭 실패")

    print(f"\n마이그레이션 완료!")
    print(f"  - 변경됨: {success_count}개")
    print(f"  - 스킵됨 (이미 bundle.css 사용): {skip_count}개")
    print(f"  - 실패: {fail_count}개")

    if failed_files:
        print(f"\n실패한 파일 목록:")
        for f in failed_files:
            print(f"  - {f}")

    print(f"\n변경 내용:")
    print(f"  8개 CSS 링크")
    print(f"  ↓")
    print(f"  <link rel=\"stylesheet\" href=\"/type/www/css/bundle.css\">")

if __name__ == '__main__':
    main()
