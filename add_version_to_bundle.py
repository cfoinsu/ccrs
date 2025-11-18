#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SCSS 컴파일 후 생성된 bundle_en.css 파일의 @import 경로에 버전 쿼리 파라미터 추가

📅 날짜 기반 버전:
- 매일 자동으로 오늘 날짜를 버전으로 사용합니다
- 형식: YYYYMMDD (예: 20241215)
- 같은 날에는 같은 버전이 유지됩니다
"""

import re
from datetime import datetime
from pathlib import Path

# 오늘 날짜를 버전으로 사용 (YYYYMMDD 형식)
VERSION = datetime.now().strftime("%Y%m%d")
CSS_FILE = Path("type/www/css/bundle_en.css")

def add_version_to_imports(css_file_path):
    """CSS 파일의 @import 경로에 버전 쿼리 파라미터 추가"""
    
    if not css_file_path.exists():
        print(f"⚠️  파일을 찾을 수 없습니다: {css_file_path}")
        return False
    
    with open(css_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 원본 내용 저장 (변경사항 확인용)
    original_content = content
    
    # 각 줄을 개별적으로 처리
    lines = content.split('\n')
    modified_lines = []
    changed = False
    
    for line in lines:
        original_line = line
        
        # 잘못된 형식의 버전 수정: @import '...css'?ver=4.7; -> @import '...css?ver=4.7';
        if '?ver=' in line and "'?ver=" not in line and '"?ver=' not in line:
            # 따옴표 밖에 버전이 있는 경우 수정
            line = re.sub(
                r"(@import\s+['\"]/type/www/css/[^'\"]+\.css)(['\"])\?ver=([^;]+);",
                rf"\1?ver=\3\2;",
                line
            )
            if line != original_line:
                changed = True
        
        # 이미 버전이 있는 경우, 오늘 날짜와 다르면 업데이트
        if "?ver=" in line:
            original_line_for_version = line
            # 기존 버전 추출 (따옴표 안의 버전만)
            version_match = re.search(r"\?ver=([^'\";\s]+)", line)
            if version_match:
                existing_version = version_match.group(1)
                # 오늘 날짜와 다르면 업데이트
                if existing_version != VERSION:
                    # 기존 버전을 오늘 날짜로 교체
                    line = re.sub(
                        r"\?ver=[^'\";\s]+",
                        f"?ver={VERSION}",
                        line
                    )
                    if line != original_line_for_version:
                        changed = True
            modified_lines.append(line)
            continue
        
        # @import로 시작하고 로컬 CSS 파일 경로를 포함하는 줄만 처리
        if "@import" in line and "/type/www/css/" in line and ".css" in line:
            # 외부 URL (http://)은 제외
            if "http://" in line or "https://" in line:
                modified_lines.append(line)
                continue
            
            # 원본 줄 저장
            original_line = line
            
            # sourceMappingURL 주석이 있는 경우
            if '/*# sourceMappingURL' in line:
                # @import '/path/file.css';/*# sourceMappingURL=...*/
                # -> @import '/path/file.css?ver=4.7';/*# sourceMappingURL=...*/
                # 따옴표를 닫기 전에 버전 추가
                line = re.sub(
                    r"(@import\s+['\"]/type/www/css/[^'\"]+\.css)(['\"])",
                    rf"\1?ver={VERSION}\2",
                    line
                )
            else:
                # 일반적인 경우: @import '/path/file.css';
                # -> @import '/path/file.css?ver=4.7';
                # 따옴표를 닫기 전에 버전 추가
                line = re.sub(
                    r"(@import\s+['\"]/type/www/css/[^'\"]+\.css)(['\"])",
                    rf"\1?ver={VERSION}\2",
                    line
                )
            
            # 실제로 변경되었는지 확인
            if line != original_line:
                changed = True
        
        modified_lines.append(line)
    
    if changed:
        content = '\n'.join(modified_lines)
    
    # 변경사항이 있으면 파일 저장
    if changed:
        with open(css_file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {css_file_path.name}에 버전 쿼리 파라미터 추가 완료 (ver={VERSION})")
        return True
    else:
        print(f"ℹ️  {css_file_path.name}에 변경사항 없음 (이미 버전이 있거나 패턴 불일치)")
        return False

if __name__ == "__main__":
    add_version_to_imports(CSS_FILE)

