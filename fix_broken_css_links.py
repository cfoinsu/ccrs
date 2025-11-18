#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
잘못된 CSS 링크 수정: P251118 → bundle_en.css?ver=20251118
"""

import re
from datetime import datetime
from pathlib import Path

VERSION = datetime.now().strftime("%Y%m%d")
HTML_DIR = Path("html_en")
HTML_FILES = list(HTML_DIR.glob("*.html"))

def fix_broken_links(html_file_path):
    """잘못된 CSS 링크 수정"""
    
    with open(html_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 잘못된 패턴들 수정
    fixes = [
        ('/type/www/css/P251118', f'/type/www/css/bundle_en.css?ver={VERSION}'),
        ('href="/type/www/css/P251118"', f'href="/type/www/css/bundle_en.css?ver={VERSION}"'),
        ('href=\'/type/www/css/P251118\'', f'href=\'/type/www/css/bundle_en.css?ver={VERSION}\''),
    ]
    
    for old, new in fixes:
        if old in content:
            content = content.replace(old, new)
    
    if content != original_content:
        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {html_file_path.name}: 수정 완료")
        return True
    else:
        print(f"ℹ️  {html_file_path.name}: 변경사항 없음")
        return False

if __name__ == "__main__":
    print(f"🔧 잘못된 CSS 링크 수정 중...\n")
    
    fixed_count = 0
    for html_file in HTML_FILES:
        if fix_broken_links(html_file):
            fixed_count += 1
    
    print(f"\n✨ 완료: {fixed_count}개 파일 수정됨")

