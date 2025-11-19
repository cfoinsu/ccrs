#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML 파일의 bundle_en.css 버전 쿼리 파라미터를 오늘 날짜로 업데이트

📅 날짜 기반 버전:
- HTML 파일에서 bundle_en.css?ver=4.7을 bundle_en.css?ver=YYYYMMDD로 자동 업데이트
- 배포 전에 실행하면 브라우저 캐시 문제 해결
"""

import re
from datetime import datetime
from pathlib import Path

# 오늘 날짜를 버전으로 사용 (YYYYMMDD 형식)
VERSION = datetime.now().strftime("%Y%m%d")

# html_en 디렉토리의 모든 HTML 파일 찾기
HTML_DIR = Path("html_en")
HTML_FILES = list(HTML_DIR.glob("*.html"))

def update_html_version(html_file_path):
    """HTML 파일의 bundle_en.css 버전 업데이트"""
    
    if not html_file_path.exists():
        print(f"⚠️  파일을 찾을 수 없습니다: {html_file_path}")
        return False
    
    with open(html_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # bundle_en.css?ver=숫자 패턴 찾아서 오늘 날짜로 교체
    # 간단하게 문자열 교체 사용 (더 안정적)
    # 4.7, 날짜 형식 등 모든 버전을 오늘 날짜로 교체
    old_patterns = [
        'bundle_en.css?ver=4.7',
        'bundle_en.css?ver=5.0',
    ]
    
    changed_by_replace = False
    for old_pattern in old_patterns:
        if old_pattern in content:
            content = content.replace(old_pattern, f'bundle_en.css?ver={VERSION}')
            changed_by_replace = True
    
    # 정규식으로도 처리 (날짜 형식 등 다른 버전들)
    pattern = r'bundle_en\.css\?ver=\d{4,8}'
    if re.search(pattern, content):
        content = re.sub(pattern, f'bundle_en.css?ver={VERSION}', content)
        changed_by_replace = True
    
    if content != original_content:
        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {html_file_path.name}: 버전 업데이트 완료 (ver={VERSION})")
        return True
    else:
        print(f"ℹ️  {html_file_path.name}: 변경사항 없음 (이미 최신 버전이거나 bundle_en.css 없음)")
        return False

if __name__ == "__main__":
    print(f"📅 오늘 날짜 버전: {VERSION}")
    print(f"📁 처리할 파일: {len(HTML_FILES)}개\n")
    
    updated_count = 0
    for html_file in HTML_FILES:
        if update_html_version(html_file):
            updated_count += 1
    
    print(f"\n✨ 완료: {updated_count}개 파일 업데이트됨")

