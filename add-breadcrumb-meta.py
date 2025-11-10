#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Breadcrumb Meta Tag 자동 추가 스크립트
html 폴더의 파일들에 breadcrumb meta 태그를 자동으로 추가합니다.
"""

import os
import re
from pathlib import Path

# 브레드크럼 매핑
breadcrumb_mapping = {
    # 채무조정
    '채무조정길잡이_소개.html': '채무조정 > 채무조정 길잡이',
    '신속채무조정(연체30일이하)_일반.html': '채무조정 > 채무조정 자세히 알아보기',
    '개인회생·파산제도_개인회생이란.html': '채무조정 > 그 밖의 채무조정',
    '상담안내.html': '채무조정 > 채무조정 상담안내',

    # 상환도우미
    '상환도우미소개.html': '상환도우미 > 상환도우미 소개',
    '성실상환이란.html': '상환도우미 > 성실상환 혜택',
    '실효란.html': '상환도우미 > 실효위기 지원',

    # 금융과 생활
    '금융과생활소개.html': '금융과 생활 > 금융과 생활 소개',
    '소액대출_제도소개.html': '금융과 생활 > 소액금융',
    '복합지원개요.html': '금융과 생활 > 금융·고용·복지 복합지원',
    '신용복지컨설팅.html': '금융과 생활 > 컨설팅 지원',
    '신용교육프로그램신청_신용교육소개.html': '금융과 생활 > 신용교육',
    '불법사금융알아보기_예방가이드.html': '금융과 생활 > 불법사금융 예방∙신고',

    # 알림과 홍보
    '공고_입찰공고_목록.html': '알림과 홍보 > 입찰공고',
    '영상광고게시판.html': '알림과 홍보 > 홍보활동',
    '인재상.html': '알림과 홍보 > 인재채용',
    '사업소개.html': '알림과 홍보 > 사회공헌',
    '서식다운로드_목록.html': '알림과 홍보 > 자료실',

    # 소통과 참여
    '자주묻는질문_FAQ.html': '소통과 참여 > 자주하는 질문(FAQ)',
    '고객의소리_선택.html': '소통과 참여 > 고객소통',
    '군복무자전용질의응답_동의.html': '소통과 참여 > 군복무자 전용 질의응답',

    # 위원회 소개
    '위원장인사말.html': '위원회 소개 > 위원장 인사말',
    '신용회복위원회소개.html': '위원회 소개 > 기관소개',
    '사회적가치_목록.html': '위원회 소개 > 사회적 가치 실현보고서',
    '윤리와책임_윤리헌장.html': '위원회 소개 > 청렴경영',
    '신용상담사자격시험.html': '위원회 소개 > 신용상담사',
    '지부위치안내.html': '위원회 소개 > 지부위치 안내'
}

def add_breadcrumb_meta(file_path, breadcrumb_path):
    """
    HTML 파일에 breadcrumb meta 태그를 추가합니다.
    이미 존재하면 업데이트합니다.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 이미 breadcrumb meta 태그가 있는지 확인
    existing_meta = re.search(r'<meta\s+name="breadcrumb"\s+content="[^"]*"\s*/?>', content)

    # 새로운 meta 태그
    new_meta = f'<meta name="breadcrumb" content="{breadcrumb_path}">'

    if existing_meta:
        # 기존 태그 업데이트
        content = content.replace(existing_meta.group(0), new_meta)
        print(f"✓ Updated: {file_path.name}")
    else:
        # <head> 태그 찾기
        head_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
        if head_match:
            # <head> 바로 다음에 meta 태그 삽입
            insert_pos = head_match.end()
            content = content[:insert_pos] + '\n\t' + new_meta + content[insert_pos:]
            print(f"✓ Added: {file_path.name}")
        else:
            print(f"✗ No <head> tag found: {file_path.name}")
            return False

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    # html 폴더 경로
    html_dir = Path(__file__).parent / 'html'

    if not html_dir.exists():
        print(f"Error: html 폴더를 찾을 수 없습니다: {html_dir}")
        return

    print("=" * 60)
    print("Breadcrumb Meta Tag 자동 추가 시작")
    print("=" * 60)
    print()

    success_count = 0
    not_found_count = 0

    for filename, breadcrumb_path in breadcrumb_mapping.items():
        file_path = html_dir / filename

        if file_path.exists():
            if add_breadcrumb_meta(file_path, breadcrumb_path):
                success_count += 1
        else:
            print(f"✗ File not found: {filename}")
            not_found_count += 1

    print()
    print("=" * 60)
    print(f"완료: {success_count}개 성공, {not_found_count}개 파일 없음")
    print("=" * 60)

if __name__ == '__main__':
    main()
