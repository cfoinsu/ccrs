#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
main.html 최종 마이그레이션 스크립트
topbanner와 header_content를 분리하여 컴포넌트화
"""

import re

def migrate_main_html():
    """main.html을 컴포넌트 기반 구조로 마이그레이션"""

    file_path = '/Users/odada/jeongmiae/-github/cms-publish/html/main.html'

    # 백업에서 복원
    with open(file_path + '.backup', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. CSS 통합
    css_pattern = r'<link rel="shortcut icon"[^>]+>\s*<link rel="stylesheet" href="/type/www/css/styles\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/common\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/main\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/all\.min\.css[^>]+>\s*<!-- <link rel="stylesheet" href="/type/www/css/sub\.css[^>]+> -->\s*<link rel="stylesheet" href="/type/www/css/layout\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/component/output\.css[^>]+>\s*<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css[^>]+>\s*<!-- <link rel="stylesheet" href="/type/www/css/webfonts\.css[^>]+> -->'

    css_replacement = '''<link rel="shortcut icon" type="image/x-icon" href="/type/www/images/favicon/favicon.ico">
\t<link rel="stylesheet" href="/type/www/css/bundle.css">
    <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">'''

    content = re.sub(css_pattern, css_replacement, content)

    # 2. Skip Navigation 교체
    skip_nav_pattern = r'<div id="skipNav">\s*<a href="#contents">skip navigation</a>\s*</div>'
    skip_nav_replacement = '<div id="skip-nav-container"></div>'
    content = re.sub(skip_nav_pattern, skip_nav_replacement, content)

    # 3. Header 구조 변경 (topbanner + header_content 분리)
    # header 시작부터 header 끝까지 찾기
    header_pattern = r'<!-- header:s -->\s*<header id="header" class="header">\s*<!-- topbanner -->.*?</header>\s*<!-- header:e -->'

    header_replacement = '''<!-- header:s -->
\t    <header id="header" class="header">
\t\t\t<div id="topbanner-container"></div>
\t\t\t<div id="header-content-container"></div>
\t\t</header>
\t\t<!-- header:e -->'''

    content = re.sub(header_pattern, header_replacement, content, flags=re.DOTALL)

    # 4. QuickMenu 교체
    quickmenu_pattern = r'<!-- Quick Menu:s2 -->\s*<div class="quick-menu">.*?</a>\s*<!-- Quick Menu:e -->'
    quickmenu_replacement = '''<!-- Quick Menu:s2 -->
\t\t<div id="quickmenu-container"></div>
\t\t<!-- Quick Menu:e -->'''
    content = re.sub(quickmenu_pattern, quickmenu_replacement, content, flags=re.DOTALL)

    # 5. Footer (Institution Links 포함) 교체
    footer_pattern = r'<!-- Institution Links:s -->.*?<!-- Footer:e -->'
    footer_replacement = '<div id="footer-container"></div>'
    content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)

    # 6. AllMenu 교체
    allmenu_pattern = r'<div class="all-menu" id="allMenuTag">.*?</nav>\s*</div>'
    allmenu_replacement = '<div id="allmenu-container"></div>'
    content = re.sub(allmenu_pattern, allmenu_replacement, content, flags=re.DOTALL)

    # 7. Search 교체
    search_pattern = r'<div class="search-menu" id="searchTag">.*?</div>\s*<!-- 인트로영역 -->'
    search_replacement = '<div id="search-container"></div>\n\t<!-- 인트로영역 -->'
    content = re.sub(search_pattern, search_replacement, content, flags=re.DOTALL)

    # 8. Scripts 교체
    scripts_pattern = r'<script src="/type/www/js/jquery-2\.2\.4\.min\.js[^>]+></script>\s*<script src="/type/www/js/plugins/aos\.js[^>]+></script>\s*<script src="/type/www/js/layout\.js[^>]+></script>\s*<script src="/type/www/js/plugins/swiper\.min\.js[^>]+></script>\s*<script src="/type/www/js/component/ui-script\.js[^>]+></script>'

    scripts_replacement = '''<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
\t<script src="/type/www/js/plugins/swiper.min.js?ver=1.9"></script>
\t<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
\t<script src="includes/init.js"></script>'''

    content = re.sub(scripts_pattern, scripts_replacement, content)

    # 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("✓ main.html 마이그레이션 완료")
    print("\n변경 사항:")
    print("  1. CSS: bundle.css로 통합")
    print("  2. Skip Nav: 컴포넌트화")
    print("  3. Header: topbanner + header_content 분리")
    print("     - topbanner-container: topbanner.html 로드")
    print("     - header-content-container: header_content.html 로드")
    print("  4. QuickMenu: 컴포넌트화")
    print("  5. Footer: 컴포넌트화 (Institution Links 포함)")
    print("  6. AllMenu: 컴포넌트화")
    print("  7. Search: 컴포넌트화")
    print("  8. Scripts: init.js 사용")

if __name__ == '__main__':
    migrate_main_html()
