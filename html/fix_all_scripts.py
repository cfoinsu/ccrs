#!/usr/bin/env python3
"""
Completely fix script sections in HTML files:
1. Remove ALL jQuery scripts from <head> and anywhere else
2. Ensure only ONE set of scripts before </body>
3. Correct order: jquery → swiper → aos → common → init
4. All scripts use ver=1.9
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
    HTML 파일의 스크립트 섹션 완전 정리
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # 1. <head> 내의 모든 script 태그 제거
    head_script_pattern = r'<head>.*?</head>'
    head_match = re.search(head_script_pattern, content, re.DOTALL)
    if head_match:
        head_content = head_match.group(0)
        # head 내의 script 태그들 제거
        script_in_head = re.findall(r'<script[^>]*src="[^"]*(?:jquery|swiper|aos|common|init)[^"]*"[^>]*></script>', head_content)
        if script_in_head:
            for script in script_in_head:
                head_content = head_content.replace(script, '')
            content = content.replace(head_match.group(0), head_content)
            changes.append(f"Removed {len(script_in_head)} scripts from <head>")

    # 2. </body> 이전의 모든 jQuery/swiper/aos/common/init 스크립트 제거
    all_script_pattern = r'<script[^>]*src="[^"]*(?:jquery|swiper|aos|common\.js|init\.js|main\.js)[^"]*"[^>]*></script>'
    all_scripts = re.findall(all_script_pattern, content)
    for script in all_scripts:
        content = content.replace(script, '')

    if all_scripts:
        changes.append(f"Removed all existing scripts ({len(all_scripts)} total)")

    # 3. 주석 처리된 스크립트들 제거
    content = re.sub(r'<!--.*?<script.*?</script>.*?-->', '', content, flags=re.DOTALL)

    # 4. 불필요한 주석 제거
    content = re.sub(r'<!--\s*반드시 jQuery 파일을 먼저 로드하세요\s*-->', '', content)
    content = re.sub(r'<!--\s*2️⃣ 아코디언 토글 스크립트\s*-->', '', content)

    # 5. </body> 바로 전에 올바른 스크립트 섹션 추가
    correct_scripts = '''	<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
	<script src="/type/www/js/plugins/swiper.min.js?ver=1.9"></script>
	<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
	<script src="/type/www/js/common.js?ver=1.9"></script>
	<script src="includes/init.js"></script>'''

    # main.html인 경우 main.js 추가
    if file_path.name == 'main.html':
        correct_scripts += '\n\t<script src="/type/www/js/main.js?ver=1.9"></script>'

    # </body> 바로 앞에 삽입
    body_end_pattern = r'(\s*)</body>'
    if re.search(body_end_pattern, content):
        content = re.sub(body_end_pattern, f'\n{correct_scripts}\n</body>', content)
        changes.append("Added correct script section before </body>")

    # 6. 과도한 빈 줄 정리
    content = re.sub(r'\n\n\n+', '\n\n', content)

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
            # print(f"⏭️  {html_file.name}")

    print("\n" + "="*80)
    print(f"✅ Fixed: {fixed_count} files")
    print(f"⏭️  Skipped (no changes needed): {skipped_count} files")
    print("="*80)

if __name__ == '__main__':
    main()
