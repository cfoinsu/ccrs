# UI 컴포넌트 라이브러리

> 국문 사이트에서 이미 제작된 UI 컴포넌트들의 모음입니다.
> 영문 사이트 작업 시 이 문서를 참고하여 동일한 컴포넌트를 재사용하세요.

---

## 목차

1. [레이아웃 컴포넌트](#1-레이아웃-컴포넌트)
2. [네비게이션 컴포넌트](#2-네비게이션-컴포넌트)
3. [KRDS 폼 컴포넌트](#3-krds-폼-컴포넌트)
4. [검색 컴포넌트](#4-검색-컴포넌트)
5. [게시판 컴포넌트](#5-게시판-컴포넌트)
6. [콘텐츠 박스 컴포넌트](#6-콘텐츠-박스-컴포넌트)
7. [버튼 컴포넌트](#7-버튼-컴포넌트)
8. [테이블 컴포넌트](#8-테이블-컴포넌트)
9. [첨부파일 컴포넌트](#9-첨부파일-컴포넌트)
10. [피드백 컴포넌트](#10-피드백-컴포넌트)
11. [퀵메뉴 컴포넌트](#11-퀵메뉴-컴포넌트)

---

## 1. 레이아웃 컴포넌트

### 1.1 기본 레이아웃

**파일 위치:** 모든 서브 페이지
**CSS 클래스:** `.container`, `.content-layout`, `.content-area`

#### HTML 구조
```html
<main class="main-content" id="main-content">
    <div class="container">
        <div class="content-layout">
            <!-- Sidebar (옵션) -->
            <aside class="sidebar">
                <!-- 사이드바 내용 -->
            </aside>

            <!-- Content Area -->
            <div class="content-area">
                <!-- 콘텐츠 영역 -->
            </div>
        </div>
    </div>
</main>
```

**사용 예시:**
- 사이드바가 있는 페이지: `자주묻는질문_FAQ.html`
- 사이드바가 없는 페이지: `통합검색_cursor.html`

---

### 1.2 사이드바 (Sidebar)

**파일 위치:** `자주묻는질문_FAQ.html:181-227`
**CSS 클래스:** `.sidebar`, `.sidebar-header`, `.sidebar-nav`

#### HTML 구조
```html
<aside class="sidebar">
    <div class="sidebar-header">
        <h2>소통과 참여</h2>
    </div>
    <nav class="sidebar-nav">
        <!-- 단일 링크 섹션 -->
        <div class="nav-section active">
            <a href="#" class="nav-section-title">메뉴 이름</a>
        </div>

        <!-- 하위 메뉴가 있는 섹션 -->
        <div class="nav-section">
            <button class="nav-section-title">
                고객소통
                <i class="nav-arrow"></i>
            </button>
            <ul class="nav-subsection">
                <li><a href="#" class="nav-subitem">하위메뉴 1</a></li>
                <li><a href="#" class="nav-subitem active">하위메뉴 2</a></li>
            </ul>
        </div>
    </nav>
</aside>
```

**CSS 파일:** `type/www/css/layout.css`

**특징:**
- `.active` 클래스로 현재 선택된 메뉴 표시
- `.nav-arrow` 아이콘으로 펼침/접힘 상태 표시
- 아코디언 방식으로 하위 메뉴 토글

---

## 2. 네비게이션 컴포넌트

### 2.1 Breadcrumb (경로 탐색)

**파일 위치:** `자주묻는질문_FAQ.html:218-229`
**CSS 클래스:** `.breadcrumb`, `.breadcrumb-item`, `.breadcrumb-separator`

#### HTML 구조
```html
<nav class="breadcrumb">
    <a href="#" class="breadcrumb-item">
        <i class="fas fa-home"></i>
        홈
    </a>
    <span class="breadcrumb-separator"></span>
    <a href="#" class="breadcrumb-item">소통과 참여</a>
    <span class="breadcrumb-separator"></span>
    <a href="#" class="breadcrumb-item">자주묻는 질문 (FAQ)</a>
    <span class="breadcrumb-separator"></span>
    <span class="breadcrumb-item current">FAQ</span>
</nav>
```

**CSS 파일:** `type/www/css/layout.css`

**특징:**
- 홈 아이콘 (Font Awesome)
- `.current` 클래스로 현재 페이지 표시
- 구분자 자동 추가

---

### 2.2 Page Header (페이지 제목)

**파일 위치:** `자주묻는질문_FAQ.html:231-246`
**CSS 클래스:** `.page-header`, `.title-wrap`, `.page-actions`

#### HTML 구조
```html
<div class="page-header">
    <div class="title-wrap">
        <h1>FAQ</h1>
        <div class="page-actions">
            <button class="action-btn" aria-label="인쇄">
                <i class="fas fa-print"></i>
            </button>
            <button class="action-btn" aria-label="공유">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    </div>
</div>
```

**CSS 파일:** `type/www/css/layout.css`

**특징:**
- 인쇄, 공유 버튼 포함
- Font Awesome 아이콘 사용
- `aria-label`로 접근성 지원

---

### 2.3 탭 네비게이션 (Tab Navigation)

**파일 위치:** `자주묻는질문_FAQ.html:279-314`
**CSS 클래스:** `.tab.fill.middle.wrap`, `.btn-tab`

#### HTML 구조
```html
<div class="tab-list-top">
    <div class="tab fill middle wrap">
        <ul role="tablist">
            <li id="stab01" role="tab" aria-selected="true"
                aria-controls="stabpanel01" class="active">
                <button type="button" class="btn-tab">
                    전체<i class="sr-only">선택됨</i>
                </button>
            </li>
            <li id="stab02" role="tab" aria-selected="false"
                aria-controls="stabpanel02">
                <button type="button" class="btn-tab">채무조정</button>
            </li>
            <li id="stab03" role="tab" aria-selected="false">
                <button type="button" class="btn-tab">소액대출</button>
            </li>
        </ul>
    </div>
</div>
```

**CSS 파일:** `type/www/css/component/output.css`

**특징:**
- ARIA 속성으로 접근성 지원 (`role`, `aria-selected`, `aria-controls`)
- `.active` 클래스로 선택된 탭 표시
- `.fill` - 가로 전체 너비 채움
- `.middle` - 중간 정렬
- `.wrap` - 탭이 많을 경우 줄바꿈

**JavaScript 처리:**
```javascript
$('.tab .btn-tab').on('click', function() {
    const $parent = $(this).parent();
    $('.tab li').removeClass('active');
    $parent.addClass('active');
});
```

---

## 3. KRDS 폼 컴포넌트

### 3.1 Select (선택 박스)

**파일 위치:** `자주묻는질문_FAQ.html:256-260`
**CSS 클래스:** `.krds-form-select`

#### HTML 구조
```html
<!-- 기본 크기 -->
<select id="select1" class="krds-form-select" title="선택">
    <option value="">전체</option>
    <option value="1">항목1</option>
    <option value="2">항목2</option>
</select>

<!-- 중간 크기 -->
<select class="krds-form-select medium" title="선택">
    <option value="">전체</option>
</select>

<!-- 작은 크기 -->
<select class="krds-form-select small" title="선택">
    <option value="">전체</option>
</select>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

**크기 옵션:**
- 기본: `.krds-form-select`
- 중간: `.krds-form-select medium`
- 작은: `.krds-form-select small`

---

### 3.2 Input (입력 필드)

**파일 위치:** `자주묻는질문_FAQ.html:265`
**CSS 클래스:** `.krds-input`

#### HTML 구조
```html
<!-- 텍스트 입력 -->
<input type="text" class="krds-input"
       placeholder="검색어를 입력해주세요"
       title="검색어 입력">

<!-- 비밀번호 입력 -->
<input type="password" class="krds-input"
       placeholder="비밀번호"
       title="비밀번호 입력">

<!-- 숫자 입력 -->
<input type="number" class="krds-input"
       placeholder="숫자를 입력하세요"
       title="숫자 입력">
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

---

### 3.3 Button (버튼)

**파일 위치:** `자주묻는질문_FAQ.html:266-269`
**CSS 클래스:** `.krds-btn`

#### HTML 구조
```html
<!-- 기본 버튼 -->
<button type="button" class="krds-btn">
    버튼 텍스트
</button>

<!-- 중간 크기 버튼 -->
<button type="button" class="krds-btn medium">
    버튼 텍스트
</button>

<!-- 아이콘 버튼 -->
<button type="button" class="krds-btn medium icon ico-search">
    <span class="sr-only">검색</span>
    <i class="svg-icon ico-sch"></i>
</button>

<!-- Primary 버튼 -->
<button type="button" class="krds-btn primary">
    확인
</button>

<!-- Secondary 버튼 -->
<button type="button" class="krds-btn secondary">
    취소
</button>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

**버튼 종류:**
- 기본: `.krds-btn`
- Primary: `.krds-btn primary`
- Secondary: `.krds-btn secondary`
- 아이콘: `.krds-btn icon`
- 비활성화: `.krds-btn disabled`

**크기 옵션:**
- 작은: `.krds-btn small`
- 중간: `.krds-btn medium`
- 큰: `.krds-btn large`

---

### 3.4 Checkbox (체크박스)

**CSS 클래스:** `.krds-form-check`

#### HTML 구조
```html
<div class="krds-form-check">
    <input type="checkbox" name="chk1" id="chk1">
    <label for="chk1">체크박스 레이블</label>
</div>

<!-- 비활성화 상태 -->
<div class="krds-form-check">
    <input type="checkbox" name="chk2" id="chk2" disabled>
    <label for="chk2">비활성화 체크박스</label>
</div>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

---

### 3.5 Radio (라디오 버튼)

**CSS 클래스:** `.krds-form-check`

#### HTML 구조
```html
<div class="krds-form-check">
    <input type="radio" name="radio1" id="radio1_1" checked>
    <label for="radio1_1">옵션 1</label>
</div>
<div class="krds-form-check">
    <input type="radio" name="radio1" id="radio1_2">
    <label for="radio1_2">옵션 2</label>
</div>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

---

## 4. 검색 컴포넌트

### 4.1 검색 필터 박스 (Search Filter Box)

**파일 위치:** `게시판_일반_목록.html`, `자주묻는질문_FAQ.html:251-275`
**CSS 클래스:** `.sch-filter-box`, `.filter-form`

#### HTML 구조
```html
<div class="search-top-box">
    <div class="sch-filter-box">
        <div class="filter-form row">
            <div class="search-area">
                <!-- 카테고리 선택 -->
                <select id="appl-sch-sel1" class="krds-form-select medium">
                    <option value="">전체</option>
                    <option value="1">항목1</option>
                </select>

                <!-- 검색 입력 -->
                <div class="sch-form-wrap">
                    <div class="sch-input">
                        <input type="text" class="krds-input"
                               placeholder="검색어를 입력해주세요"
                               title="검색어 입력">
                        <button type="button" class="krds-btn medium icon ico-search">
                            <span class="sr-only">검색</span>
                            <i class="svg-icon ico-sch"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

**CSS 파일:** `type/www/css/component/output.css:18360`

**특징:**
- 회색 배경 (`.sch-filter-box`)
- `.filter-form.row` - 가로 배치
- `.search-area` - 검색 영역 래퍼
- 반응형 지원

---

### 4.2 검색 결과 상단 정보 (Search List Top)

**파일 위치:** `자주묻는질문_FAQ.html:318-323`
**CSS 클래스:** `.search-list-top`, `.sch-info`, `.sch-sort`

#### HTML 구조
```html
<div class="search-list-top">
    <!-- 검색 결과 개수 -->
    <ul class="sch-info" aria-live="polite">
        <li>총 <span class="point">139</span>건
            (<span class="point">1</span>/<span class="total">1,000</span>페이지)
        </li>
    </ul>

    <!-- 정렬 옵션 -->
    <ul class="sch-sort">
        <li><button type="button" class="active">관련도순</button></li>
        <li><button type="button">최신순</button></li>
        <li><button type="button">오래된순</button></li>
    </ul>
</div>
```

**CSS 파일:** `type/www/css/component/output.css:18542`

**특징:**
- `.point` 클래스로 강조 텍스트 (숫자)
- `aria-live="polite"` - 검색 결과 변경 시 스크린리더 알림
- 정렬 버튼 `.active` 클래스로 선택 상태 표시

---

### 4.3 통합검색 메인 (Search Main)

**파일 위치:** `통합검색_cursor.html:558-632`
**CSS 클래스:** `.search-main-container`, `.search-input-section`

#### HTML 구조
```html
<div class="search-main-container">
    <!-- 검색 입력 섹션 -->
    <div class="search-input-section">
        <div class="search-input-area">
            <!-- 카테고리 선택 -->
            <select class="search-category-select" title="검색 카테고리">
                <option value="">전체</option>
                <option value="menu">메뉴</option>
                <option value="board">게시글</option>
            </select>

            <div class="search-divider"></div>

            <!-- 검색 입력 -->
            <div class="search-input-box">
                <input type="text" id="searchInput"
                       placeholder="검색어를 입력하세요">
            </div>

            <!-- 검색 버튼 -->
            <button class="search-btn" onclick="performSearch()">
                <i class="fas fa-search"></i>
            </button>
        </div>

        <!-- 최근 검색어 -->
        <div class="recent-search-section">
            <div class="section-label">최근 검색어</div>
            <div class="recent-tags">
                <span class="tag">
                    채무조정
                    <span class="remove-btn" onclick="removeTag(this)">×</span>
                </span>
            </div>
        </div>

        <!-- 인기 검색어 -->
        <div class="popular-search-section">
            <div class="popular-search-label">인기 검색어</div>
            <select class="popular-search-select">
                <option>1. 채무조정</option>
                <option>2. 소액대출</option>
            </select>
        </div>
    </div>
</div>
```

**CSS:** `통합검색_cursor.html:23-414` (인라인 스타일)

**특징:**
- 큰 검색 입력창
- 최근 검색어 태그
- 인기 검색어 드롭다운
- 검색 옵션 (정렬, 기간 필터)

---

## 5. 게시판 컴포넌트

### 5.1 아코디언 (Accordion) - FAQ용

**파일 위치:** `자주묻는질문_FAQ.html:326-416`
**CSS 클래스:** `.krds-accordion.type-line`, `.accordion-item`

#### HTML 구조
```html
<div class="krds-accordion type-line">
    <div class="accordion-item active">
        <h5 class="accordion-header">
            <button type="button"
                    id="accordionHeader01"
                    class="btn-accordion"
                    aria-controls="accordionCollapse01">
                <span class="catego">방문예약 문의</span>
                방문예약 가능할까요?
            </button>
        </h5>
        <div id="accordionCollapse01"
             class="accordion-collapse collapse"
             aria-labelledby="accordionHeader01">
            <div class="accordion-body">
                <!-- 아코디언 내용 -->
                <p>답변 내용이 여기에 들어갑니다.</p>
            </div>
        </div>
    </div>
</div>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

**특징:**
- `.type-line` - 라인 구분 스타일
- `.active` - 펼쳐진 상태
- `.catego` - 카테고리 뱃지
- ARIA 속성으로 접근성 지원

---

### 5.2 페이지네이션 (Pagination)

**파일 위치:** `자주묻는질문_FAQ.html:419-434`
**CSS 클래스:** `.krds-pagination`

#### HTML 구조
```html
<div class="krds-pagination">
    <!-- 이전 버튼 (비활성화) -->
    <span class="page-navi prev disabled">이전</span>

    <!-- 페이지 번호 -->
    <div class="page-links">
        <a class="page-link" href="#">1</a>
        <a class="page-link" href="#">2</a>
        <a class="page-link" href="#">3</a>
        <a class="page-link active" href="#">
            <span class="sr-only">현재페이지 </span>4
        </a>
        <a class="page-link" href="#">5</a>
        <span class="page-link link-dot"></span>
        <a class="page-link" href="#">99</a>
    </div>

    <!-- 다음 버튼 -->
    <a class="page-navi next" href="#">다음</a>
</div>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

**특징:**
- `.active` - 현재 페이지
- `.disabled` - 비활성화 상태
- `.link-dot` - 생략 표시 (...)
- `.sr-only` - 스크린리더 전용 텍스트

---

## 6. 콘텐츠 박스 컴포넌트

### 6.1 정보 박스 (Info Box)

**파일 위치:** `통합검색.html:274-309`
**CSS 클래스:** `.g-info-box`, `.g-desc-box`

#### HTML 구조
```html
<div class="g-grid-wrap contect">
    <!-- 기본 정보 박스 -->
    <div class="g-info-box">
        <div class="g-desc-box">
            <div class="g-text-wrap">
                <p class="g-tit">전화예약</p>
                <span class="g-subtit">오전 9시 ~ 오후 6시</span>
            </div>
            <div class="conts-desc largetext primary">
                1600-5500
            </div>
        </div>
        <div class="g-img">
            <img src="/type/www/img/contents/png/icon_booking.png" alt="">
        </div>
    </div>

    <!-- 컬러 정보 박스 -->
    <div class="g-info-box lightblue">
        <div class="g-desc-box">
            <p class="g-tit">인터넷 상담예약</p>
            <a class="conts-desc" href="#" target="_blank">
                바로가기
                <img src="/type/www/img/icons/arrow-right.svg" alt="">
            </a>
        </div>
        <div class="g-img">
            <img src="/type/www/img/contents/png/icon_online_booking.png" alt="">
        </div>
    </div>

    <!-- 보라색 정보 박스 -->
    <div class="g-info-box lightpurple">
        <!-- 내용 동일 -->
    </div>
</div>
```

**CSS 파일:** `type/www/css/styles.css`

**컬러 옵션:**
- 기본: `.g-info-box`
- 하늘색: `.g-info-box lightblue`
- 보라색: `.g-info-box lightpurple`
- 주황색: `.g-info-box lightorange`

**텍스트 크기:**
- 기본: `.conts-desc`
- 큰 텍스트: `.conts-desc largetext`
- Primary 색상: `.conts-desc primary`

---

### 6.2 그리드 래퍼 (Grid Wrapper)

**파일 위치:** `통합검색.html:273`
**CSS 클래스:** `.g-grid-wrap`

#### HTML 구조
```html
<!-- 3열 그리드 -->
<div class="g-grid-wrap contect">
    <div class="g-info-box"><!-- 박스 1 --></div>
    <div class="g-info-box"><!-- 박스 2 --></div>
    <div class="g-info-box"><!-- 박스 3 --></div>
</div>

<!-- 2열 그리드 -->
<div class="g-grid-wrap col-2">
    <div class="g-info-box"><!-- 박스 1 --></div>
    <div class="g-info-box"><!-- 박스 2 --></div>
</div>

<!-- 4열 그리드 -->
<div class="g-grid-wrap col-4">
    <div class="g-info-box"><!-- 박스 1 --></div>
    <div class="g-info-box"><!-- 박스 2 --></div>
    <div class="g-info-box"><!-- 박스 3 --></div>
    <div class="g-info-box"><!-- 박스 4 --></div>
</div>
```

**CSS 파일:** `type/www/css/styles.css`

**특징:**
- 반응형 그리드 레이아웃
- 모바일에서 1열로 자동 전환
- `gap` 속성으로 간격 조절

---

## 7. 버튼 컴포넌트

### 7.1 정렬 버튼 (Sort Button)

**파일 위치:** `통합검색_cursor.html:617-620`
**CSS 클래스:** `.sort-btn`

#### HTML 구조
```html
<div class="sort-buttons">
    <button class="sort-btn active" data-sort="latest">최신순</button>
    <button class="sort-btn" data-sort="accuracy">정확도순</button>
    <button class="sort-btn" data-sort="popular">인기순</button>
</div>
```

**CSS:** 인라인 스타일 (`통합검색_cursor.html:316-339`)

**JavaScript 처리:**
```javascript
$('.sort-btn').on('click', function() {
    $('.sort-btn').removeClass('active');
    $(this).addClass('active');
});
```

---

### 7.2 기간 필터 버튼 (Period Button)

**파일 위치:** `통합검색_cursor.html:625-628`
**CSS 클래스:** `.period-btn`

#### HTML 구조
```html
<div class="period-filter">
    <div class="sort-label">검색기간</div>
    <div class="sort-buttons">
        <button class="period-btn active" data-period="1day">1일</button>
        <button class="period-btn" data-period="1week">1주일</button>
        <button class="period-btn" data-period="1month">1개월</button>
        <button class="period-btn" data-period="3month">3개월</button>
        <button class="period-btn" data-period="1year">1년</button>
    </div>
</div>
```

**CSS:** 인라인 스타일 (`통합검색_cursor.html:347-370`)

---

## 8. 테이블 컴포넌트

### 8.1 KRDS 테이블

**CSS 클래스:** `.krds-table-wrap`, `.krds-table`

#### HTML 구조
```html
<div class="krds-table-wrap">
    <table class="krds-table">
        <caption>테이블 제목</caption>
        <colgroup>
            <col style="width: 10%;">
            <col style="width: 20%;">
            <col style="width: 50%;">
            <col style="width: 20%;">
        </colgroup>
        <thead>
            <tr>
                <th scope="col">번호</th>
                <th scope="col">카테고리</th>
                <th scope="col">제목</th>
                <th scope="col">날짜</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>공지사항</td>
                <td class="text-left">
                    <a href="#">제목이 들어갑니다</a>
                </td>
                <td>2025.01.15</td>
            </tr>
        </tbody>
    </table>
</div>
```

**CSS 파일:** `type/www/css/component/output.css` (KRDS)

**테이블 스타일:**
- 기본: `.krds-table`
- 줄무늬: `.krds-table striped`
- 테두리: `.krds-table bordered`
- 호버: `.krds-table hover`

**정렬 클래스:**
- 왼쪽 정렬: `.text-left`
- 가운데 정렬: `.text-center`
- 오른쪽 정렬: `.text-right`

---

## 9. 첨부파일 컴포넌트

### 9.1 첨부파일 리스트

**파일 위치:** `자주묻는질문_FAQ.html:335-343`
**CSS 클래스:** `.g-attach-file-wrap`, `.file-list`

#### HTML 구조
```html
<div class="g-attach-file-wrap">
    <div class="conts-area">
        <ul class="file-list">
            <li>
                <a href="#" class="attached-file" download>
                    디지털 정부서비스 UIUX 가이드라인(24년 2월).pdf
                    [PDF, 28.54 MB]
                </a>
            </li>
            <li>
                <a href="#" class="attached-file" download>
                    첨부파일명.docx
                    [DOCX, 1.2 MB]
                </a>
            </li>
        </ul>
    </div>
</div>
```

**CSS 파일:** `type/www/css/styles.css`

**특징:**
- `.attached-file` - 파일 다운로드 링크
- `download` 속성 - 파일 다운로드
- 파일 형식과 크기 표시

---

### 9.2 파일 업로드

**CSS 클래스:** `.file-upload-wrap`

#### HTML 구조
```html
<div class="file-upload-wrap">
    <label for="fileUpload" class="file-upload-label">
        <i class="fas fa-upload"></i>
        파일 선택
    </label>
    <input type="file" id="fileUpload" class="file-upload-input">
    <span class="file-name">선택된 파일 없음</span>
</div>
```

**JavaScript 처리:**
```javascript
$('.file-upload-input').on('change', function() {
    const fileName = $(this).val().split('\\').pop();
    $('.file-name').text(fileName || '선택된 파일 없음');
});
```

---

## 10. 피드백 컴포넌트

### 10.1 만족도 조사 (Feedback Section)

**파일 위치:** `자주묻는질문_FAQ.html:441-477`
**CSS 클래스:** `.feedback-section`, `.feedback-card`

#### HTML 구조
```html
<div class="feedback-section noprint">
    <div class="feedback-card">
        <h3>이 페이지에서 제공하는 정보에 대하여 어느 정도 만족하셨습니까?</h3>

        <!-- 만족도 선택 -->
        <div class="rating-options">
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="5">
                <span class="radio-custom"></span>
                매우 만족
            </label>
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="4">
                <span class="radio-custom"></span>
                만족
            </label>
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="3">
                <span class="radio-custom"></span>
                보통
            </label>
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="2">
                <span class="radio-custom"></span>
                불만족
            </label>
            <label class="rating-option">
                <input type="radio" name="satisfaction" value="1">
                <span class="radio-custom"></span>
                매우 불만족
            </label>
        </div>

        <!-- 의견 입력 -->
        <div class="feedback-input">
            <label class="hide" for="feedback-text">의견 입력</label>
            <textarea id="feedback-text"
                      placeholder="내용을 입력하세요"
                      rows="1"></textarea>
            <button type="button" class="submit-btn">제출</button>
        </div>
    </div>
</div>
```

**CSS 파일:** `type/www/css/layout.css`

**특징:**
- `.noprint` - 인쇄 시 숨김
- 커스텀 라디오 버튼 스타일
- 자동 확장 textarea

---

## 11. 퀵메뉴 컴포넌트

### 11.1 퀵메뉴 (Quick Menu)

**파일 위치:** `통합검색.html:356-394`
**CSS 클래스:** `.quick-menu`, `.quick-item`

#### HTML 구조
```html
<div class="quick-menu">
    <!-- 기본 퀵메뉴 아이템 -->
    <a class="quick-item" href="#" target="_blank">
        <img src="/type/www/images/ic/quickmenu/icon_mydata.png" alt="">
        <span>나의<br>진행상황</span>
    </a>

    <!-- 펼침 메뉴가 있는 퀵메뉴 -->
    <div class="quick-item book">
        <span>상담<br>예약신청</span>
        <div class="quick-showbox">
            <a href="#" class="showbox-item showbox-arrow">
                <img src="/type/www/images/ic/quickmenu/icon_book_show1.svg" alt="">
                <p class="link-title">방문상담 예약</p>
            </a>
            <a href="#" class="showbox-item showbox-arrow">
                <img src="/type/www/images/ic/quickmenu/icon_book_show2.svg" alt="">
                <p class="link-title">인터넷상담 예약</p>
            </a>
            <a href="tel:16005500" class="showbox-item">
                <img src="/type/www/images/ic/quickmenu/icon_book_show3.svg" alt="">
                <p class="link-title">
                    전화상담 예약<span>1600-5500</span>
                </p>
            </a>
        </div>
    </div>
</div>

<!-- 챗봇 버튼 (별도) -->
<a href="#" class="quick-chat">
    <img src="/type/www/img/icons/quickmenu/icon_bot.svg" alt="">
    <span>챗봇</span>
</a>
```

**CSS 파일:** `type/www/css/layout.css`

**특징:**
- 화면 우측 하단 고정 위치
- 호버 시 하위 메뉴 표시
- 스크롤 시 자동 숨김/표시

---

## 사용 가이드

### 영문 사이트에 컴포넌트 적용하기

1. **HTML 복사**
   - 위 예시 코드를 복사하여 영문 페이지에 붙여넣기
   - 한글 텍스트만 영문으로 번역

2. **CSS 파일 확인**
   - 모든 CSS는 이미 `type/www/css/` 폴더에 존재
   - 추가 CSS 작성 불필요 (스타일은 국문과 동일)

3. **클래스명 유지**
   - 모든 클래스명은 변경하지 말 것
   - KRDS 컴포넌트는 특히 클래스명이 중요

4. **접근성 속성 유지**
   - `aria-*`, `role`, `title` 속성 유지
   - `.sr-only` 텍스트는 영문으로 번역

### 예시: 영문 FAQ 페이지 만들기

```html
<!-- 국문 코드 -->
<h1>FAQ</h1>
<div class="section-label">최근 검색어</div>

<!-- 영문 코드 (텍스트만 변경) -->
<h1>FAQ</h1>
<div class="section-label">Recent Searches</div>
```

---

## 자주 사용하는 CSS 변수

### KRDS 컬러 변수
```css
--krds-light-color-text-primary: #17191b;
--krds-light-color-text-secondary: #666;
--krds-light-color-button-primary-fill: #F48F01;
--krds-light-color-surface-gray-subtler: #f4f5f6;
--krds-light-color-divider-gray: #e8e9ea;
```

### KRDS 폰트 크기 변수
```css
--krds-pc-font-size-heading-h1: 48px;
--krds-pc-font-size-heading-h2: 36px;
--krds-pc-font-size-heading-h3: 28px;
--krds-pc-font-size-body-large: 18px;
--krds-pc-font-size-body-medium: 16px;
--krds-pc-font-size-body-small: 14px;
```

### KRDS 간격 변수
```css
--krds-gap-4: 4px;
--krds-gap-8: 8px;
--krds-gap-12: 12px;
--krds-gap-16: 16px;
--krds-gap-24: 24px;
```

---

## 참고 파일

- **코딩 가이드:** `docs/CODING_GUIDE.md`
- **통합검색 계획:** `docs/INTEGRATED_SEARCH_PLAN.md`
- **KRDS 공식 문서:** https://www.krds.go.kr/

