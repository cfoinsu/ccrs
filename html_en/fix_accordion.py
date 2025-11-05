#!/usr/bin/env python3
"""
영문 페이지의 아코디언 구조 수정
<div class=""> → <div class="accordion-item">
"""
import os
import re

html_dir = '/Users/odada/jeongmiae/-github/cms-publish/html_en'

# 아코디언이 있는 파일들
accordion_files = [
    'CCRSDebtReliefPrograms.html',
    'HouseholddebtreliefprogramsbytheCCRS.html',
    'debtManagement.html',
    'generalCounseling.html',
    'microCreditSupportAct.html'
]

print(f"총 {len(accordion_files)}개 파일 수정 시작...\n")

success_count = 0

for filename in accordion_files:
    filepath = os.path.join(html_dir, filename)

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # 패턴: krds-accordion 내부의 빈 div를 accordion-item으로 변경
        # <div class="krds-accordion ... 다음에 나오는 <div class="">를 찾음
        pattern = r'(<div class="krds-accordion[^>]*>)\s*<div class="">'
        replacement = r'\1\n                                <div class="accordion-item">'

        content = re.sub(pattern, replacement, content)

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

            # 변경된 횟수 계산
            changes = len(re.findall(pattern, original))
            print(f"✓ {filename} - {changes}개 아코디언 수정")
            success_count += 1
        else:
            print(f"- {filename} - 변경 사항 없음")

    except Exception as e:
        print(f"✗ {filename} - 에러: {e}")

print(f"\n완료: {success_count}개 파일 수정")
