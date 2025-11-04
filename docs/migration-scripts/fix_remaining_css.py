#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
남은 14개 파일의 CSS를 bundle.css로 변경
"""

import re
from pathlib import Path

def fix_css(file_path):
    """다양한 CSS 패턴을 bundle.css로 변경"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 이미 bundle.css를 사용하면 스킵
    if 'bundle.css' in content:
        return False

    # 패턴들
    patterns = [
        # ver=1.8 버전 (Font Awesome 없음)
        (
            r'<link rel="stylesheet" href="/type/www/css/common\.css\?ver=1\.8">\s*<link rel="stylesheet" href="/type/www/css/main\.css\?ver=1\.8">\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css\?ver=1\.8">\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css\?ver=1\.8"> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css\?ver=1\.8">\s*<link rel="stylesheet" href="/type/www/css/component/output\.css\?ver=1\.8">\s*<link rel="stylesheet" href="/type/www/css/styles\.css\?ver=1\.8">',
            '<link rel="stylesheet" href="/type/www/css/bundle.css">'
        ),
        # ver=1.9 버전 (Font Awesome 없음)
        (
            r'<link rel="stylesheet" href="/type/www/css/common\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/main\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css\?ver=1\.9">\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css\?ver=1\.9"> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/component/output\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/styles\.css\?ver=1\.9">',
            '<link rel="stylesheet" href="/type/www/css/bundle.css">'
        ),
        # 순서가 다른 경우 (styles.css가 먼저)
        (
            r'<link rel="stylesheet" href="/type/www/css/styles\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/common\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/main\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css\?ver=1\.9">\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css\?ver=1\.9"> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/component/output\.css\?ver=1\.9">\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css\?ver=1\.9">\s*<!-- <link rel="stylesheet" href="/type/www/css/webfonts\.css\?ver=1\.9"> -->',
            '<link rel="stylesheet" href="/type/www/css/bundle.css">'
        ),
    ]

    changed = False
    for pattern, replacement in patterns:
        if re.search(pattern, content):
            content = re.sub(pattern, replacement, content)
            changed = True
            break

    if changed:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    return changed

def main():
    """실패한 파일들 처리"""

    failed_files = [
        'chat.html',
        'youtube.html',
        '간행물_문서게시판.html',
        '개인워크아웃(연체90일이상)_일반.html',
        '개인워크아웃(연체90일이상)_지원대상별특례_장기연체자특별채무조정.html',
        '게시판_아코디언.html',
        '게시판_준비중.html',
        '나에게맞는채무조정찾기.html',
        '새출발기금채무조정_부실차주.html',
        '영상광고게시판.html',
        '윤리와책임_윤리강령.html',
        '이용수기_pdf.html',
        '자주묻는질문_FAQ.html',
        '통합검색.html',
    ]

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    success = 0
    still_failed = []

    for filename in failed_files:
        filepath = html_dir / filename
        if not filepath.exists():
            still_failed.append(filename)
            continue

        if fix_css(filepath):
            print(f"✓ {filename}")
            success += 1
        else:
            still_failed.append(filename)
            print(f"⚠ {filename} - 여전히 실패 또는 이미 처리됨")

    print(f"\n결과:")
    print(f"  - 성공: {success}개")
    print(f"  - 실패: {len(still_failed)}개")

    if still_failed:
        print(f"\n여전히 실패한 파일:")
        for f in still_failed:
            print(f"  - {f}")

if __name__ == '__main__':
    main()
