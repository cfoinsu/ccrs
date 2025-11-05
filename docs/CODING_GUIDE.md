# 신용회복위원회 퍼블리싱 코딩 가이드

> **중요**: 이 프로젝트는 메인 퍼블리셔가 작업한 기존 코드베이스가 있습니다.
> 신규 투입 인력은 **반드시 기존 코딩 스타일과 패턴을 따라야** 합니다.

---

## 📋 목차
1. [KRDS 디자인 시스템](#1-krds-디자인-시스템)
2. [HTML 코딩 규칙](#2-html-코딩-규칙)
3. [CSS 네이밍 및 구조](#3-css-네이밍-및-구조)
4. [JavaScript 패턴](#4-javascript-패턴)
5. [파일명 규칙](#5-파일명-규칙)
6. [주석 작성 규칙](#6-주석-작성-규칙)
7. [공통 컴포넌트](#7-공통-컴포넌트)
8. [체크리스트](#8-작업-전-체크리스트)

---

## 1. KRDS 디자인 시스템

> 이 프로젝트는 **KRDS (Korea Responsive Design System)**를 기반으로 퍼블리싱되었습니다.
> 공공기관 웹사이트 표준 가이드를 따르며, 일관된 사용자 경험을 제공합니다.

### 1.1 KRDS란?

**KRDS (Korea Responsive Design System)**는 행정안전부 주관 한국지능정보사회진흥원(NIA)에서 제공하는 대한민국 디지털 정부서비스 UI/UX 가이드라인입니다.

**공식 사이트**: https://www.krds.go.kr/

**주요 목적**
- 국민이 언제 어디서나 정부서비스를 쉽게 경험
- 디자인 가이드라인 및 리소스 제공
- 디자이너, 개발자, 공무원을 위한 표준화된 시스템

### 1.2 KRDS 구성 요소

KRDS는 6가지 핵심 요소로 구성됩니다:

1. **디자인 원칙** - 디지털 정부서비스 UI/UX 방향 및 설계 기준
2. **디지털 포용** - 소외계층 지원 가이드라인
3. **스타일** - 컴포넌트와 패턴의 시각적 일관성 규칙
4. **컴포넌트** - 재사용 가능한 UI 요소 및 공통 인터페이스 표준
5. **기본 패턴** - 핵심 작업을 위한 반복되는 인터페이스 세트
6. **서비스 패턴** - 사용자 여정 기반 경험 설계 가이드

### 1.3 KRDS 클래스 네이밍 규칙

KRDS 컴포넌트는 `krds-` 접두사를 사용합니다.

```html
<!-- ✅ KRDS 컴포넌트 클래스 예시 -->
<div class="g-wrap krds-scaled-layout scroll-up">
<select class="krds-form-select">
<input class="krds-input">
<button class="krds-btn medium">
<div class="krds-table-wrap">
<div class="krds-accordion">
<div class="krds-pagination">
<ul class="krds-info-list decimal">
<div class="krds-form-check">
```

### 1.4 프로젝트에서 사용 중인 KRDS 컴포넌트

#### 1.4.1 레이아웃 클래스
```html
<!-- 기본 래퍼 -->
<div id="container" class="g-wrap krds-scaled-layout scroll-up">
```

**클래스 설명**
- `g-wrap`: 전역 래퍼
- `krds-scaled-layout`: 반응형 스케일 레이아웃
- `scroll-up`: 스크롤 업 효과

#### 1.4.2 폼 컴포넌트
```html
<!-- 셀렉트 박스 -->
<select class="krds-form-select" title="선택">
    <option value="">유관기관 바로가기</option>
</select>

<!-- 셀렉트 박스 (중간 사이즈) -->
<select class="krds-form-select medium">
    <option value="">전체</option>
</select>

<!-- 셀렉트 박스 (정렬용) -->
<select class="krds-form-select-sort" id="sort">
    <option>관련도순</option>
</select>

<!-- 입력 필드 -->
<input type="text" class="krds-input" placeholder="검색어를 입력해주세요">

<!-- 입력 필드 (중간 사이즈) -->
<input type="text" class="krds-input medium">

<!-- 체크박스 -->
<div class="krds-form-check">
    <input type="checkbox" name="chk_1" id="chk_1">
    <label for="chk_1">오늘 하루 보지 않기</label>
</div>
```

#### 1.4.3 버튼 컴포넌트
```html
<!-- 기본 버튼 -->
<button class="krds-btn">버튼</button>

<!-- 사이즈 변형 -->
<button class="krds-btn large">큰 버튼</button>
<button class="krds-btn medium">중간 버튼</button>
<button class="krds-btn small">작은 버튼</button>

<!-- 스타일 변형 -->
<button class="krds-btn medium btn-red">빨간 버튼</button>
<button class="krds-btn large tertiary">3차 버튼</button>

<!-- 아이콘 버튼 -->
<button class="krds-btn medium icon ico-search">
    <span class="sr-only">검색</span>
    <i class="svg-icon ico-sch"></i>
</button>

<!-- 텍스트 버튼 -->
<button class="krds-btn medium text">
    다운로드<i class="svg-icon ico-down"></i>
</button>
```

#### 1.4.4 테이블 컴포넌트
```html
<div class="krds-table-wrap">
    <table class="tbl col board vc">
        <caption>게시판 제목</caption>
        <colgroup>
            <col style="width: 10%">
            <col style="width: 50%">
        </colgroup>
        <thead>
            <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>내용</td>
            </tr>
        </tbody>
    </table>
</div>
```

#### 1.4.5 아코디언 컴포넌트
```html
<!-- 제목형 아코디언 (다중 열기) -->
<div class="krds-accordion type-heading" data-type="multiOpen">
    <div class="accordion-item">
        <button class="accordion-header">
            제목
            <i class="accordion-icon"></i>
        </button>
        <div class="accordion-content">
            내용
        </div>
    </div>
</div>

<!-- 라인형 아코디언 -->
<div class="krds-accordion type-line">
    <div class="accordion-item">
        <button class="accordion-header">제목</button>
        <div class="accordion-content">내용</div>
    </div>
</div>
```

#### 1.4.6 페이지네이션
```html
<div class="krds-pagination">
    <span class="page-navi prev disabled">이전</span>
    <div class="page-links">
        <a class="page-link" href="#">1</a>
        <a class="page-link" href="#">2</a>
        <a class="page-link active" href="#">
            <span class="sr-only">현재페이지 </span>3
        </a>
        <span class="page-link link-dot"></span>
        <a class="page-link" href="#">99</a>
    </div>
    <a class="page-navi next" href="#">다음</a>
</div>
```

#### 1.4.7 정보 리스트
```html
<!-- 숫자 리스트 -->
<ul class="krds-info-list decimal" role="list">
    <li>첫 번째 항목</li>
    <li>두 번째 항목</li>
    <li>세 번째 항목</li>
</ul>

<!-- 점 리스트 -->
<ul class="krds-info-list" role="list">
    <li>항목 1</li>
    <li>항목 2</li>
</ul>
```

### 1.5 KRDS 사용 원칙

**✅ 반드시 지켜야 할 사항**
1. KRDS 컴포넌트는 클래스명 변경 금지
2. `krds-` 접두사 클래스는 커스터마이징하지 않음
3. KRDS 스타일을 덮어쓰지 않고, 추가 클래스로 확장
4. 공식 가이드 준수: https://www.krds.go.kr/

**✅ 추천 사용 패턴**
```html
<!-- ✅ 올바른 예시: KRDS 클래스 + 프로젝트 클래스 조합 -->
<button class="krds-btn medium btn-search">검색</button>
<div class="krds-table-wrap mt20">...</div>

<!-- ❌ 잘못된 예시: KRDS 클래스 수정 -->
<button class="krds-btn-custom">버튼</button>
```

### 1.6 KRDS 접근성 준수

KRDS는 웹 접근성을 준수합니다:

```html
<!-- role 속성 -->
<ul class="krds-info-list decimal" role="list">

<!-- sr-only 클래스 (스크린리더 전용) -->
<span class="sr-only">현재페이지</span>

<!-- title 속성 -->
<select class="krds-form-select" title="선택">

<!-- aria-label -->
<button class="krds-btn icon" aria-label="검색">
```

### 1.7 KRDS CSS 변수 (Design Tokens)

> **중요**: "변수 처리해줘" 라고 요청하면 **KRDS CSS 변수**로 작업합니다.

#### 1.7.1 KRDS 변수 파일 위치
```
/type/www/css/token/krds_tokens.css        # KRDS 디자인 토큰 정의
/type/www/css/component/output.css         # KRDS 토큰 자동 import
```

#### 1.7.2 HTML에서 KRDS 변수 사용하기

**방법 1: output.css 사용 (권장)**
```html
<link rel="stylesheet" href="/type/www/css/common.css?ver=1.0">
<link rel="stylesheet" href="/type/www/css/component/output.css?ver=1.0">
<link rel="stylesheet" href="/type/www/css/your-page.css">
```

**방법 2: 직접 import**
```html
<link rel="stylesheet" href="/type/www/css/token/krds_tokens.css">
<link rel="stylesheet" href="/type/www/css/common.css?ver=1.0">
```

#### 1.7.3 KRDS 변수 종류

**색상 변수**
```scss
// 흰색/회색
var(--krds-color-light-gray-0)      // #ffffff (흰색)
var(--krds-color-light-gray-5)      // #F4F5F6 (배경)
var(--krds-color-light-gray-10)     // #E6E8EA
var(--krds-color-light-gray-20)     // #D2D6DA (테두리)
var(--krds-color-light-gray-40)     // #8A949E (회색 텍스트)
var(--krds-color-light-gray-95)     // #17191B (진한 텍스트)

// 주색상 (Primary - 주황색)
var(--krds-color-light-primary-10)  // #FFF6EA (연한 배경)
var(--krds-color-light-primary-50)  // #F48F01 (메인 오렌지)
var(--krds-color-light-primary-60)  // #ED7801 (진한 오렌지)

// 알파(투명도)
var(--krds-color-light-alpha-black75)   // rgba(0,0,0,0.75)
var(--krds-color-light-alpha-black50)   // rgba(0,0,0,0.5)
var(--krds-light-color-alpha-shadow2)   // 그림자용
```

**간격 변수 (Spacing)**
```scss
var(--krds-number-0)   // 0rem
var(--krds-number-6)   // 1rem (10px)
var(--krds-number-8)   // 1.6rem (16px)
var(--krds-number-9)   // 2rem (20px)
var(--krds-number-10)  // 2.4rem (24px)
var(--krds-number-11)  // 2.8rem (28px)
var(--krds-number-12)  // 3.2rem (32px)
var(--krds-number-14)  // 4rem (40px)
var(--krds-number-16)  // 4.8rem (48px)
```

**타이포그래피 변수**
```scss
// PC 폰트 크기
var(--krds-pc-font-size-body-xsmall)   // 1.3rem
var(--krds-pc-font-size-body-small)    // 1.5rem
var(--krds-pc-font-size-body-medium)   // 1.7rem
var(--krds-pc-font-size-body-large)    // 1.9rem
var(--krds-pc-font-size-label-large)   // 1.9rem
var(--krds-pc-font-size-heading-small) // 1.9rem

// 모바일 폰트 크기
var(--krds-mobile-font-size-body-medium)  // 1.7rem
var(--krds-mobile-font-size-heading-small) // 1.9rem
```

**Border Radius**
```scss
var(--krds-radius-xsmall1)  // 0.2rem
var(--krds-radius-small1)   // 0.4rem
var(--krds-radius-medium1)  // 0.6rem
var(--krds-radius-large1)   // 1rem
var(--krds-radius-max)      // 100rem (pill shape)
```

#### 1.7.4 SCSS에서 KRDS 변수 사용 예시

```scss
// PDF 뷰어 스타일 예시
.pdf-sidebar {
    width: 195px;
    background: var(--krds-color-light-gray-0);
    border-right: 1px solid var(--krds-color-light-gray-20);
    padding: var(--krds-number-11);

    .sidebar-title {
        font-size: var(--krds-pc-font-size-label-large);
        font-weight: 700;
        color: var(--krds-color-light-primary-60);
        padding-top: var(--krds-number-6);
        margin-bottom: var(--krds-number-14);
    }

    .page-prev,
    .page-next {
        width: var(--krds-number-16);
        height: var(--krds-number-16);
        border: 1px solid var(--krds-color-light-gray-20);
        border-radius: var(--krds-radius-max);
        background: var(--krds-color-light-gray-0);

        &:hover {
            border-color: var(--krds-color-light-primary-60);
            background: var(--krds-color-light-primary-60);
            color: var(--krds-color-light-gray-0);
        }
    }
}
```

#### 1.7.5 기존 CSS 변수 vs KRDS 변수 비교

```scss
// ❌ 기존 common.css 변수 (사용 지양)
var(--main-color1)   // #ED7801
var(--main-color2)   // #F48F01
var(--text-colorW)   // #fff
var(--main-color7)   // #d9d9d9

// ✅ KRDS 변수로 변환 (권장)
var(--krds-color-light-primary-60)  // #ED7801
var(--krds-color-light-primary-50)  // #F48F01
var(--krds-color-light-gray-0)      // #ffffff
var(--krds-color-light-gray-20)     // #D2D6DA
```

#### 1.7.6 "변수 처리해줘" 작업 규칙

**요청 시**:
```
사용자: "변수 처리해줘"
```

**작업 내용**:
1. 하드코딩된 색상/크기 값을 KRDS 변수로 변환
2. `px` 단위를 `var(--krds-number-*)` 변수로 변환
3. 색상 코드를 `var(--krds-color-light-*)` 변수로 변환
4. HTML에 `output.css` 또는 `krds_tokens.css` 추가 확인

**예시**:
```scss
// Before (하드코딩)
.component {
    background: #ffffff;
    color: #ED7801;
    padding: 24px;
    border-radius: 24px;
    font-size: 17px;
}

// After (KRDS 변수)
.component {
    background: var(--krds-color-light-gray-0);
    color: var(--krds-color-light-primary-60);
    padding: var(--krds-number-10);
    border-radius: var(--krds-number-10);
    font-size: var(--krds-pc-font-size-body-medium);
}
```

### 1.8 KRDS 버전 정보

- **현재 버전**: v1.0.0
- **레거시 버전**: v04 (별도 제공)
- **문의**: 070-7830-4919 / krds@nia.or.kr

---

## 2. HTML 코딩 규칙

### 2.1 기본 구조
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="format-detection" content="telephone=no, address=no, email=no"/>
    <meta name="keywords" content="신용회복위원회"/>
    <meta name="description" content="신용회복위원회"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>페이지명</title>
    <link rel="shortcut icon" type="image/x-icon" href="/type/www/images/favicon/favicon.ico">

    <!-- CSS 로드 순서 (반드시 준수) -->
    <link rel="stylesheet" href="/type/www/css/common.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/main.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/plugins/swiper.min.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/layout.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/component/output.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/styles.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/all.min.css?ver=0.7">

    <!-- JavaScript 로드 순서 (반드시 준수) -->
    <script src="/type/www/js/jquery-2.2.4.min.js"></script>
</head>
```

**✅ 준수사항**
- DOCTYPE은 HTML5 (`<!DOCTYPE html>`) 사용
- 언어는 한국어 페이지 `lang="ko"`, 영어 페이지 `lang="en"`
- CSS 파일에 캐시 버스팅용 `?ver=0.7` 파라미터 필수
- jQuery는 **head에서 먼저 로드** (주석 참고: "반드시 jQuery 파일을 먼저 로드하세요")

### 2.2 들여쓰기 및 포맷팅
```html
<!-- ✅ 올바른 예시: 탭(tab) 사용 -->
<div id="container">
	<header id="header" class="header">
		<div class="utility-bar">
			<div class="container">
				<!-- 내용 -->
			</div>
		</div>
	</header>
</div>

<!-- ❌ 잘못된 예시: 스페이스 4칸 사용 금지 -->
<div id="container">
    <header id="header" class="header">
        <div class="utility-bar">
```

**✅ 준수사항**
- 들여쓰기: **탭(Tab)** 사용 (스페이스 금지)
- 빈 줄: 큰 섹션 구분 시에만 1줄 공백

### 2.3 주석 스타일
```html
<!-- header:s -->
<header id="header" class="header">
    <!-- Utility Bar -->
    <div class="utility-bar">
        <!-- 내용 -->
    </div>
</header>
<!-- header:e -->

<!-- main contents:s -->
<main class="main-content" id="main-content">
    <!-- section1:s -->
    <section class="section" id="section1">
        <!-- 내용 -->
    </section>
    <!-- section1:e -->
</main>
<!-- main contents:e -->

<!-- Quick Menu:s2 -->
<div class="quick-menu">
    <!-- 내용 -->
</div>
<!-- Quick Menu:e -->
```

**✅ 주석 규칙**
- 시작: `<!-- 컴포넌트명:s -->`
- 종료: `<!-- 컴포넌트명:e -->`
- 큰 섹션은 `:s2` 등으로 구분 가능
- 한글 또는 영어 혼용 가능 (기존 패턴 따름)

### 2.4 ID/Class 네이밍
```html
<!-- ✅ 올바른 ID 네이밍: 카멜케이스 또는 케밥케이스 -->
<div id="skipNav">
<div id="main-content">
<div id="allMenuTag">
<div id="searchTag">

<!-- ✅ 올바른 Class 네이밍: 케밥케이스 -->
<div class="utility-bar">
<div class="header-container">
<div class="gnb-wrap">
<nav class="breadcrumb">
<div class="page-header">
<div class="feedback-section">
```

**✅ 네이밍 규칙**
- **ID**: 카멜케이스(`skipNav`) 또는 케밥케이스(`skip-nav`) 혼용 (기존 패턴 따름)
- **Class**: 반드시 **케밥케이스** (`utility-bar`, `main-content`)
- BEM 방식 사용하지 않음
- 의미 있는 영문명 사용

### 2.5 접근성 (Accessibility)
```html
<!-- Skip Navigation -->
<div id="skip_nav">
    <a href="#main-content">본문 바로가기</a>
    <a href="#nav-menu">메인메뉴 바로가기</a>
</div>

<!-- 스크린 리더 전용 텍스트 -->
<span class="hide">전체메뉴</span>
<span class="sr-only">공유하기</span>
<label class="hide" for="searchText">검색</label>

<!-- ARIA 속성 -->
<button class="action-btn" aria-label="인쇄">
    <i class="fas fa-print"></i>
</button>

<!-- 새창 알림 -->
<a href="#" target="_blank" title="새창열림">링크</a>
```

**✅ 접근성 규칙**
- Skip Navigation 필수
- `.hide` 또는 `.sr-only` 클래스로 스크린 리더 전용 텍스트
- `aria-label`, `aria-hidden` 적절히 사용
- 새창 링크는 `title="새창열림"` 명시

### 2.6 폼 요소
```html
<!-- 검색 폼 -->
<div class="search-area-header">
    <label for="searchText" class="hide">검색</label>
    <input type="text" name="commonSearchText" id="searchText"
           placeholder="검색어를 입력하세요"
           onfocus="this.placeholder=''"
           onblur="this.placeholder='검색어를 입력하세요'">
    <a class="btn-search-header"></a>
</div>

<!-- 셀렉트 박스 -->
<select id="select_error" class="krds-form-select" title="선택">
    <option value="">유관기관 바로가기</option>
    <option value="">항목2</option>
</select>

<!-- 체크박스 -->
<div class="krds-form-check">
    <input type="checkbox" name="chk_1" id="chk_1">
    <label for="chk_1">오늘 하루 보지 않기</label>
</div>
```

**✅ 폼 규칙**
- 모든 `input`에 `label` 연결 (숨겨진 라벨 가능)
- placeholder 포커스 시 제거: `onfocus="this.placeholder=''"`
- KRDS 디자인시스템 클래스 사용: `krds-form-select`, `krds-input`

---

## 3. CSS 네이밍 및 구조

### 3.1 CSS 파일 구조
```
type/www/css/
├── common.css              # 공통 스타일
├── main.css               # 메인 페이지
├── layout.css             # 레이아웃 (헤더, 푸터 등)
├── styles.css             # 주요 스타일
├── sub.css                # 서브 페이지
├── component/
│   ├── output.css         # Tailwind 출력
│   ├── component.css
│   └── contents.css
├── plugins/
│   ├── swiper.min.css
│   ├── aos.css
│   └── slick.css
└── all.min.css            # Font Awesome
```

### 3.2 CSS 클래스 네이밍 패턴
```css
/* ✅ 컴포넌트 기반 네이밍 */
.utility-bar { }
.header-container { }
.gnb-wrap { }
.quick-menu { }
.footer-content { }

/* ✅ 상태 클래스 */
.is-active { }
.is-hide { }
.show { }
.active { }

/* ✅ KRDS 디자인시스템 클래스 */
.krds-form-select { }
.krds-input { }
.krds-btn { }
.krds-pagination { }

/* ✅ 유틸리티 클래스 */
.hide { }          /* 스크린리더 전용 */
.sr-only { }       /* 스크린리더 전용 */
.noprint { }       /* 인쇄 제외 */
.m-hide { }        /* 모바일 숨김 */
```

### 3.3 CSS 주석
```css
/*-------------------------------------------------
Author : jwshin
Create date : 2023-01-19
Version : v1.0
-------------------------------------------------*/

/* 본문 바로가기 */
#skipNav { }

/* 헤더 스타일 */
#header { }

/* 푸터 스타일 */
.footer { }
```

**✅ CSS 주석 규칙**
- 파일 상단: 작성자, 날짜, 버전 정보
- 큰 섹션 구분: `/* 섹션명 */`
- 구분선: `/*----- 구분선 -----*/` 형태도 가능

### 3.4 CSS 속성 순서
```css
/* 기존 코드 패턴 따름 - 명확한 순서 없음 */
#header {
    position: fixed;
    top: 0px;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 140px;
    background-color: #fff;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
}
```

**✅ 속성 순서 권장**
1. 포지셔닝: `position`, `top`, `left`, `z-index`
2. 박스모델: `width`, `height`, `margin`, `padding`
3. 타이포: `font-size`, `color`, `text-align`
4. 기타: `background`, `border`, `transition`

---

## 4. JavaScript 패턴

### 4.1 jQuery 스타일
```javascript
/* ✅ 기존 프로젝트 jQuery 패턴 */

// Document Ready
$(function () {
    // 이벤트 바인딩
    $(".gnb").on("mouseenter focusin", function () {
        $(this).parents("#header").addClass("is-active");
    });

    // 클릭 이벤트
    $(".hamburger-wrap").click(function () {
        $(this).find('.hamburger').toggleClass("is-active");
        $('.all-menu').toggleClass('is-active');
    });
});

// 스크롤 이벤트
$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        $("#header").addClass("is-hide");
    } else {
        $("#header").removeClass("is-hide");
    }
});
```

**✅ jQuery 규칙**
- `$(function() {})` 또는 `$(document).ready()` 사용
- 이벤트 바인딩: `.on()` 메서드 사용
- 클래스 토글: `.toggleClass()`, `.addClass()`, `.removeClass()`
- 체이닝 가능하면 사용

### 4.2 Vanilla JavaScript 스타일
```javascript
/* ✅ script.js 패턴 - 바닐라 JS */

// DOM 선택
const tabItems = document.querySelectorAll('.tab-item');
const submitBtn = document.querySelector('.submit-btn');

// 이벤트 리스너
tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabItems.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        console.log(`Switched to tab: ${tab.textContent}`);
    });
});

// 폼 제출
submitBtn.addEventListener('click', () => {
    const selectedRating = document.querySelector('input[name="satisfaction"]:checked');

    if (!selectedRating) {
        alert('만족도를 선택해 주세요.');
        return;
    }

    alert('소중한 의견이 등록되었습니다. 감사합니다.');
});
```

**✅ Vanilla JS 규칙**
- `const` 사용 (변경되지 않는 변수)
- `querySelector`, `querySelectorAll` 사용
- `addEventListener` 사용
- 화살표 함수 사용 가능
- 주석은 영어로 (기존 패턴)

### 4.3 Swiper 슬라이더 패턴
```html
<div class="swiper-container" id="slider">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="/type/www/images/img/photo-ari00.png" alt="">
        </div>
    </div>
    <div class="swiper-pagination"></div>
</div>

<script>
var swiper = new Swiper(".swiper-container", {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    loopedSlides: 3,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
</script>
```

**✅ Swiper 규칙**
- 인라인 `<script>` 사용 (페이지별 설정)
- `var swiper` 변수명 사용
- 옵션 주석 처리 시: `// autoplay: { ... },`

### 4.4 주석 스타일
```javascript
/* 헤더 스크립트:s */
$(window).scroll(function () {
    // 스크롤 150px 이상일 때 헤더 숨김
    if ($(this).scrollTop() > 150) {
        $("#header").addClass("is-hide");
    }
});
/* 헤더 스크립트:e */

/* 푸터 스크립트:s */
// TOP버튼 애니메이션
/* 푸터 스크립트:e */
```

**✅ 주석 규칙**
- 큰 블록: `/* 설명:s */` ~ `/* 설명:e */`
- 한 줄 주석: `//`
- 함수 설명: 간단한 한글 주석

---

## 5. 파일명 규칙

### 5.1 HTML 파일명
```
✅ 올바른 파일명:
개인워크아웃(연체90일이상)_일반.html
신속채무조정(연체30일이하)_일반.html
게시판_일반_목록.html
고객의소리_선택.html
공지사항_목록.html
불법사금융알아보기_예방가이드.html

❌ 잘못된 파일명:
workout-general.html
quick-debt.html
board_list.html
```

**✅ 파일명 규칙**
- **한글 사용** (영문 금지)
- 구분자: `_` (언더스코어)
- 괄호 사용 가능: `()`
- 카테고리_서브카테고리_타입 구조

### 5.2 이미지 파일명
```
✅ 이미지 경로:
/type/www/images/logo/logo.svg
/type/www/images/ic/header-search.svg
/type/www/images/bg/bg_top_banner01.png
/type/www/img/icons/ico_language.svg
/type/www/img/intro/Logo.png
```

**✅ 이미지 규칙**
- 소문자 사용 (일부 예외: Logo.png)
- 케밥케이스 또는 스네이크케이스
- 접두사: `bg_`, `ic_`, `icon_`, `ico_`

---

## 6. 주석 작성 규칙

### 6.1 HTML 주석
```html
<!-- header:s -->
<!-- header:e -->

<!-- main contents:s -->
<!-- main contents:e -->

<!-- Quick Menu:s2 -->
<!-- Quick Menu:e -->

<!-- 검색 입력폼 -->
<!-- //검색 입력폼 -->

<!-- //table -->
<!-- //pagination -->
```

**✅ HTML 주석 패턴**
- `:s` 시작, `:e` 종료
- `<!-- 설명 -->` ~ `<!-- //설명 -->`
- 한글/영어 혼용

### 6.2 CSS 주석
```css
/* 본문 바로가기 */
/* 헤더 스타일 */
/* 푸터 스타일 */

/*-------------------------------------------------
구분선
-------------------------------------------------*/
```

### 6.3 JavaScript 주석
```javascript
/* 헤더 스크립트:s */
/* 헤더 스크립트:e */

// DOM Elements
// Tab Navigation
// 스크롤 150px 이상일 때 헤더 숨김
```

---

## 7. 공통 컴포넌트

### 7.1 헤더 (Header)
```html
<!-- header:s -->
<header id="header" class="header">
    <!-- Utility Bar -->
    <div class="utility-bar">
        <div class="container">
            <div class="utility-left">
                <div class="header-quickmenu-box">
                    <div class="top-box">
                        <a href="main.html" class="logo">
                            <img src="/type/www/images/logo/logo.svg" alt="logo">
                        </a>
                    </div>
                </div>
            </div>
            <div class="utility-right">
                <ul class="linkbox">
                    <li><a href="#" class="appdown"><span>앱 다운로드</span></a></li>
                    <li><span>상담전화</span><span class="phone-number">1600-5500</span></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- GNB -->
    <div class="header-container">
        <div class="gnb-wrap">
            <nav>
                <ul class="gnb">
                    <li>
                        <a href="#" class="menu-label">채무조정</a>
                        <ul class="depth2">
                            <li><a href="#">하위메뉴</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <ul class="utils">
                <li class="search"><a class="search-open">검색</a></li>
                <li class="en"><a href="/html_en/main_en.html">EN</a></li>
                <li class="hamburger-wrap"><a href="#" class="hamburger">전체메뉴</a></li>
            </ul>
        </div>
    </div>
</header>
<!-- header:e -->
```

### 7.2 사이드바 (Sidebar)
```html
<aside class="sidebar">
    <div class="sidebar-header">
        <h2>채무조정</h2>
    </div>
    <nav class="sidebar-nav">
        <div class="nav-section active">
            <button class="nav-section-title">
                채무조정 길잡이
                <i class="nav-arrow"></i>
            </button>
            <ul class="nav-subsection">
                <li><a href="#" class="nav-subitem active">서브메뉴</a></li>
            </ul>
        </div>
    </nav>
</aside>
```

### 7.3 브레드크럼 (Breadcrumb)
```html
<nav class="breadcrumb">
    <a href="#" class="breadcrumb-item">
        <i class="fas fa-home"></i>
        홈
    </a>
    <span class="breadcrumb-separator"></span>
    <a href="#" class="breadcrumb-item">채무조정</a>
    <span class="breadcrumb-separator"></span>
    <span class="breadcrumb-item current">현재페이지</span>
</nav>
```

### 7.4 페이지 헤더
```html
<div class="page-header">
    <div class="title-wrap">
        <h1>페이지 제목</h1>
        <div class="page-actions">
            <button class="action-btn" aria-label="인쇄">
                <i class="fas fa-print"></i>
            </button>
            <button class="action-btn btn-share" aria-label="공유">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    </div>
</div>
```

### 7.5 퀵메뉴
```html
<!-- Quick Menu:s2 -->
<div class="quick-menu">
    <a class="quick-item" href="#" target="_blank" title="새창 이동">
        <img src="/type/www/images/ic/quickmenu/icon_mydata.png" alt="">
        <span>나의<br>진행상황</span>
    </a>
</div>
<a href="#" class="quick-chat">
    <img src="/type/www/img/icons/quickmenu/icon_bot.svg" alt="">
    <span>챗봇</span>
</a>
<!-- Quick Menu:e -->
```

### 7.6 푸터 (Footer)
```html
<!-- Footer:s -->
<footer class="footer">
    <div class="container">
        <div class="footer-logo">
            <img src="/type/www/images/bg/footer-logo.png" alt="신용회복위원회">
        </div>
        <div class="footer-content">
            <div class="footer-links">
                <a href="#" class="footer-link important">개인정보처리방침</a>
            </div>
            <div class="footer-info">
                <p><strong>주소</strong> : 04520 서울특별시 중구 세종대로 124 한국프레스센터 6~8층</p>
                <p><strong>대표번호</strong> : 1600-5500</p>
                <p>ⓒ 2025 신용회복위원회. All Rights Reserved.</p>
            </div>
        </div>
    </div>
</footer>
<!-- Footer:e -->
```

### 7.7 검색 레이어
```html
<div class="search-menu" id="searchTag">
    <h5>통합검색</h5>
    <div class="search-area-header">
        <label for="searchText" class="hide">검색</label>
        <input type="text" name="commonSearchText" id="searchText"
               placeholder="검색어를 입력하세요"
               onfocus="this.placeholder=''"
               onblur="this.placeholder='검색어를 입력하세요'">
        <a class="btn-search-header"></a>
    </div>
    <a href="#" class="btn-close">
        <img src="/type/www/img/icons/ico_close.svg" alt="검색메뉴 닫기">
    </a>
</div>
```

### 7.8 만족도 평가
```html
<div class="feedback-section noprint">
    <div class="feedback-card">
        <h3>이 페이지에서 제공하는 정보에 대하여 어느 정도 만족하셨습니까?</h3>
        <div class="rating-options">
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="5">
                <span class="radio-custom"></span>
                매우 만족
            </label>
        </div>
        <div class="feedback-input">
            <textarea id="feedback-text" rows="1"></textarea>
            <button type="button" class="submit-btn">제출</button>
        </div>
    </div>
</div>
```

---

## 8. 작업 전 체크리스트

### ✅ HTML 작성 전
- [ ] 기존 유사 페이지 확인 (main.html, 게시판_일반_목록.html 등)
- [ ] CSS/JS 로드 순서 확인
- [ ] 탭 들여쓰기 설정 확인 (스페이스 금지)
- [ ] 한글 파일명 작성

### ✅ CSS 작성 전
- [ ] layout.css, styles.css 기존 클래스 확인
- [ ] 케밥케이스 네이밍 확인
- [ ] KRDS 디자인시스템 클래스 우선 사용
- [ ] 주석 스타일 확인

### ✅ JavaScript 작성 전
- [ ] layout.js 기존 패턴 확인 (jQuery)
- [ ] script.js 기존 패턴 확인 (Vanilla JS)
- [ ] jQuery vs Vanilla JS 선택 (페이지 특성에 맞게)
- [ ] 인라인 스크립트 vs 외부 파일 결정

### ✅ 컴포넌트 추가 전
- [ ] 기존 컴포넌트 재사용 가능 여부 확인
- [ ] 헤더/푸터 동일한 구조 사용
- [ ] 퀵메뉴, 검색, 만족도 평가 공통 컴포넌트 확인

### ✅ 커밋 전
- [ ] 기존 코드와 들여쓰기 일치 확인
- [ ] 한글 주석 확인
- [ ] CSS 파일 버전 파라미터 확인 (`?ver=0.7`)
- [ ] 접근성 요소 확인 (skip nav, aria-label 등)

---

## 9. 자주 하는 실수 (❌ Don't)

### ❌ HTML
```html
<!-- 잘못된 예시 -->
<!DOCTYPE HTML>                          <!-- HTML5는 소문자 -->
<meta name="viewport" content="width=device-width">  <!-- initial-scale=1 누락 -->
<link rel="stylesheet" href="/css/layout.css">       <!-- ?ver=0.7 누락 -->
<div class="utility_bar">                            <!-- 언더스코어 사용 금지 -->
    <span>내용</span>                                 <!-- 들여쓰기 스페이스 금지 -->
</div>
```

### ❌ CSS
```css
/* 잘못된 예시 */
.utility_bar { }              /* 언더스코어 금지 */
.UtilityBar { }               /* 카멜케이스 금지 */
.utility-bar__item { }        /* BEM 방식 사용 안 함 */
```

### ❌ JavaScript
```javascript
// 잘못된 예시
$("#header").mouseenter(function() {  // .on() 사용 권장
    $(this).addClass("active")
})

document.getElementById('header')     // querySelector 사용 권장
```

---

## 10. SCSS 작업 가이드 (영문 사이트 전용)

> **적용 대상**: 영문 사이트의 새로운 컨텐츠만 SCSS로 작업
> **한국어 사이트**: 기존 CSS 방식 유지

### 10.1 SCSS 사용 전략

#### ✅ 작업 구분
```
한국어 사이트 (html/)
→ 기존 CSS로 작업 (layout.css, styles.css 수정)

영문 사이트 (html_en/)
→ 기존 CSS (유지) + 새 컨텐츠만 SCSS로 작업
```

#### ✅ 왜 이렇게 하는가?
- **한국어**: 메인 퍼블리셔와 동일한 방식 유지 (충돌 방지)
- **영문**: 새로운 기술 적용 (변수, 믹스인 활용)

### 10.2 SCSS 폴더 구조

```
cms-publish/
└── type/www/
    ├── css/                          # 기존 CSS 폴더
    │   ├── layout.css                # 기존 (한글/영문 공통)
    │   ├── styles.css                # 기존 (한글)
    │   ├── main.css                  # 기존 (한글 메인)
    │   ├── sub.css                   # 기존 (한글 서브)
    │   ├── main_en.css               # 기존 (영문 메인)
    │   ├── styles_en.css             # ← SCSS 컴파일 결과
    │   └── sub_en.css                # ← SCSS 컴파일 결과
    └── scss/                         # ← 새로 생성 (영문 전용)
        ├── _variables.scss           # 변수 정의
        ├── _mixins.scss              # 믹스인 정의
        ├── pages/                    # 페이지별 SCSS
        │   ├── _main.scss            # 메인 페이지
        │   ├── _about.scss           # About 페이지
        │   ├── _contact.scss         # Contact 페이지
        │   └── _search.scss          # 검색 페이지
        ├── styles_en.scss            # 메인 컴파일 파일
        └── sub_en.scss               # 서브 컴파일 파일
```

### 10.3 SCSS 파일 네이밍

```scss
// ✅ 올바른 파일명
_variables.scss      // 변수 파일 (언더스코어로 시작)
_mixins.scss         // 믹스인 파일
_about.scss          // 부분 파일 (partial)
styles_en.scss       // 메인 컴파일 파일 (국문 패턴 + _en)
sub_en.scss          // 서브 컴파일 파일

// ❌ 잘못된 파일명
variables.scss       // 언더스코어 없음 (직접 컴파일됨)
en-custom.scss       // 케밥케이스 금지 (언더스코어 사용)
stylesEn.scss        // 카멜케이스 금지
styles-en.scss       // 케밥케이스 금지 (언더스코어 사용)
```

**✅ 네이밍 규칙**
- **부분 파일**: `_` 시작 (컴파일 제외) - `_variables.scss`, `_about.scss`
- **메인 파일**: `_` 없음 (컴파일 대상) - `styles_en.scss`, `sub_en.scss`
- **영문 접미사**: 국문 파일명 + `_en` (언더스코어 사용)
  - `styles.css` (한글) → `styles_en.scss` → `styles_en.css` (영문)
  - `sub.css` (한글) → `sub_en.scss` → `sub_en.css` (영문)

**✅ 일관성 유지**
```
한글 CSS:  layout.css, styles.css, main.css, sub.css
영문 CSS:  layout.css (공통), main_en.css, styles_en.css, sub_en.css
영문 SCSS: styles_en.scss, sub_en.scss
```

### 10.4 _variables.scss 작성법

```scss
/*-------------------------------------------------
영문 사이트용 SCSS 변수
Author : 작성자명
Create date : 2025-10-23
Version : v1.0
-------------------------------------------------*/

// ===== KRDS 기반 색상 =====
$main-color1: #004ea2;
$main-color2: #0066cc;
$main-color7: #e0e0e0;

$color-primary: $main-color1;
$color-text: #333333;
$color-border: #dddddd;

// ===== 폰트 =====
$font-family-base: 'SUIT', 'Roboto', 'Arial', sans-serif;
$font-size-base: 16px;
$font-weight-bold: 700;

// ===== 간격 =====
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;

// ===== 브레이크포인트 =====
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1280px;

// ===== 레이아웃 =====
$container-width: 1200px;
$header-height: 140px;
```

**✅ 변수 네이밍 규칙**
- **케밥케이스**: `$main-color`, `$font-size-base`
- **의미 있는 이름**: `$color-primary` (O), `$blue` (X)
- **그룹별 구분**: 색상, 폰트, 간격 등

### 10.5 _mixins.scss 작성법

```scss
/*-------------------------------------------------
영문 사이트용 SCSS 믹스인
-------------------------------------------------*/

@import 'variables';

// ===== 반응형 =====
@mixin mobile {
  @media (max-width: #{$breakpoint-mobile - 1px}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: $breakpoint-desktop) {
    @content;
  }
}

// ===== Flexbox =====
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// ===== 텍스트 생략 =====
@mixin text-ellipsis($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

// ===== 컨테이너 =====
@mixin container {
  max-width: $container-width;
  margin: 0 auto;
  padding: 0 $spacing-md;
}
```

### 10.6 페이지별 SCSS 작성

**pages/_about.scss**
```scss
/*-------------------------------------------------
영문 사이트 - About 페이지
-------------------------------------------------*/

@import '../variables';
@import '../mixins';

.about-page {
  // BEM 네이밍 사용 가능 (SCSS에서만)
  &__container {
    @include container;
    padding-top: 40px;
  }

  &__title {
    font-size: 32px;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin-bottom: $spacing-lg;

    @include mobile {
      font-size: 24px;
    }
  }

  &__content {
    line-height: 1.6;
    color: $color-text;
  }
}
```

**✅ SCSS 작성 규칙**
- BEM 네이밍 사용 가능 (`&__`, `&--`)
- 중첩 깊이는 3단계까지만
- 변수와 믹스인 적극 활용
- 반응형은 믹스인 사용

### 10.7 메인 파일 작성

#### styles_en.scss (메인 페이지용)
```scss
/*-------------------------------------------------
영문 사이트 메인 스타일
Author : 작성자명
Create date : 2025-10-23
Version : v1.0
-------------------------------------------------*/

// 공통
@import 'variables';
@import 'mixins';

// 페이지별 (필요한 것만 import)
@import 'pages/main';
@import 'pages/about';
@import 'pages/contact';

// 컴포넌트가 있다면
// @import 'components/card';
// @import 'components/button';
```

#### sub_en.scss (서브 페이지용)
```scss
/*-------------------------------------------------
영문 사이트 서브 페이지 스타일
-------------------------------------------------*/

// 공통
@import 'variables';
@import 'mixins';

// 서브 페이지
@import 'pages/search';
@import 'pages/board';
@import 'pages/faq';
```

**✅ import 순서**
1. 변수 (`_variables.scss`)
2. 믹스인 (`_mixins.scss`)
3. 페이지/컴포넌트 (`pages/_about.scss` 등)

**✅ 파일 분리 전략**
- `styles_en.scss`: 메인 페이지, About, Contact 등 주요 페이지
- `sub_en.scss`: 검색, 게시판, FAQ 등 서브 페이지

### 10.8 컴파일 설정

#### package.json
```json
{
  "name": "cms-publish",
  "version": "1.0.0",
  "description": "신용회복위원회 퍼블리싱 프로젝트",
  "scripts": {
    "scss:watch": "sass --watch type/www/scss:type/www/css --style compressed",
    "scss:build": "sass type/www/scss:type/www/css --style compressed",
    "scss:dev": "sass --watch type/www/scss:type/www/css --style expanded --source-map"
  },
  "devDependencies": {
    "sass": "^1.69.0"
  }
}
```

#### 명령어
```bash
# 개발 모드 (자동 컴파일 + 소스맵)
npm run scss:dev

# 감시 모드 (자동 컴파일 압축)
npm run scss:watch

# 빌드 (1회 컴파일 압축)
npm run scss:build
```

### 10.9 HTML에서 사용

#### 영문 메인 페이지
```html
<!-- html_en/main_en.html -->
<head>
    <!-- 기존 CSS (공통) -->
    <link rel="stylesheet" href="/type/www/css/common.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/layout.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/styles.css?ver=0.7">

    <!-- 기존 영문 CSS -->
    <link rel="stylesheet" href="/type/www/css/main_en.css?ver=0.7">

    <!-- SCSS 컴파일 결과 (메인) -->
    <link rel="stylesheet" href="/type/www/css/styles_en.css?ver=0.7">
</head>
```

#### 영문 서브 페이지
```html
<!-- html_en/about_en.html, html_en/contact_en.html 등 -->
<head>
    <!-- 기존 CSS (공통) -->
    <link rel="stylesheet" href="/type/www/css/common.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/layout.css?ver=0.7">
    <link rel="stylesheet" href="/type/www/css/styles.css?ver=0.7">

    <!-- 기존 영문 CSS -->
    <link rel="stylesheet" href="/type/www/css/main_en.css?ver=0.7">

    <!-- SCSS 컴파일 결과 (서브) -->
    <link rel="stylesheet" href="/type/www/css/sub_en.css?ver=0.7">
</head>
```

**✅ CSS 로드 순서**
1. 공통 CSS (기존) - `common.css`, `layout.css`, `styles.css`
2. 영문 CSS (기존) - `main_en.css`
3. SCSS 컴파일 결과 (마지막) - `styles_en.css` 또는 `sub_en.css`

**✅ 페이지별 CSS 선택**
- 메인 페이지: `styles_en.css` 사용
- 서브 페이지: `sub_en.css` 사용

### 10.10 .gitignore 설정

```
# Node modules
node_modules/
package-lock.json

# SCSS 소스맵
*.css.map
.sass-cache/

# SCSS 컴파일 결과 (선택사항)
# type/www/css/styles_en.css
# type/www/css/sub_en.css
```

**컴파일 결과 포함 여부:**
- **포함 O**: 배포 서버에서 컴파일 불필요 (추천)
- **포함 X**: 소스만 관리, CI/CD에서 빌드 (빌드 환경 필요)

### 10.11 SCSS 작업 체크리스트

#### ✅ 작업 시작 전
- [ ] `type/www/scss/` 폴더 생성
- [ ] `package.json` 생성
- [ ] `npm install` 실행
- [ ] `_variables.scss`, `_mixins.scss` 생성
- [ ] `styles_en.scss`, `sub_en.scss` 메인 파일 생성

#### ✅ 페이지 작업 시
- [ ] `pages/_파일명.scss` 생성 (언더스코어 필수)
- [ ] 변수와 믹스인 import
- [ ] BEM 네이밍으로 작성
- [ ] 반응형 믹스인 사용
- [ ] `styles_en.scss` 또는 `sub_en.scss`에 import 추가

#### ✅ 컴파일 확인
- [ ] `npm run scss:dev` 실행
- [ ] `type/www/css/styles_en.css`, `sub_en.css` 생성 확인
- [ ] HTML에 CSS 링크 추가 (`styles_en.css` 또는 `sub_en.css`)
- [ ] 브라우저에서 스타일 확인

#### ✅ 커밋 전
- [ ] 컴파일된 CSS 파일 확인
- [ ] 소스맵 파일 `.gitignore` 확인
- [ ] 버전 파라미터 업데이트 (`?ver=0.8`)

### 10.12 SCSS vs CSS 비교

#### SCSS 장점 (영문 사이트)
```scss
// ✅ 변수 사용
$color-primary: #004ea2;
.button { background: $color-primary; }

// ✅ 중첩
.nav {
  &__item { }
  &__link { }
}

// ✅ 믹스인
@include flex-center;
@include mobile { font-size: 14px; }
```

#### CSS 방식 (한국어 사이트)
```css
/* 기존 방식 유지 */
.button { background: #004ea2; }
.nav-item { }
.nav-link { }

@media (max-width: 767px) {
  .title { font-size: 14px; }
}
```

### 10.13 자주 하는 실수 (SCSS)

```scss
// ❌ 잘못된 파일명
en-custom.scss              // 케밥케이스 금지
stylesEn.scss               // 카멜케이스 금지
styles-en.scss              // 케밥케이스 금지

// ✅ 올바른 파일명
styles_en.scss              // 언더스코어 사용
sub_en.scss                 // 국문 패턴 + _en

// ❌ 잘못된 import
@import variables;          // 따옴표 필요
@import '_variables.scss';  // 확장자 불필요

// ✅ 올바른 import
@import 'variables';        // 언더스코어, 확장자 생략
@import 'mixins';

// ❌ 잘못된 변수명
$colorPrimary: #000;        // 카멜케이스 금지
$color_primary: #000;       // 언더스코어 금지 (CSS는 OK, SCSS는 케밥)

// ✅ 올바른 변수명
$color-primary: #000;       // 케밥케이스

// ❌ 중첩 너무 깊음
.button {
  .icon {
    .text {
      .label { }            // 4단계 (금지)
    }
  }
}

// ✅ BEM 네이밍 사용
.button {
  &__icon { }
  &__text { }
  &__label { }
}
```

**✅ 핵심 정리**
1. 파일명: `파일명_en.scss` (언더스코어)
2. 변수: `$color-primary` (케밥케이스)
3. import: `@import 'variables'` (따옴표 필수, 언더스코어/확장자 생략)
4. 중첩: 3단계까지만
5. BEM: `&__`, `&--` 활용

---

## 11. 반응형 작업 가이드

### 11.1 반응형 기본 원칙

#### ✅ 모바일 퍼스트 전략
- 모바일 기준으로 먼저 작업 후, 태블릿 → 데스크톱 순으로 확장
- `@media (min-width: ...)` 사용 권장

#### ✅ 브레이크포인트 기준
```scss
// 기본 브레이크포인트
$breakpoint-mobile: 768px;      // 768px 미만: 모바일
$breakpoint-tablet: 1024px;     // 768px ~ 1023px: 태블릿
$breakpoint-desktop: 1280px;    // 1024px 이상: 데스크톱
```

### 11.2 반응형 믹스인 사용

#### 믹스인 정의 (mixins/breakpoints.scss)
```scss
// 모바일 (767px 이하)
@mixin mobile {
  @media (max-width: #{$breakpoint-mobile - 1px}) {
    @content;
  }
}

// 태블릿 이하 (1023px 이하)
@mixin tabletLess {
  @media (max-width: #{$breakpoint-tablet - 1px}) {
    @content;
  }
}

// 태블릿만 (768px ~ 1023px)
@mixin tablet {
  @media (min-width: $breakpoint-mobile) and (max-width: #{$breakpoint-tablet - 1px}) {
    @content;
  }
}

// 데스크톱 (1024px 이상)
@mixin desktop {
  @media (min-width: $breakpoint-tablet) {
    @content;
  }
}
```

### 11.3 반응형 스타일 작성 패턴

#### 패턴 1: 모바일 퍼스트
```scss
// ✅ 권장: 모바일 → 데스크톱 순서
.search-input-area {
    // 기본 스타일 (모바일)
    background-color: var(--krds-color-light-primary-10);
    border-radius: var(--krds-number-10);
    padding: 20px 16px;

    // 태블릿 이하
    @include tabletLess {
        padding: 20px 16px;
        border-radius: 16px;
    }

    // 모바일
    @include mobile {
        padding: 16px;
        border-radius: 16px;
    }
}
```

#### 패턴 2: 중첩 방식
```scss
// ✅ SCSS에서는 중첩 사용 가능
.en {
    .search-input-area {
        background-color: var(--krds-color-light-primary-10);
        padding: 20px 16px;

        @include tabletLess {
            padding: 20px 16px;
        }

        @include mobile {
            padding: 16px;
            border-radius: 16px;
        }
    }
}
```

#### 패턴 3: 일관된 순서 유지
```scss
// ✅ 항상 아래 순서로 작성
.component {
    // 1. 기본 스타일 (데스크톱)
    width: 100%;
    padding: 24px;

    // 2. 태블릿 이하 (@include tabletLess)
    @include tabletLess {
        padding: 20px;
    }

    // 3. 모바일 (@include mobile)
    @include mobile {
        padding: 16px;
        border-radius: 16px;
    }
}
```

### 11.4 반응형 스타일 작성 예시

#### 예시 1: 검색 입력 영역
```scss
.search-input-area {
    background-color: var(--krds-color-light-primary-10);
    border-radius: var(--krds-number-10);
    padding: 20px 16px;
    margin-bottom: var(--krds-number-12);

    @include tabletLess {
        padding: 20px 16px;
        border-radius: 16px;
    }

    @include mobile {
        padding: 16px;
        border-radius: 16px;
    }
}
```

#### 예시 2: 그리드 레이아웃
```scss
.benefits-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @include tabletLess {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    @include mobile {
        grid-template-columns: 1fr;
        gap: 16px;
    }
}
```

#### 예시 3: 폰트 크기
```scss
.page-title {
    font-size: 32px;
    font-weight: 700;

    @include tabletLess {
        font-size: 28px;
    }

    @include mobile {
        font-size: 24px;
    }
}
```

#### 예시 4: Flexbox 방향 전환
```scss
.service-process {
    display: flex;
    align-items: center;
    gap: 24px;

    @include mobile {
        flex-direction: column;
        gap: 16px;
    }
}
```

### 11.5 반응형 체크리스트

#### ✅ 작업 전 확인사항
- [ ] `mixins/breakpoints.scss` 파일 확인
- [ ] 브레이크포인트 변수 확인 (`$breakpoint-mobile`, `$breakpoint-tablet`)
- [ ] 모바일 퍼스트 전략 이해

#### ✅ 작업 중 확인사항
- [ ] 믹스인 순서 준수 (`@include tabletLess` → `@include mobile`)
- [ ] padding/margin 값 반응형으로 조정
- [ ] font-size 반응형으로 조정
- [ ] grid/flexbox 레이아웃 반응형 처리
- [ ] 이미지 크기 반응형 처리

#### ✅ 작업 후 확인사항
- [ ] 데스크톱 화면 테스트 (1920px, 1280px)
- [ ] 태블릿 화면 테스트 (1024px, 768px)
- [ ] 모바일 화면 테스트 (375px, 414px)
- [ ] 가로 스크롤 발생 여부 확인
- [ ] 요소 겹침/깨짐 확인

### 11.6 자주 하는 실수 (반응형)

```scss
// ❌ 잘못된 예시 1: 순서 뒤바뀜
.component {
    @include mobile {
        padding: 16px;
    }

    padding: 24px;  // 모바일보다 뒤에 나옴 (덮어씀)
}

// ✅ 올바른 예시 1: 기본 스타일이 먼저
.component {
    padding: 24px;

    @include mobile {
        padding: 16px;
    }
}

// ❌ 잘못된 예시 2: 하드코딩된 미디어 쿼리
.component {
    @media (max-width: 767px) {
        padding: 16px;
    }
}

// ✅ 올바른 예시 2: 믹스인 사용
.component {
    @include mobile {
        padding: 16px;
    }
}

// ❌ 잘못된 예시 3: 불필요한 중복
.component {
    padding: 24px;

    @include tabletLess {
        padding: 24px;  // 기본값과 동일 (불필요)
    }
}

// ✅ 올바른 예시 3: 변경되는 값만 작성
.component {
    padding: 24px;

    @include mobile {
        padding: 16px;  // 변경되는 값만
    }
}

// ❌ 잘못된 예시 4: 믹스인 순서 뒤바뀜
.component {
    padding: 24px;

    @include mobile {
        padding: 16px;
    }

    @include tabletLess {
        padding: 20px;  // mobile보다 뒤에 나와서 덮어씀
    }
}

// ✅ 올바른 예시 4: 올바른 순서
.component {
    padding: 24px;

    @include tabletLess {
        padding: 20px;
    }

    @include mobile {
        padding: 16px;
    }
}
```

### 11.7 반응형 헤더 고정 (모바일/태블릿)

모바일과 태블릿에서 헤더를 상단에 고정하려면:

```scss
/* 헤더 상단 고정 */
#header {
    // 태블릿 이하에서 상단 고정
    @include tabletLess {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
        background: var(--krds-color-light-gray-0);
        box-shadow: 0 2px 8px var(--krds-light-color-alpha-shadow1);
    }

    // 모바일에서 상단 고정
    @include mobile {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
}

// 헤더 고정 시 본문 여백 추가 (헤더에 가려지지 않게)
body {
    @include tabletLess {
        padding-top: 140px; // 헤더 높이만큼
    }

    @include mobile {
        padding-top: 120px; // 모바일 헤더 높이만큼
    }
}
```

**✅ 작업 순서**
1. 헤더에 `position: fixed` 적용 (반응형만)
2. `z-index: 999` 로 최상단 배치
3. `body`에 `padding-top` 추가 (헤더 높이만큼)
4. `box-shadow` 로 헤더 구분 명확히

**❌ 주의사항**
- 데스크톱에서는 `position: fixed` 사용 금지
- `padding-top` 값은 실제 헤더 높이와 일치시킬 것
- `z-index`는 999 이상 사용 (다른 요소와 겹치지 않게)

### 11.8 반응형 테스트 가이드

#### 크롬 개발자 도구
```
1. F12 또는 우클릭 → 검사
2. 좌측 상단 모바일 아이콘 클릭 (Ctrl + Shift + M)
3. 해상도 선택:
   - iPhone SE (375px)
   - iPhone 12 Pro (390px)
   - iPad (768px)
   - iPad Pro (1024px)
   - Responsive (커스텀 크기)
```

#### 테스트 체크리스트
```
✅ 모바일 (375px)
- [ ] 텍스트 잘 읽힘
- [ ] 버튼 터치하기 쉬움
- [ ] 가로 스크롤 없음
- [ ] 이미지 잘 보임
- [ ] 헤더 상단 고정 확인

✅ 태블릿 (768px)
- [ ] 레이아웃 적절
- [ ] 간격 적절
- [ ] 폰트 크기 적절
- [ ] 헤더 상단 고정 확인

✅ 데스크톱 (1280px)
- [ ] 레이아웃 깔끔
- [ ] 요소 배치 적절
- [ ] 여백 적절
- [ ] 헤더 fixed 아님 (정상 배치)
```

---

## 12. 참고 파일

### 📂 반드시 참고할 파일
1. **HTML**: `html/main.html` - 메인 페이지 전체 구조
2. **HTML**: `html/게시판_일반_목록.html` - 서브 페이지 구조
3. **CSS**: `type/www/css/layout.css` - 헤더/푸터 스타일
4. **CSS**: `type/www/css/styles.css` - 주요 컴포넌트 스타일
5. **JS**: `type/www/js/layout.js` - jQuery 패턴
6. **JS**: `type/www/js/script.js` - Vanilla JS 패턴

---

## 13. 문의 및 질문

기존 퍼블리셔와 코드 리뷰를 통해 패턴 확인하세요.
이 가이드에 없는 사항은 **기존 작업물을 우선적으로 참고**하세요.

---

**마지막 업데이트**: 2025-10-23
**작성자**: AI 분석 기반 코딩 가이드
**버전**: v1.1 (SCSS 가이드 추가)
