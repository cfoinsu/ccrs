# 통합검색 구현 계획서

## 1. 개요

통합검색 페이지는 3가지 상태로 구성됩니다:
1. **일반 검색 결과 페이지** - 검색어 입력 후 일반적인 결과 표시
2. **웹페이지 탭 결과** - "웹페이지" 탭 선택 시 다른 디자인 적용
3. **검색 결과 없음** - 검색 결과가 없을 때 표시

## 2. 기존 재사용 가능한 컴포넌트

### 2.1 검색 입력 폼 (Search Filter Box)

**파일 위치:** `게시판_일반_목록.html`, `자주묻는질문_FAQ.html`
**CSS 클래스:** `.sch-filter-box`, `.filter-form`, `.sch-input`
**CSS 파일:** `type/www/css/component/output.css:18360`

#### 기존 HTML 구조
```html
<div class="sch-filter-box">
    <div class="filter-form row">
        <div class="search-area">
            <select id="appl-sch-sel1" class="krds-form-select medium">
                <option value="">전체</option>
            </select>
            <div class="sch-input">
                <input type="text" class="krds-input" placeholder="검색어를 입력해주세요">
                <button type="button" class="krds-btn medium icon ico-search">
                    <i class="svg-icon ico-sch"></i>
                </button>
            </div>
        </div>
    </div>
</div>
```

**재사용 여부:** ✅ **그대로 사용 가능**

---

### 2.2 탭 네비게이션 (Tab Navigation)

**파일 위치:** `자주묻는질문_FAQ.html`
**CSS 클래스:** `.tab.fill.middle.wrap`, `.btn-tab`
**CSS 파일:** `type/www/css/component/output.css`

#### 기존 HTML 구조
```html
<div class="tab fill middle wrap">
    <ul role="tablist">
        <li id="stab01" role="tab" class="active">
            <button type="button" class="btn-tab">전체<i class="sr-only">선택됨</i></button>
        </li>
        <li id="stab02" role="tab">
            <button type="button" class="btn-tab">채무조정</button>
        </li>
    </ul>
</div>
```

**재사용 여부:** ✅ **그대로 사용 가능**
**통합검색 탭 구성:**
- 전체
- 메뉴
- 게시글
- 사전영상
- 웹페이지

---

### 2.3 검색 결과 상단 정보 (Search List Top)

**파일 위치:** `게시판_일반_목록.html`, `자주묻는질문_FAQ.html`
**CSS 클래스:** `.search-list-top`, `.sch-info`, `.sch-sort`
**CSS 파일:** `type/www/css/component/output.css:18542`

#### 기존 HTML 구조
```html
<div class="search-list-top">
    <ul class="sch-info">
        <li>검색 결과 <span class="point">24</span>건</li>
    </ul>
    <ul class="sch-sort">
        <li><button type="button" class="active">관련도순</button></li>
    </ul>
</div>
```

**재사용 여부:** ✅ **그대로 사용 가능**

---

### 2.4 페이지네이션 (Pagination)

**파일 위치:** `자주묻는질문_FAQ.html`
**CSS 클래스:** `.krds-pagination`
**CSS 파일:** KRDS 컴포넌트

#### 기존 HTML 구조
```html
<div class="krds-pagination">
    <span class="page-navi prev disabled">이전</span>
    <div class="page-links">
        <a class="page-link active" href="#"><span class="sr-only">현재페이지 </span>4</a>
        <a class="page-link" href="#">5</a>
    </div>
    <a class="page-navi next" href="#">다음</a>
</div>
```

**재사용 여부:** ✅ **그대로 사용 가능**

---

### 2.5 아코디언 (FAQ용, 일반 결과에는 불필요)

**파일 위치:** `자주묻는질문_FAQ.html`
**CSS 클래스:** `.krds-accordion.type-line`

**재사용 여부:** ❌ **통합검색에서는 사용하지 않음**

---

## 3. 새로 제작해야 하는 컴포넌트

### 3.1 검색 결과 없음 메시지 (No Results)

**위치:** 검색 결과가 0건일 때 표시
**CSS 클래스:** `.no-result` (신규 생성 필요)

#### 제안 HTML 구조
```html
<div class="no-result">
    <div class="no-result-icon">
        <i class="svg-icon ico-search-empty"></i>
    </div>
    <h3 class="no-result-title">검색결과가 없습니다</h3>
    <p class="no-result-desc">
        검색어를 다시 확인해주시거나<br>
        다른 검색어로 검색해 보세요.
    </p>
</div>
```

**CSS 정의 필요:**
```css
.no-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    text-align: center;
}

.no-result-icon {
    margin-bottom: 24px;
    opacity: 0.4;
}

.no-result-title {
    font-size: var(--krds-pc-font-size-heading-h3);
    font-weight: var(--krds-font-weight-bold);
    margin-bottom: 16px;
}

.no-result-desc {
    font-size: var(--krds-pc-font-size-body-medium);
    color: var(--krds-light-color-text-secondary);
    line-height: 1.6;
}
```

---

### 3.2 웹페이지 탭 전용 결과 리스트 (Web Page Results)

**위치:** "웹페이지" 탭 선택 시에만 표시
**CSS 클래스:** `.search-result-web` (신규 생성 필요)

#### 제안 HTML 구조 (스크린샷 기반)
```html
<div class="search-result-list search-result-web">
    <div class="search-result-item">
        <h4 class="result-title">
            <a href="#">검색 결과 타이틀</a>
        </h4>
        <p class="result-desc">
            검색어와 관련된 내용이 여기에 표시됩니다...
        </p>
        <div class="result-meta">
            <span class="result-url">https://www.ccrs.or.kr/...</span>
        </div>
    </div>
</div>
```

**CSS 정의 필요:**
```css
.search-result-web .search-result-item {
    padding: 24px 0;
    border-bottom: 1px solid var(--krds-light-color-divider-gray);
}

.search-result-web .result-title {
    font-size: var(--krds-pc-font-size-heading-h4);
    font-weight: var(--krds-font-weight-bold);
    margin-bottom: 8px;
}

.search-result-web .result-title a {
    color: var(--krds-light-color-text-link);
    text-decoration: none;
}

.search-result-web .result-title a:hover {
    text-decoration: underline;
}

.search-result-web .result-desc {
    font-size: var(--krds-pc-font-size-body-medium);
    color: var(--krds-light-color-text-secondary);
    margin-bottom: 8px;
    line-height: 1.6;
}

.search-result-web .result-meta {
    display: flex;
    gap: 12px;
    font-size: var(--krds-pc-font-size-body-small);
    color: var(--krds-light-color-text-tertiary);
}

.search-result-web .result-url {
    color: var(--krds-light-color-text-success);
}
```

---

### 3.3 일반 검색 결과 리스트 (General Results)

**위치:** 전체, 메뉴, 게시글, 사전영상 탭에서 사용
**CSS 클래스:** `.search-result-list` (신규 생성 필요)

#### 제안 HTML 구조
```html
<div class="search-result-list">
    <div class="search-result-item">
        <div class="result-badge">게시글</div>
        <h4 class="result-title">
            <a href="#">검색 결과 타이틀</a>
        </h4>
        <p class="result-desc">
            검색어와 관련된 내용이 여기에 표시됩니다...
        </p>
        <div class="result-meta">
            <span class="result-date">2025.01.15</span>
            <span class="result-category">공지사항</span>
        </div>
    </div>
</div>
```

**CSS 정의 필요:**
```css
.search-result-list .search-result-item {
    padding: 20px;
    border-radius: var(--krds-radius-medium);
    border: 1px solid var(--krds-light-color-divider-gray);
    margin-bottom: 16px;
    transition: all 0.2s ease;
}

.search-result-list .search-result-item:hover {
    border-color: var(--krds-light-color-button-primary-fill);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-result-list .result-badge {
    display: inline-block;
    padding: 4px 12px;
    background: var(--krds-light-color-surface-primary-subtle);
    color: var(--krds-light-color-text-primary);
    border-radius: var(--krds-radius-small);
    font-size: var(--krds-pc-font-size-body-small);
    margin-bottom: 12px;
}

.search-result-list .result-title {
    font-size: var(--krds-pc-font-size-body-large);
    font-weight: var(--krds-font-weight-bold);
    margin-bottom: 8px;
}

.search-result-list .result-title a {
    color: var(--krds-light-color-text-primary);
    text-decoration: none;
}

.search-result-list .result-title a:hover {
    color: var(--krds-light-color-text-link);
}

.search-result-list .result-desc {
    font-size: var(--krds-pc-font-size-body-medium);
    color: var(--krds-light-color-text-secondary);
    margin-bottom: 12px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.search-result-list .result-meta {
    display: flex;
    gap: 12px;
    font-size: var(--krds-pc-font-size-body-small);
    color: var(--krds-light-color-text-tertiary);
}
```

---

## 4. 페이지별 구성 상세

### 4.1 일반 검색 결과 페이지

**파일명:** `통합검색.html` (현재 파일 수정)

#### 수정 필요 사항:
1. **Title 변경:** `상환도우미 소개` → `통합검색`
2. **Sidebar 변경:** 상환도우미 → 통합검색 전용 사이드바 (또는 사이드바 제거)
3. **Breadcrumb 변경:** `상환도우미 > 상환도우미 소개` → `홈 > 통합검색`
4. **Page Header 변경:** `상환도우미 소개` → `통합검색`
5. **Content 영역 교체:**
   - 현재: "페이지 준비중" 메시지
   - 변경: 검색 폼 + 탭 + 결과 리스트

#### 페이지 구조:
```
1. 검색 입력 폼 (.sch-filter-box)
2. 탭 네비게이션 (.tab.fill.middle.wrap)
   - 전체 (active)
   - 메뉴
   - 게시글
   - 사전영상
   - 웹페이지
3. 검색 결과 상단 (.search-list-top)
   - 검색 결과 X건
   - 정렬 옵션 (관련도순)
4. 일반 결과 리스트 (.search-result-list)
   - 검색 결과 아이템들
5. 페이지네이션 (.krds-pagination)
```

---

### 4.2 웹페이지 탭 결과 페이지

**파일명:** `통합검색.html` (동일 파일, JavaScript로 탭 전환)

#### JavaScript 처리:
- "웹페이지" 탭 클릭 시 `.search-result-list`를 `.search-result-web`로 교체
- 다른 탭 클릭 시 다시 `.search-result-list`로 복원

#### 페이지 구조:
```
1. 검색 입력 폼 (.sch-filter-box)
2. 탭 네비게이션 (.tab.fill.middle.wrap)
   - 웹페이지 (active) ← 이 탭만 다른 디자인
3. 검색 결과 상단 (.search-list-top)
   - 웹페이지 X건
4. 웹페이지 결과 리스트 (.search-result-web)
   - 웹페이지 검색 결과 아이템들
5. 페이지네이션 (.krds-pagination)
```

---

### 4.3 검색 결과 없음 페이지

**파일명:** `통합검색.html` (동일 파일, 결과 0건일 때)

#### 조건:
- 검색어 입력 후 결과가 0건일 때
- 모든 탭에서 동일한 "검색결과가 없습니다" 메시지 표시

#### 페이지 구조:
```
1. 검색 입력 폼 (.sch-filter-box)
2. 탭 네비게이션 (.tab.fill.middle.wrap)
3. 검색 결과 없음 (.no-result)
   - 아이콘
   - "검색결과가 없습니다" 메시지
   - 안내 문구
```

---

## 5. 파일 구조

### 5.1 HTML 파일
- `html/통합검색.html` - 통합검색 메인 페이지 (1개 파일로 3가지 상태 처리)

### 5.2 CSS 파일
- `type/www/css/component/output.css` - 기존 컴포넌트 스타일 (재사용)
- `type/www/css/styles.css` - 신규 스타일 추가 위치
  - `.no-result` 관련 스타일
  - `.search-result-list` 관련 스타일
  - `.search-result-web` 관련 스타일

### 5.3 JavaScript 파일
- `type/www/js/script.js` 또는 `type/www/js/component/ui-script.js`에 탭 전환 로직 추가

---

## 6. JavaScript 로직

### 6.1 탭 전환
```javascript
$(function() {
    // 탭 버튼 클릭 이벤트
    $('.tab.fill.middle.wrap .btn-tab').on('click', function() {
        const $parent = $(this).parent();
        const tabId = $parent.attr('id');

        // 모든 탭 비활성화
        $('.tab.fill.middle.wrap li').removeClass('active');

        // 클릭한 탭 활성화
        $parent.addClass('active');

        // 탭에 따라 결과 영역 변경
        if (tabId === 'tab-webpage') {
            // 웹페이지 탭: 웹페이지 전용 디자인으로 변경
            $('.search-result-list').addClass('search-result-web');
        } else {
            // 다른 탭: 일반 디자인으로 복원
            $('.search-result-list').removeClass('search-result-web');
        }
    });
});
```

### 6.2 검색 결과 없음 처리
```javascript
// 검색 결과 개수에 따라 UI 전환
function updateSearchResults(resultCount) {
    if (resultCount === 0) {
        $('.search-result-list').hide();
        $('.search-list-top').hide();
        $('.krds-pagination').hide();
        $('.no-result').show();
    } else {
        $('.search-result-list').show();
        $('.search-list-top').show();
        $('.krds-pagination').show();
        $('.no-result').hide();
    }
}
```

---

## 7. 작업 순서

1. ✅ **기존 컴포넌트 분석 완료** (현재 단계)
2. ⏳ `통합검색.html` 기본 구조 작성
   - Title, Breadcrumb, Sidebar 수정
   - 검색 입력 폼 추가
   - 탭 네비게이션 추가
3. ⏳ CSS 스타일 작성 (`styles.css`)
   - `.no-result` 스타일
   - `.search-result-list` 스타일
   - `.search-result-web` 스타일
4. ⏳ JavaScript 탭 전환 로직 작성
5. ⏳ 각 상태별 테스트
   - 일반 검색 결과
   - 웹페이지 탭 결과
   - 검색 결과 없음

---

## 8. 참고 사항

### 8.1 사이드바 처리
현재 `통합검색.html`은 "상환도우미" 사이드바를 사용하고 있습니다.

**옵션 1:** 통합검색 전용 사이드바 제거 (권장)
- 통합검색은 일반적으로 전체 사이트 검색이므로 특정 섹션 사이드바가 불필요
- `.content-layout`에서 `.sidebar` 제거
- `.content-area`를 전체 너비로 확장

**옵션 2:** 검색 필터용 사이드바 추가
- 검색 옵션 (기간, 카테고리 등)을 사이드바로 구성
- 사용자 요구사항에 따라 결정

### 8.2 Accessibility (접근성)
- 탭에 `role="tab"`, `aria-selected` 속성 유지
- 검색 입력창에 `aria-label` 추가
- 검색 결과 개수 변경 시 `aria-live="polite"` 적용
- 키보드 네비게이션 지원 (Tab, Enter, Arrow keys)

### 8.3 KRDS 준수
- 모든 컴포넌트는 KRDS 디자인 시스템 따름
- KRDS 컴포넌트 활용: `krds-form-select`, `krds-input`, `krds-btn`, `krds-pagination`
- KRDS CSS 변수 활용: `--krds-*` 형식의 변수 사용

---

## 9. 다음 단계

1. 사용자에게 사이드바 처리 방식 확인
2. 웹페이지 탭의 구체적인 디자인 차이점 확인 (스크린샷 기반 상세 분석)
3. `통합검색.html` 작업 시작

