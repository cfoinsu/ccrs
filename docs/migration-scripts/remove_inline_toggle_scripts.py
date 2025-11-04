#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Remove inline toggleButton scripts from HTML files
인라인 toggleButton 스크립트를 HTML 파일에서 제거
"""

import re
from pathlib import Path

def remove_inline_toggle_script(file_path):
    """Remove inline toggleButton script from a file"""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to match the entire toggle button script block
    pattern = r'<script>\s*\$\(function\s*\(\)\s*\{.*?// ① 요소 캐시.*?const \$toggleBtn = \$\(\'#toggleButton\'\);.*?const \$toggleText = \$\(\'#toggleText\'\);.*?const \$arrowIcon = \$\(\'#arrowIcon\'\);.*?const \$separator = \$\(\'#separator\'\);.*?const \$support = \$\(\'#supportContent\'\);.*?// ② 클릭 이벤트 핸들러.*?\$toggleBtn\.on\(\'click\', function \(\) \{.*?\}\);.*?\}\);.*?</script>'

    # Try to find and remove the pattern
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, '', content, flags=re.DOTALL)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

        return True

    return False

def main():
    """Remove inline toggle scripts from all HTML files"""

    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    # Find all HTML files with toggleButton
    html_files = []
    for file_path in html_dir.glob('*.html'):
        if file_path.name.endswith('.backup'):
            continue

        with open(file_path, 'r', encoding='utf-8') as f:
            if 'toggleButton' in f.read():
                html_files.append(file_path)

    success_count = 0
    fail_count = 0
    failed_files = []

    print(f"총 {len(html_files)}개 파일에서 인라인 toggle 스크립트 제거 중...\n")

    for file_path in sorted(html_files):
        if remove_inline_toggle_script(file_path):
            success_count += 1
            print(f"✓ {file_path.name}")
        else:
            fail_count += 1
            failed_files.append(file_path.name)
            print(f"⚠ {file_path.name} - 패턴 매칭 실패")

    print(f"\n제거 완료!")
    print(f"  - 성공: {success_count}개")
    print(f"  - 실패: {fail_count}개")

    if failed_files:
        print(f"\n실패한 파일 목록:")
        for f in failed_files:
            print(f"  - {f}")

    print(f"\n참고: 이제 toggleButton 기능은 common.js의 initSupportContentToggle()에서 처리됩니다.")

if __name__ == '__main__':
    main()
