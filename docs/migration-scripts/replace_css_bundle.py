#!/usr/bin/env python3
import os
import re
from pathlib import Path

# html_en 디렉토리의 모든 HTML 파일 찾기
html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html_en')
html_files = [f for f in html_dir.glob('*.html') if f.name != 'main_en.html']

print(f"Found {len(html_files)} HTML files (excluding main_en.html)")

for html_file in html_files:
    print(f"\nProcessing: {html_file.name}")

    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # CSS 링크들을 bundle_en.css로 교체하는 패턴들
    replaced = False

    # 패턴 1: 주석 처리된 개별 CSS + bundle_en.css (이미 번들 사용 중)
    commented_pattern = r'<!-- <link rel="stylesheet" href="/type/www/css/common\.css\?ver=1\.8">.*?<link rel="stylesheet" href="/type/www/css/styles_en_override\.css\?ver=1\.\d+"> -->\s*\n*\s*<link rel="stylesheet" href="/type/www/css/bundle_en\.css">'

    # 패턴 2: 주석 처리되지 않은 개별 CSS 파일들 (ver=1.8 또는 1.9)
    individual_pattern = r'<link rel="stylesheet" href="/type/www/css/common\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/main\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/layout\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/component/output\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/styles\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/layout_en_override\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/main_en\.css\?ver=1\.8">\s*\n?\s*<link rel="stylesheet" href="/type/www/css/styles_en_override\.css\?ver=1\.\d+>'

    new_css = '<link rel="stylesheet" href="/type/www/css/bundle_en.css">'

    # 주석 처리된 패턴 먼저 확인하고 제거
    if re.search(commented_pattern, content, re.DOTALL):
        content = re.sub(commented_pattern, new_css, content, flags=re.DOTALL)
        print(f"  ✓ Removed commented CSS, using bundle_en.css only")
        replaced = True

    # 개별 CSS 파일 패턴 확인
    if re.search(individual_pattern, content, re.DOTALL):
        content = re.sub(individual_pattern, new_css, content, flags=re.DOTALL)
        print(f"  ✓ Replaced individual CSS with bundle_en.css")
        replaced = True

    if not replaced:
        # 이미 bundle_en.css만 있는지 확인
        if re.search(r'<link rel="stylesheet" href="/type/www/css/bundle_en\.css">', content):
            print(f"  ℹ Already using bundle_en.css (clean)")
        else:
            print(f"  ✗ CSS pattern not found")

    # 파일 저장
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ File updated")

print("\n✅ All files processed!")
