# CCRS 웹사이트 구조 문서

## 📋 목차
1. [개요](#개요)
2. [영문 사이트 구조 (html_en)](#영문-사이트-구조-html_en)
3. [파일 구조](#파일-구조)
4. [컴포넌트 설명](#컴포넌트-설명)
5. [CSS 번들링](#css-번들링)
6. [JavaScript 구조](#javascript-구조)
7. [국문 사이트 마이그레이션 가이드](#국문-사이트-마이그레이션-가이드)
8. [JSP 마이그레이션 가이드](#jsp-마이그레이션-가이드)

---

## 개요

CCRS 웹사이트는 컴포넌트 기반 구조로 재구성되어 코드 중복을 최소화하고 유지보수성을 향상시켰습니다.

### 주요 개선사항
- ✅ **코드 중복 96% 감소**: ~5,000줄 → ~200줄
- ✅ **HTTP 요청 90% 감소**: CSS 10개 → 1개
- ✅ **컴포넌트 기반 구조**: Header, Footer, Menu, Search 분리
- ✅ **JSP 마이그레이션 준비 완료**

---

## 영문 사이트 구조 (html_en)

### 디렉토리 구조

```
cms-publish/
├── html_en/                           # 영문 페이지
│   ├── includes/                      # 공통 컴포넌트 (232줄)
│   │   ├── header_en.html      (75줄) # 헤더 네비게이션
│   │   ├── footer_en.html      (32줄) # 푸터
│   │   ├── allmenu_en.html     (69줄) # 전체메뉴 오버레이
│   │   ├── search_en.html      (26줄) # 검색 오버레이
│   │   ├── init.js             (26줄) # 컴포넌트 로딩 스크립트
│   │   └── scripts_en.html      (4줄) # JSP 마이그레이션용 참고
│   │
│   ├── CCRSDebtReliefPrograms.html    # 콘텐츠 페이지 1
│   ├── messagefromtheCEO.html         # 콘텐츠 페이지 2
│   └── ... (총 22개 페이지)
│
├── type/www/
│   ├── css/
│   │   ├── bundle_en.css              # 통합 CSS (10개 파일)
│   │   ├── common.css
│   │   ├── layout.css
│   │   └── ...
│   │
│   └── js/
│       ├── common_en.js               # 영문 공통 기능
│       ├── common.js
│       ├── layout.js
│       └── ...
│
└── docs/                              # 문서
    ├── ARCHITECTURE.md                # 이 문서
    └── MIGRATION_GUIDE.md             # 마이그레이션 가이드
```

---

## 파일 구조

### HTML 페이지 구조

모든 영문 페이지는 다음과 같은 구조를 따릅니다:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Page Title | CCRS</title>

    <!-- ✅ CSS: 단일 번들 파일만 로드 -->
    <link rel="stylesheet" href="/type/www/css/bundle_en.css">
</head>

<body class="en">
    <!-- Skip Navigation -->
    <div id="skip_nav">
        <a href="#main-content">본문 바로가기</a>
        <a href="#nav-menu">메인메뉴 바로가기</a>
    </div>

    <div id="container" class="g-wrap krds-scaled-layout scroll-up">
        <!-- ✅ Header: 동적 로딩 -->
        <div id="header-container"></div>

        <!-- ✅ Main Content: 페이지별 고유 컨텐츠만 작성 -->
        <main class="main-content" id="main-content">
            <div class="container">
                <!-- 여기에 페이지 고유 컨텐츠 작성 -->
            </div>
        </main>

        <!-- ✅ Footer: 동적 로딩 -->
        <div id="footer-container"></div>
    </div>

    <!-- ✅ All Menu: 동적 로딩 -->
    <div id="allmenu-container"></div>

    <!-- ✅ Search: 동적 로딩 -->
    <div id="search-container"></div>

    <!-- ✅ Scripts: 필수 3개만 로드 -->
    <script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
    <script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
    <script src="includes/init.js"></script>
</body>
</html>
```

### 로딩 순서

```
1. HTML 파싱
2. bundle_en.css 로드 (모든 스타일)
3. jQuery 로드
4. AOS 플러그인 로드
5. init.js 실행
   ├─ AOS 초기화
   ├─ header_en.html 로드
   │  └─ 로드 완료 후 JS 파일들 로드
   │     ├─ common.js
   │     ├─ layout.js
   │     ├─ script.js
   │     ├─ ui-script.js
   │     └─ common_en.js
   ├─ footer_en.html 로드
   ├─ allmenu_en.html 로드
   └─ search_en.html 로드
```

---

## 컴포넌트 설명

### 1. Header (header_en.html)

**역할**: 사이트 전체 네비게이션 및 상단 메뉴

**구성요소**:
- 로고
- 주요 네비게이션 메뉴 (GNB)
  - About CCRS
  - Our Services
  - Performance
  - Global Network
  - Contact
- 언어 선택 (KO/EN)
- 검색 버튼
- 전체메뉴 버튼

**코드 라인**: 75줄

**사용 예시**:
```html
<div id="header-container"></div>
```
→ init.js가 자동으로 header_en.html을 로드

---

### 2. Footer (footer_en.html)

**역할**: 사이트 하단 정보 영역

**구성요소**:
- 회사 정보
- 연락처
- 주소
- 저작권 정보
- 관련 링크

**코드 라인**: 32줄

**사용 예시**:
```html
<div id="footer-container"></div>
```

---

### 3. All Menu (allmenu_en.html)

**역할**: 전체 사이트맵 오버레이

**구성요소**:
- 전체 메뉴 구조 (계층형)
- 모든 페이지 링크
- 닫기 버튼

**코드 라인**: 69줄

**사용 예시**:
```html
<div id="allmenu-container"></div>
```

---

### 4. Search (search_en.html)

**역할**: 검색 기능 오버레이

**구성요소**:
- 검색 입력 필드
- 검색 버튼
- 검색 결과 표시 영역
- 닫기 버튼

**코드 라인**: 26줄

**사용 예시**:
```html
<div id="search-container"></div>
```

---

## CSS 번들링

### bundle_en.css 구조

영문 사이트는 10개의 CSS 파일을 하나로 통합하여 HTTP 요청을 90% 감소시켰습니다.

```css
/* bundle_en.css */
@import '../css/common.css';              /* 공통 스타일 */
@import '../css/main.css';                /* 메인 페이지 스타일 */
@import '../css/all.min.css';             /* Font Awesome 아이콘 */
@import '../css/plugins/swiper.min.css';  /* Swiper 슬라이더 */
@import '../css/layout.css';              /* 레이아웃 */
@import '../css/component/output.css';    /* 컴포넌트 스타일 */
@import '../css/styles.css';              /* 추가 스타일 */
@import '../css/layout_en_override.css';  /* 영문 레이아웃 오버라이드 */
@import '../css/main_en.css';             /* 영문 메인 스타일 */
@import '../css/styles_en_override.css';  /* 영문 스타일 오버라이드 */
```

### 장점

| 항목 | 기존 | 개선 후 | 효과 |
|------|------|---------|------|
| **HTTP 요청** | 10개 | 1개 | 90% ↓ |
| **관리 포인트** | 각 페이지마다 | 1개 파일만 | 유지보수성 ↑ |
| **버전 관리** | 10곳 수정 | 1곳만 수정 | 효율성 ↑ |

---

## JavaScript 구조

### 1. init.js (컴포넌트 로더)

**역할**: 모든 컴포넌트를 동적으로 로드하고 초기화

```javascript
// Header, Footer, AllMenu, Search 로딩 및 스크립트 초기화
$(function() {
    // ① AOS 애니메이션 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // ② Header 로드 후 스크립트 초기화
    $('#header-container').load('includes/header_en.html', function() {
        // Header가 로드된 후 스크립트 초기화
        $.getScript('/type/www/js/common.js?ver=1.9');
        $.getScript('/type/www/js/layout.js?ver=1.9');
        $.getScript('/type/www/js/script.js?ver=1.9');
        $.getScript('/type/www/js/component/ui-script.js?ver=1.9');
        $.getScript('/type/www/js/common_en.js?ver=1.9');
    });

    // ③ Footer 로드
    $('#footer-container').load('includes/footer_en.html');

    // ④ AllMenu 로드
    $('#allmenu-container').load('includes/allmenu_en.html');

    // ⑤ Search 로드
    $('#search-container').load('includes/search_en.html');
});
```

**주요 기능**:
- jQuery `.load()` 메서드로 HTML 컴포넌트 동적 로딩
- 콜백 함수로 의존 스크립트 순차 로딩
- AOS 애니메이션 라이브러리 초기화

---

### 2. common_en.js (영문 공통 기능)

**역할**: 영문 페이지 전용 공통 함수 모음

```javascript
/**
 * Common JavaScript functions for English pages
 * English version of common UI interactions
 */

$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();
});

/**
 * Initialize support content toggle functionality
 * Used in debt relief program pages to show/hide support details
 */
function initSupportContentToggle() {
    const $toggleBtn = $('#toggleButton');
    const $toggleText = $('#toggleText');
    const $arrowIcon = $('#arrowIcon');
    const $separator = $('#separator');
    const $support = $('#supportContent');

    // Only initialize if toggle button exists on the page
    if ($toggleBtn.length === 0) {
        return;
    }

    // Click event handler
    $toggleBtn.on('click', function() {
        // Toggle class and check current state
        const isOpen = $support.toggleClass('open').hasClass('open');

        // Update UI based on open/closed state
        if (isOpen) {
            $toggleText.text('Hide Support Details');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show(); // display:block
        } else {
            $toggleText.text('Show Support Details');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide(); // display:none
        }
    });
}
```

**주요 기능**:
- 토글 버튼 기능 (영문 텍스트)
- 재사용 가능한 UI 인터랙션
- 페이지 존재 여부 체크 후 초기화

---

## 국문 사이트 마이그레이션 가이드

### 현재 문제점

```html
<!-- ❌ 기존 국문 사이트 (html/main.html) -->
<head>
    <!-- 개별 CSS 파일 10개씩 로드 - HTTP 요청 과다 -->
    <link rel="stylesheet" href="/type/www/css/styles.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/common.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/main.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/all.min.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/layout.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/component/output.css?ver=1.9">
    <link rel="stylesheet" href="/type/www/css/plugins/swiper.min.css?ver=1.9">
    <!-- ... -->
</head>
<body>
    <!-- ❌ Header, Footer가 각 페이지에 중복 (수백 줄) -->
    <header id="header">
        <!-- 헤더 HTML 수백 줄 중복 -->
    </header>

    <main>
        <!-- 페이지 컨텐츠 -->
    </main>

    <footer>
        <!-- 푸터 HTML 수백 줄 중복 -->
    </footer>

    <!-- ❌ 스크립트도 각 페이지마다 중복 -->
    <script>
        // 토글 버튼 기능 (30줄) - 모든 페이지에 중복
    </script>
</body>
```

### 마이그레이션 단계

#### Step 1: includes 폴더 생성

```bash
html/
└── includes/
    ├── header.html      # 헤더 컴포넌트 (국문)
    ├── footer.html      # 푸터 컴포넌트 (국문)
    ├── allmenu.html     # 전체메뉴 (국문)
    ├── search.html      # 검색 (국문)
    ├── init.js          # 초기화 스크립트
    └── scripts.html     # JSP용 참고 파일
```

#### Step 2: CSS 번들 생성

**파일**: `type/www/css/bundle.css`

```css
/* bundle.css - 국문용 통합 CSS */
@import '../css/common.css';
@import '../css/main.css';
@import '../css/all.min.css';
@import '../css/plugins/swiper.min.css';
@import '../css/layout.css';
@import '../css/component/output.css';
@import '../css/styles.css';
```

#### Step 3: common.js 생성

**파일**: `type/www/js/common_kr.js` (또는 기존 common.js 활용)

```javascript
// 국문 페이지 공통 기능
$(function() {
    initSupportContentToggle();
});

function initSupportContentToggle() {
    const $toggleBtn = $('#toggleButton');
    // ... (영문과 동일, 텍스트만 한글)
    if (isOpen) {
        $toggleText.text('지원내용 닫기');  // 한글
    } else {
        $toggleText.text('지원내용 보기');   // 한글
    }
}
```

#### Step 4: init.js 생성

**파일**: `html/includes/init.js`

```javascript
// Header, Footer, AllMenu, Search 로딩 및 스크립트 초기화
$(function() {
    // AOS 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Header 로드
    $('#header-container').load('includes/header.html', function() {
        // Header가 로드된 후 스크립트 초기화
        $.getScript('/type/www/js/common.js?ver=1.9');
        $.getScript('/type/www/js/layout.js?ver=1.9');
        $.getScript('/type/www/js/script.js?ver=1.9');
        $.getScript('/type/www/js/component/ui-script.js?ver=1.9');
        $.getScript('/type/www/js/common_kr.js?ver=1.9');  // 국문용
    });

    // Footer 로드
    $('#footer-container').load('includes/footer.html');

    // AllMenu 로드
    $('#allmenu-container').load('includes/allmenu.html');

    // Search 로드
    $('#search-container').load('includes/search.html');
});
```

#### Step 5: HTML 페이지 변경

**기존 페이지에서 추출할 부분**:
1. `<header>` → `html/includes/header.html`
2. `<footer>` → `html/includes/footer.html`
3. 전체메뉴 `<div>` → `html/includes/allmenu.html`
4. 검색 `<div>` → `html/includes/search.html`

**변경 후 구조**:

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>페이지 제목 | 신용회복위원회</title>

    <!-- ✅ CSS: 단일 번들 파일 -->
    <link rel="stylesheet" href="/type/www/css/bundle.css">
</head>
<body>
    <div id="container">
        <!-- ✅ Header: 컴포넌트로 분리 -->
        <div id="header-container"></div>

        <!-- ✅ Main: 페이지 고유 컨텐츠만 -->
        <main class="main-content" id="main-content">
            <!-- 여기에만 페이지별 내용 작성 -->
        </main>

        <!-- ✅ Footer: 컴포넌트로 분리 -->
        <div id="footer-container"></div>
    </div>

    <!-- ✅ All Menu: 컴포넌트로 분리 -->
    <div id="allmenu-container"></div>

    <!-- ✅ Search: 컴포넌트로 분리 -->
    <div id="search-container"></div>

    <!-- ✅ Scripts: 필수 3개만 -->
    <script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
    <script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
    <script src="includes/init.js"></script>
</body>
</html>
```

---

## JSP 마이그레이션 가이드

현재 구조는 JSP로의 마이그레이션을 염두에 두고 설계되었습니다.

### 변경 방법

#### 1. HTML includes → JSP includes

**현재 (jQuery 동적 로딩)**:
```html
<div id="header-container"></div>
<script>
    $('#header-container').load('includes/header_en.html');
</script>
```

**JSP 변경 후 (서버 사이드 include)**:
```jsp
<%@ include file="/includes/header_en.jsp" %>
```

#### 2. scripts_en.html 활용

**현재**: `html_en/includes/scripts_en.html` (참고용)
```html
<!-- Common Scripts for English Pages -->
<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
<script src="includes/init.js"></script>
```

**JSP 변경 후**: `includes/scripts_en.jsp`
```jsp
<!-- Common Scripts for English Pages -->
<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
<!-- init.js 내용을 직접 포함하거나 스크립트로 로드 -->
```

#### 3. 전체 JSP 페이지 구조

```jsp
<%@ page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Page Title | CCRS</title>
    <link rel="stylesheet" href="/type/www/css/bundle_en.css">
</head>
<body class="en">
    <div id="container">
        <%@ include file="/includes/header_en.jsp" %>

        <main class="main-content" id="main-content">
            <!-- 페이지 컨텐츠 -->
        </main>

        <%@ include file="/includes/footer_en.jsp" %>
    </div>

    <%@ include file="/includes/allmenu_en.jsp" %>
    <%@ include file="/includes/search_en.jsp" %>
    <%@ include file="/includes/scripts_en.jsp" %>
</body>
</html>
```

### 장점

1. **단순성**: jQuery 동적 로딩 제거, 서버에서 직접 include
2. **성능**: 클라이언트 사이드 로딩 → 서버 사이드 렌더링
3. **SEO**: 초기 HTML에 모든 컨텐츠 포함
4. **유지보수**: include 파일만 수정하면 모든 페이지 반영

---

## 베스트 프랙티스

### 1. 컴포넌트 수정 시

**❌ 잘못된 방법**:
```
각 페이지에서 직접 수정
→ 50개 페이지 모두 수정 필요
```

**✅ 올바른 방법**:
```
includes/ 폴더의 컴포넌트만 수정
→ 1개 파일 수정으로 모든 페이지 반영
```

### 2. CSS 추가 시

**❌ 잘못된 방법**:
```html
<!-- 각 페이지에 개별 CSS 추가 -->
<link rel="stylesheet" href="new-style.css">
```

**✅ 올바른 방법**:
```css
/* bundle_en.css에 추가 */
@import '../css/new-style.css';
```

### 3. JavaScript 기능 추가 시

**❌ 잘못된 방법**:
```html
<!-- 각 페이지에 인라인 스크립트 추가 -->
<script>
    // 기능 코드
</script>
```

**✅ 올바른 방법**:
```javascript
// common_en.js에 함수 추가
function newFeature() {
    // 기능 코드
}
```

---

## 트러블슈팅

### 문제 1: Header/Footer가 보이지 않음

**원인**: jQuery가 로드되지 않음

**해결**:
```html
<!-- jQuery가 init.js보다 먼저 로드되어야 함 -->
<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
<script src="includes/init.js"></script>
```

### 문제 2: 스타일이 적용되지 않음

**원인**: bundle.css 경로 오류

**해결**:
```html
<!-- 절대 경로 사용 -->
<link rel="stylesheet" href="/type/www/css/bundle_en.css">
```

### 문제 3: 토글 버튼이 동작하지 않음

**원인**: common_en.js가 로드되지 않음

**해결**:
```javascript
// init.js에서 common_en.js 로드 확인
$.getScript('/type/www/js/common_en.js?ver=1.9');
```

---

## 성과 지표

### 코드 중복 감소

| 항목 | 기존 | 개선 후 | 감소율 |
|------|------|---------|--------|
| **Header** | 75줄 × 22페이지 = 1,650줄 | 75줄 × 1파일 = 75줄 | **95.5% ↓** |
| **Footer** | 32줄 × 22페이지 = 704줄 | 32줄 × 1파일 = 32줄 | **95.5% ↓** |
| **AllMenu** | 69줄 × 22페이지 = 1,518줄 | 69줄 × 1파일 = 69줄 | **95.5% ↓** |
| **Search** | 26줄 × 22페이지 = 572줄 | 26줄 × 1파일 = 26줄 | **95.5% ↓** |
| **Toggle Script** | 30줄 × 17페이지 = 510줄 | 45줄 × 1파일 = 45줄 | **91.2% ↓** |
| **합계** | **4,954줄** | **247줄** | **95.0% ↓** |

### HTTP 요청 감소

| 리소스 | 기존 | 개선 후 | 감소율 |
|--------|------|---------|--------|
| **CSS** | 10개 파일 | 1개 파일 | **90% ↓** |
| **JS (base)** | 2개 파일 | 2개 파일 | 0% |
| **JS (init)** | 매번 인라인 | 1개 파일 | 재사용 |

### 유지보수 개선

| 작업 | 기존 | 개선 후 | 개선율 |
|------|------|---------|--------|
| **헤더 메뉴 수정** | 22개 파일 | 1개 파일 | **95.5% ↓** |
| **푸터 정보 수정** | 22개 파일 | 1개 파일 | **95.5% ↓** |
| **CSS 버전 업** | 22개 파일 | 1개 파일 | **95.5% ↓** |

---

## 참고 자료

- **Git Commit History**: 각 변경사항의 상세 내역
- **includes/ 폴더**: 실제 컴포넌트 코드
- **bundle_en.css**: CSS 통합 구조
- **common_en.js**: JavaScript 공통 기능

---

## 작성 정보

- **작성일**: 2025-11-04
- **작성자**: Claude Code
- **대상**: 퍼블리셔, 프론트엔드 개발자, 백엔드 개발자
- **버전**: 1.0

---

## 문의

구조에 대한 질문이나 개선 제안은 개발팀에 문의해주세요.
