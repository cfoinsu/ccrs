#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive check for all HTML pages
모든 HTML 페이지 종합 점검
"""

import re
from pathlib import Path
from collections import defaultdict

def check_page(file_path):
    """Check a single page for all requirements"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    results = {
        'file': file_path.name,
        'issues': []
    }

    # 1. HTML Include 체크
    includes_found = {
        'skip-nav-container': '<div id="skip-nav-container"></div>' in content,
        'header-content-container': '<div id="header-content-container"></div>' in content or '<div id="header-container"></div>' in content,
        'footer-container': '<div id="footer-container"></div>' in content,
        'allmenu-container': '<div id="allmenu-container"></div>' in content,
        'search-container': '<div id="search-container"></div>' in content,
        'quickmenu-container': '<div id="quickmenu-container"></div>' in content,
    }

    for include, found in includes_found.items():
        if not found and 'main.html' not in file_path.name:  # main.html has topbanner
            results['issues'].append(f"Missing: {include}")

    # 2. CSS Bundle 체크
    if 'bundle.css' not in content:
        results['issues'].append("Missing: bundle.css")

    # CSS 중복 로드 체크
    css_files = ['common.css', 'main.css', 'layout.css', 'styles.css']
    for css in css_files:
        if f'/{css}' in content and 'bundle.css' in content:
            results['issues'].append(f"Duplicate CSS: {css} (should only use bundle.css)")

    # 3. JS 체크
    if 'includes/init.js' not in content:
        results['issues'].append("Missing: init.js")

    # jQuery 체크
    if 'jquery-2.2.4.min.js' not in content and 'jquery-3.6.3.min.js' not in content:
        results['issues'].append("Missing: jQuery")

    # Swiper 체크
    if 'swiper.min.js' not in content:
        results['issues'].append("Missing: Swiper.js")

    # 중복 스크립트 체크
    if 'common_kr.js' in content:
        results['issues'].append("Deprecated: common_kr.js (should be removed)")

    # 인라인 toggleButton 체크
    if re.search(r'\$\(\'#toggleButton\'\)', content):
        results['issues'].append("Inline script: toggleButton (should be in common.js)")

    # Institution carousel 중복 체크
    if re.search(r'new Swiper\(.*institution.*carousel', content, re.IGNORECASE):
        if file_path.name != 'topbanner.html' and file_path.name != 'footer.html':
            results['issues'].append("Inline script: Institution carousel (should be in common.js)")

    return results

def main():
    """Check all HTML pages"""

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # Test files to skip
    test_files = {
        'chat.html', 'work.html', 'work_2.html', 'youtube.html',
        'loadingbar.html', 'sample_style.html', 'sidemenu_stickey.html',
        '이용수기_pdf.html'
    }

    # Get all HTML files
    html_files = [f for f in html_dir.glob('*.html')
                  if not f.name.endswith('.backup') and f.name not in test_files]

    print(f"{'='*80}")
    print(f"  전체 페이지 점검 (Total: {len(html_files)}개)")
    print(f"{'='*80}\n")

    # Category counters
    stats = {
        'perfect': 0,
        'with_issues': 0,
        'by_category': defaultdict(int)
    }

    issues_by_file = []

    for file_path in sorted(html_files):
        result = check_page(file_path)

        if result['issues']:
            stats['with_issues'] += 1
            issues_by_file.append(result)

            # Count by category
            for issue in result['issues']:
                category = issue.split(':')[0]
                stats['by_category'][category] += 1
        else:
            stats['perfect'] += 1

    # Print summary
    print(f"📊 검사 결과 요약\n")
    print(f"  ✅ 완벽: {stats['perfect']}개")
    print(f"  ⚠️  문제 있음: {stats['with_issues']}개")
    print(f"\n{'='*80}\n")

    # Print issues by category
    if stats['by_category']:
        print(f"📋 문제 유형별 통계\n")
        for category, count in sorted(stats['by_category'].items()):
            print(f"  {category}: {count}개")
        print(f"\n{'='*80}\n")

    # Print detailed issues
    if issues_by_file:
        print(f"🔍 상세 문제 목록\n")
        for result in issues_by_file:
            print(f"  📄 {result['file']}")
            for issue in result['issues']:
                print(f"     ⚠️  {issue}")
            print()
    else:
        print(f"🎉 모든 페이지가 완벽합니다!\n")

    print(f"{'='*80}")
    print(f"검사 완료!")
    print(f"{'='*80}")

if __name__ == '__main__':
    main()
