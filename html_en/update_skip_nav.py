#!/usr/bin/env python3
"""
영문 페이지의 Skip Navigation을 includes로 분리
"""
import os
import re

# html_en 디렉토리의 모든 HTML 파일 처리
html_dir = '/Users/odada/jeongmiae/-github/cms-publish/html_en'

# Skip Navigation 패턴
skip_nav_pattern = re.compile(
    r'<!-- Skip Navigation -->\s*<div id="skip_nav">.*?</div>',
    re.DOTALL
)

# 교체할 내용
replacement = '<div id="skip-nav-container"></div>'

# 제외할 파일
exclude_files = []

# 처리할 파일 목록
html_files = [f for f in os.listdir(html_dir)
              if f.endswith('.html') and f not in exclude_files]

print(f"총 {len(html_files)}개 파일 처리 시작...\n")

success_count = 0
skip_count = 0

for filename in html_files:
    filepath = os.path.join(html_dir, filename)

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip Navigation 찾기
        if '<!-- Skip Navigation -->' in content:
            # 교체
            new_content = skip_nav_pattern.sub(replacement, content)

            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✓ {filename}")
                success_count += 1
            else:
                print(f"⚠ {filename} - 패턴을 찾았지만 교체 실패")
                skip_count += 1
        else:
            print(f"- {filename} - Skip Navigation 없음")
            skip_count += 1

    except Exception as e:
        print(f"✗ {filename} - 에러: {e}")
        skip_count += 1

print(f"\n완료: {success_count}개 성공, {skip_count}개 스킵")
