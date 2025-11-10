#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Breadcrumb Meta Tag 자동 추가 스크립트 (breadcrumb HTML 파싱 버전)
각 HTML 파일의 <nav class="breadcrumb"> 를 읽어서 meta 태그를 자동 생성합니다.
"""

import os
import re
from pathlib import Path
from bs4 import BeautifulSoup

def extract_breadcrumb_from_html(html_content):
    """
    HTML에서 breadcrumb 네비게이션을 파싱해서 경로를 추출합니다.
    """
    try:
        soup = BeautifulSoup(html_content, 'html.parser')

        # <nav class="breadcrumb"> 찾기
        breadcrumb_nav = soup.find('nav', class_='breadcrumb')

        if not breadcrumb_nav:
            return None

        # breadcrumb-item 들 찾기
        items = breadcrumb_nav.find_all(class_='breadcrumb-item')

        if not items:
            return None

        # 텍스트 추출 (홈은 제외, current 클래스 포함)
        path_parts = []
        for item in items:
            text = item.get_text(strip=True)

            # "홈" 제외
            if text == '홈':
                continue

            # 아이콘 텍스트 제거
            text = text.replace('home', '').strip()

            if text:
                path_parts.append(text)

        if path_parts:
            return ' > '.join(path_parts)

        return None

    except Exception as e:
        print(f"  ⚠ Parsing error: {e}")
        return None

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
        return content, 'updated'
    else:
        # <head> 태그 찾기
        head_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
        if head_match:
            # <head> 바로 다음에 meta 태그 삽입
            insert_pos = head_match.end()
            content = content[:insert_pos] + '\n\t' + new_meta + content[insert_pos:]
            return content, 'added'
        else:
            return None, 'no_head'

def main():
    # html 폴더 경로
    html_dir = Path(__file__).parent / 'html'

    if not html_dir.exists():
        print(f"Error: html 폴더를 찾을 수 없습니다: {html_dir}")
        return

    print("=" * 70)
    print("Breadcrumb Meta Tag 자동 추가 (HTML 파싱 버전)")
    print("=" * 70)
    print()

    # 통계
    stats = {
        'added': 0,
        'updated': 0,
        'no_breadcrumb': 0,
        'no_head': 0,
        'error': 0
    }

    # html 폴더의 모든 HTML 파일 처리
    html_files = sorted(html_dir.glob('*.html'))

    # includes 폴더 제외
    html_files = [f for f in html_files if 'includes' not in f.parts]

    print(f"총 {len(html_files)}개 파일 처리 중...\n")

    for file_path in html_files:
        filename = file_path.name

        # 특정 파일 제외 (예: main.html 등)
        if filename in ['main.html', 'loadingbar.html']:
            continue

        try:
            # HTML 파일 읽기
            with open(file_path, 'r', encoding='utf-8') as f:
                html_content = f.read()

            # breadcrumb 경로 추출
            breadcrumb_path = extract_breadcrumb_from_html(html_content)

            if not breadcrumb_path:
                print(f"⊘ {filename:<50} (breadcrumb 없음)")
                stats['no_breadcrumb'] += 1
                continue

            # meta 태그 추가/업데이트
            new_content, status = add_breadcrumb_meta(file_path, breadcrumb_path)

            if status == 'no_head':
                print(f"✗ {filename:<50} (<head> 태그 없음)")
                stats['no_head'] += 1
                continue

            # 파일 저장
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            if status == 'added':
                print(f"✓ {filename:<50} → {breadcrumb_path}")
                stats['added'] += 1
            elif status == 'updated':
                print(f"↻ {filename:<50} → {breadcrumb_path}")
                stats['updated'] += 1

        except Exception as e:
            print(f"✗ {filename:<50} (오류: {e})")
            stats['error'] += 1

    print()
    print("=" * 70)
    print(f"완료:")
    print(f"  - 추가: {stats['added']}개")
    print(f"  - 업데이트: {stats['updated']}개")
    print(f"  - Breadcrumb 없음: {stats['no_breadcrumb']}개")
    print(f"  - <head> 태그 없음: {stats['no_head']}개")
    print(f"  - 오류: {stats['error']}개")
    print("=" * 70)

if __name__ == '__main__':
    main()
