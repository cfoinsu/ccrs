#!/usr/bin/env python3
"""
Fix script section issues in HTML files:
1. Remove duplicate jQuery scripts
2. Clean up commented-out script blocks
3. Ensure correct script order
"""

import os
import re
from pathlib import Path

# 제외할 파일들
EXCLUDE_FILES = {
    'chat.html', 'loadingbar.html', 'sample_style.html',
    'youtube.html', 'work.html', 'work_2.html',
    '이용수기_pdf.html', '통합검색.html'
}

def fix_html_file(file_path):
    """
    HTML 파일의 스크립트 섹션 정리
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # 1. 주석 처리된 스크립트 블록 전체 제거
    # Pattern: <!-- <script...>...</script> ... -->
    commented_block_pattern = r'<!--\s*<script[^>]*>.*?</script>.*?-->'
    matches = re.findall(commented_block_pattern, content, re.DOTALL)
    if matches:
        content = re.sub(commented_block_pattern, '', content, flags=re.DOTALL)
        changes.append(f"Removed {len(matches)} commented script blocks")

    # 2. 중복된 jQuery 스크립트 제거 (첫 번째만 남기고 나머지 제거)
    jquery_pattern = r'<script src="/type/www/js/jquery-2\.2\.4\.min\.js\?ver=1\.9"></script>'
    jquery_matches = re.findall(jquery_pattern, content)

    if len(jquery_matches) > 1:
        # 첫 번째 jQuery는 유지하고 나머지 제거
        first_jquery_pos = content.find(jquery_matches[0])
        # 첫 번째 이후의 모든 jQuery 제거
        temp_content = content[:first_jquery_pos + len(jquery_matches[0])]
        rest_content = content[first_jquery_pos + len(jquery_matches[0]):]
        rest_content = re.sub(jquery_pattern, '', rest_content)
        content = temp_content + rest_content
        changes.append(f"Removed {len(jquery_matches) - 1} duplicate jQuery scripts")

    # 3. 불필요한 주석 제거
    unnecessary_comments = [
        r'<!--\s*반드시 jQuery 파일을 먼저 로드하세요\s*-->',
        r'<!--\s*2️⃣ 아코디언 토글 스크립트\s*-->',
        r'<!--\s*<script.*?-->'
    ]

    for comment_pattern in unnecessary_comments:
        if re.search(comment_pattern, content):
            content = re.sub(comment_pattern, '', content, flags=re.DOTALL)
            changes.append("Removed unnecessary comments")

    # 4. 스크립트 태그 사이의 과도한 빈 줄 정리 (최대 1줄로)
    content = re.sub(r'(</script>)\s*\n\s*\n\s*\n+(<script)', r'\1\n\t\2', content)

    # 파일이 변경되었으면 저장
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, changes
    else:
        return False, []

def main():
    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    html_files = [
        f for f in html_dir.glob('*.html')
        if f.is_file() and f.name not in EXCLUDE_FILES and 'includes' not in str(f)
    ]

    print(f"Processing {len(html_files)} HTML files...\n")
    print("="*80)

    fixed_count = 0
    skipped_count = 0

    for html_file in sorted(html_files):
        fixed, changes = fix_html_file(html_file)

        if fixed:
            fixed_count += 1
            print(f"✅ {html_file.name}")
            for change in changes:
                print(f"   → {change}")
        else:
            skipped_count += 1

    print("\n" + "="*80)
    print(f"✅ Fixed: {fixed_count} files")
    print(f"⏭️  Skipped (no changes needed): {skipped_count} files")
    print("="*80)

if __name__ == '__main__':
    main()
