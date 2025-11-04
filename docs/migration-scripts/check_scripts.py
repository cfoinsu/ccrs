#!/usr/bin/env python3
"""
Check script sections in all HTML files
Verify required scripts are present in correct order
"""

import os
import re
from pathlib import Path

# 제외할 테스트 파일들
EXCLUDE_FILES = {
    'chat.html', 'loadingbar.html', 'sample_style.html',
    'youtube.html', 'work.html', 'work_2.html',
    '이용수기_pdf.html', '통합검색.html'
}

# 필수 스크립트 (순서대로)
REQUIRED_SCRIPTS = [
    'jquery-2.2.4.min.js',
    'aos.js',
    'common.js',
    'init.js'
]

def check_html_file(file_path):
    """
    HTML 파일의 스크립트 섹션 확인
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # 1. 필수 스크립트 체크
    missing_scripts = []
    for script in REQUIRED_SCRIPTS:
        if script not in content:
            missing_scripts.append(script)

    if missing_scripts:
        issues.append(f"Missing: {', '.join(missing_scripts)}")

    # 2. 중복 스크립트 체크
    for script in REQUIRED_SCRIPTS:
        # 주석이 아닌 실제 script 태그만 카운트
        pattern = rf'<script[^>]*{re.escape(script)}[^>]*></script>'
        active_matches = re.findall(pattern, content)

        if len(active_matches) > 1:
            issues.append(f"Duplicate: {script} ({len(active_matches)} times)")

    # 3. 인라인 스크립트 체크 (</body> 바로 앞)
    inline_script_pattern = r'<script[^>]*type="text/javascript"[^>]*>.*?</script>\s*</body>'
    if re.search(inline_script_pattern, content, re.DOTALL):
        issues.append("Has inline script before </body>")

    # 4. 주석 처리된 스크립트와 실제 스크립트가 섞여있는지 체크
    commented_scripts = re.findall(r'<!--.*?<script.*?jquery.*?</script>.*?-->', content, re.DOTALL)
    active_scripts = re.findall(r'<script[^>]*jquery[^>]*></script>', content)

    if commented_scripts and active_scripts:
        issues.append("Has both active and commented scripts")

    return issues

def main():
    html_dir = Path('/Users/odada/jeongmiae/-github/cms-publish/html')

    html_files = [
        f for f in html_dir.glob('*.html')
        if f.is_file() and f.name not in EXCLUDE_FILES and 'includes' not in str(f)
    ]

    print(f"Checking {len(html_files)} HTML files...\n")
    print("="*80)

    files_with_issues = []
    files_ok = []

    for html_file in sorted(html_files):
        issues = check_html_file(html_file)

        if issues:
            files_with_issues.append((html_file.name, issues))
            print(f"❌ {html_file.name}")
            for issue in issues:
                print(f"   → {issue}")
            print()
        else:
            files_ok.append(html_file.name)

    print("="*80)
    print(f"\n✅ Files OK: {len(files_ok)}")
    print(f"❌ Files with issues: {len(files_with_issues)}")

    if files_with_issues:
        print("\n" + "="*80)
        print("SUMMARY OF FILES WITH ISSUES:")
        print("="*80)
        for filename, issues in files_with_issues[:10]:  # 처음 10개만
            print(f"\n{filename}:")
            for issue in issues:
                print(f"  • {issue}")

        if len(files_with_issues) > 10:
            print(f"\n... and {len(files_with_issues) - 10} more files")

if __name__ == '__main__':
    main()
