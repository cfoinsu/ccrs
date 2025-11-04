# 국문 사이트 마이그레이션 가이드

## 📋 목차
1. [시작하기 전에](#시작하기-전에)
2. [준비 작업](#준비-작업)
3. [단계별 마이그레이션](#단계별-마이그레이션)
4. [테스트 체크리스트](#테스트-체크리스트)
5. [롤백 계획](#롤백-계획)

---

## 시작하기 전에

### 사전 요구사항

- ✅ Git 브랜치 생성 (작업용)
- ✅ 백업 완료
- ✅ 영문 사이트 구조 이해 (ARCHITECTURE.md 참고)
- ✅ 테스트 환경 준비

### 예상 작업 시간

| 단계 | 예상 시간 |
|------|-----------|
| 1. includes 폴더 생성 및 컴포넌트 분리 | 2-3시간 |
| 2. CSS 번들 생성 | 30분 |
| 3. JS 정리 | 1시간 |
| 4. HTML 페이지 변경 (50개) | 3-4시간 |
| 5. 테스트 및 디버깅 | 2-3시간 |
| **총 예상 시간** | **8-11시간** |

---

## 준비 작업

### 1. Git 브랜치 생성

```bash
# 새 브랜치 생성
git checkout -b refactor/korean-site-components

# 현재 상태 확인
git status
```

### 2. 백업

```bash
# html 폴더 백업
cp -r html html_backup_$(date +%Y%m%d)

# CSS 폴더 백업
cp -r type/www/css type/www/css_backup_$(date +%Y%m%d)

# JS 폴더 백업
cp -r type/www/js type/www/js_backup_$(date +%Y%m%d)
```

### 3. 기존 페이지 분석

```bash
# 국문 페이지 개수 확인
ls -1 html/*.html | wc -l

# 각 페이지의 스크립트 태그 개수 확인
grep -c "script src" html/*.html

# CSS 링크 개수 확인
grep -c "link rel=\"stylesheet\"" html/*.html
```

---

## 단계별 마이그레이션

### Step 1: includes 폴더 생성

#### 1-1. 디렉토리 구조 생성

```bash
# includes 폴더 생성
mkdir -p html/includes

# 생성 확인
ls -la html/includes/
```

#### 1-2. Header 컴포넌트 추출

**작업 파일**: `html/includes/header.html`

1. 기존 페이지에서 `<header id="header">` 전체 복사
2. `html/includes/header.html` 생성
3. 복사한 헤더 코드 붙여넣기

**예시**:
```html
<!-- html/includes/header.html -->
<header id="header">
    <div class="header-wrap">
        <h1 class="logo">
            <a href="/html/main.html">
                <img src="/type/www/images/common/logo.png" alt="신용회복위원회">
            </a>
        </h1>
        <nav class="gnb-wrap">
            <ul class="gnb">
                <li>
                    <a href="#" class="depth1">신용회복위원회 소개</a>
                    <ul class="depth2">
                        <!-- 서브메뉴 -->
                    </ul>
                </li>
                <!-- 나머지 메뉴 -->
            </ul>
        </nav>
        <!-- 검색, 언어 선택 등 -->
    </div>
</header>
```

#### 1-3. Footer 컴포넌트 추출

**작업 파일**: `html/includes/footer.html`

1. 기존 페이지에서 `<footer>` 전체 복사
2. `html/includes/footer.html` 생성
3. 복사한 푸터 코드 붙여넣기

**예시**:
```html
<!-- html/includes/footer.html -->
<footer id="footer">
    <div class="footer-wrap">
        <div class="footer-info">
            <!-- 회사 정보 -->
        </div>
        <div class="footer-bottom">
            <p class="copyright">
                © 2024 Credit Counseling and Recovery Service. All rights reserved.
            </p>
        </div>
    </div>
</footer>
```

#### 1-4. AllMenu 컴포넌트 추출

**작업 파일**: `html/includes/allmenu.html`

1. 기존 페이지에서 전체메뉴 `<div>` 찾기
2. `html/includes/allmenu.html` 생성
3. 복사한 코드 붙여넣기

**예시**:
```html
<!-- html/includes/allmenu.html -->
<div class="all-menu" id="allMenuTag">
    <div class="all-menu-inner">
        <button class="btn-close">닫기</button>
        <nav class="all-menu-nav">
            <ul class="menu-depth1">
                <li>
                    <a href="#" class="depth1">신용회복위원회 소개</a>
                    <ul class="depth2">
                        <!-- 전체 메뉴 구조 -->
                    </ul>
                </li>
                <!-- 나머지 메뉴 -->
            </ul>
        </nav>
    </div>
</div>
```

#### 1-5. Search 컴포넌트 추출

**작업 파일**: `html/includes/search.html`

1. 기존 페이지에서 검색 `<div>` 찾기
2. `html/includes/search.html` 생성
3. 복사한 코드 붙여넣기

**예시**:
```html
<!-- html/includes/search.html -->
<div class="search-menu" id="searchTag">
    <h5>통합검색</h5>
    <div class="search-area-header">
        <label for="searchText" class="hide">검색</label>
        <input type="text" name="commonSearchText" id="searchText"
               placeholder="검색어를 입력하세요">
        <a class="btn-search-header" onclick="javascript:fn_commonSearch(1);"></a>
    </div>
    <div class="result-title">
        <h5>검색결과</h5>
        <span id="common_total_cnt" class="sp">0</span>
        <h5> 건</h5>
    </div>
    <a href="#" class="btn-close">
        <img src="/type/www/img/icons/ico_close.svg" alt="검색메뉴 닫기">
    </a>
    <div class="result-area">
        <!-- 검색 결과 영역 -->
    </div>
</div>
```

---

### Step 2: CSS 번들 생성

#### 2-1. bundle.css 파일 생성

**작업 파일**: `type/www/css/bundle.css`

```css
/* bundle.css - 국문용 통합 CSS */
@import './common.css';
@import './main.css';
@import './all.min.css';
@import './plugins/swiper.min.css';
@import './layout.css';
@import './component/output.css';
@import './styles.css';
```

#### 2-2. SCSS 소스 생성 (선택사항)

**작업 파일**: `type/www/scss/bundle.scss`

```scss
// bundle.scss - 국문용 통합 SCSS
@import '../css/common.css';
@import '../css/main.css';
@import '../css/all.min.css';
@import '../css/plugins/swiper.min.css';
@import '../css/layout.css';
@import '../css/component/output.css';
@import '../css/styles.css';
```

#### 2-3. 컴파일 (SCSS 사용 시)

```bash
# SCSS → CSS 컴파일
npx sass type/www/scss/bundle.scss type/www/css/bundle.css
```

---

### Step 3: JavaScript 정리

#### 3-1. init.js 생성

**작업 파일**: `html/includes/init.js`

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
        $.getScript('/type/www/js/common_kr.js?ver=1.9');
    });

    // Footer 로드
    $('#footer-container').load('includes/footer.html');

    // AllMenu 로드
    $('#allmenu-container').load('includes/allmenu.html');

    // Search 로드
    $('#search-container').load('includes/search.html');
});
```

#### 3-2. common_kr.js 생성

**작업 파일**: `type/www/js/common_kr.js`

```javascript
/**
 * Common JavaScript functions for Korean pages
 * 국문 페이지 공통 기능
 */

$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();
});

/**
 * Initialize support content toggle functionality
 * 지원내용 토글 버튼 초기화
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
            $toggleText.text('지원내용 닫기');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show(); // display:block
        } else {
            $toggleText.text('지원내용 보기');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide(); // display:none
        }
    });
}
```

#### 3-3. scripts.html 생성 (JSP 마이그레이션용 참고)

**작업 파일**: `html/includes/scripts.html`

```html
<!-- Common Scripts for Korean Pages -->
<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
<script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
<script src="includes/init.js"></script>
```

---

### Step 4: HTML 페이지 변경

#### 4-1. Python 스크립트로 일괄 변경

**작업 파일**: `html/migrate_pages.py`

```python
import re
import glob

def migrate_html_page(file_path):
    """
    HTML 페이지를 컴포넌트 기반 구조로 변경
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. CSS 번들로 교체
    # 기존: 여러 개의 link 태그
    # 변경: 단일 bundle.css
    css_pattern = r'<link rel="stylesheet" href="/type/www/css/styles\.css\?ver=1\.9">.*?<link rel="stylesheet" href="/type/www/css/plugins/swiper\.min\.css\?ver=1\.9">'
    css_replacement = '<link rel="stylesheet" href="/type/www/css/bundle.css">'
    content = re.sub(css_pattern, css_replacement, content, flags=re.DOTALL)

    # 2. Header 교체
    # 기존: <header id="header">...</header>
    # 변경: <div id="header-container"></div>
    header_pattern = r'<header id="header">.*?</header>'
    header_replacement = '<div id="header-container"></div>'
    content = re.sub(header_pattern, header_replacement, content, flags=re.DOTALL)

    # 3. Footer 교체
    footer_pattern = r'<footer.*?>.*?</footer>'
    footer_replacement = '<div id="footer-container"></div>'
    content = re.sub(footer_pattern, footer_replacement, content, flags=re.DOTALL)

    # 4. AllMenu 교체
    allmenu_pattern = r'<div class="all-menu".*?>.*?</div>\s*<!-- //all-menu'
    allmenu_replacement = '<div id="allmenu-container"></div>\n    <!-- //all-menu'
    content = re.sub(allmenu_pattern, allmenu_replacement, content, flags=re.DOTALL)

    # 5. Search 교체
    search_pattern = r'<div class="search-menu".*?>.*?</div>\s*<!-- 검색영역'
    search_replacement = '<div id="search-container"></div>\n    <!-- 검색영역'
    content = re.sub(search_pattern, search_replacement, content, flags=re.DOTALL)

    # 6. Script 태그 교체
    # 기존: 여러 script 태그 + 인라인 스크립트
    # 변경: 3개의 script 태그만
    script_pattern = r'<script src="/type/www/js/jquery.*?</body>'
    script_replacement = '''<script src="/type/www/js/jquery-2.2.4.min.js?ver=1.9"></script>
    <script src="/type/www/js/plugins/aos.js?ver=1.9"></script>
    <script src="includes/init.js"></script>
</body>'''
    content = re.sub(script_pattern, script_replacement, content, flags=re.DOTALL)

    # 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Migrated: {file_path}")

# 모든 HTML 파일 변경
html_files = glob.glob("html/*.html")
for file_path in html_files:
    if file_path != "html/main.html":  # main.html은 별도 처리
        migrate_html_page(file_path)

print(f"\n총 {len(html_files) - 1}개 파일 마이그레이션 완료")
```

#### 4-2. 스크립트 실행

```bash
# Python 스크립트 실행
cd /Users/odada/jeongmiae/-github/cms-publish
python3 html/migrate_pages.py
```

#### 4-3. 수동 검증

자동 스크립트로 변경이 어려운 페이지는 수동으로 검증:

1. **main.html**: 메인 페이지는 구조가 다를 수 있으므로 별도 확인
2. **특수 레이아웃 페이지**: 사이드바 등이 있는 페이지는 개별 확인

---

### Step 5: 테스트

#### 5-1. 로컬 서버 실행

```bash
# Python Simple HTTP Server
cd /Users/odada/jeongmiae/-github/cms-publish
python3 -m http.server 8000

# 브라우저에서 확인
# http://localhost:8000/html/main.html
```

#### 5-2. 브라우저 개발자 도구 확인

1. **Network 탭**:
   - CSS 파일이 1개만 로드되는지 확인
   - JS 파일이 정상 로드되는지 확인
   - includes/*.html 파일들이 로드되는지 확인

2. **Console 탭**:
   - 에러 메시지가 없는지 확인
   - jQuery 오류가 없는지 확인

3. **Elements 탭**:
   - Header, Footer가 정상 표시되는지 확인
   - DOM 구조가 올바른지 확인

---

## 테스트 체크리스트

### 기능 테스트

- [ ] **Header**
  - [ ] 로고 클릭 → 메인 페이지 이동
  - [ ] 메뉴 hover → 서브메뉴 표시
  - [ ] 메뉴 클릭 → 해당 페이지 이동
  - [ ] 언어 선택 버튼 동작
  - [ ] 검색 버튼 클릭 → 검색 오버레이 표시

- [ ] **Footer**
  - [ ] 회사 정보 표시
  - [ ] 링크 클릭 동작
  - [ ] 저작권 정보 표시

- [ ] **All Menu**
  - [ ] 전체메뉴 버튼 클릭 → 오버레이 표시
  - [ ] 메뉴 클릭 → 해당 페이지 이동
  - [ ] 닫기 버튼 동작

- [ ] **Search**
  - [ ] 검색 버튼 클릭 → 오버레이 표시
  - [ ] 검색어 입력 → 검색 결과 표시
  - [ ] 닫기 버튼 동작

- [ ] **Toggle 버튼**
  - [ ] "지원내용 보기" 클릭 → 내용 표시
  - [ ] "지원내용 닫기" 클릭 → 내용 숨김
  - [ ] 화살표 아이콘 회전

- [ ] **AOS 애니메이션**
  - [ ] 스크롤 시 애니메이션 동작
  - [ ] 페이지 로드 시 초기화

### 성능 테스트

- [ ] **CSS 로딩**
  - [ ] bundle.css 1개만 로드되는가?
  - [ ] 개별 CSS 파일은 로드되지 않는가?

- [ ] **JS 로딩**
  - [ ] jQuery, AOS, init.js만 로드되는가?
  - [ ] 중복 스크립트가 없는가?

- [ ] **HTML 크기**
  - [ ] 페이지 크기가 감소했는가?
  - [ ] includes가 정상 로드되는가?

### 브라우저 호환성

- [ ] **Chrome** (최신 버전)
- [ ] **Firefox** (최신 버전)
- [ ] **Safari** (최신 버전)
- [ ] **Edge** (최신 버전)
- [ ] **Mobile Chrome** (Android)
- [ ] **Mobile Safari** (iOS)

### 반응형 테스트

- [ ] **Desktop** (1920px)
- [ ] **Tablet** (768px)
- [ ] **Mobile** (375px)

---

## 롤백 계획

### 문제 발생 시 롤백

#### 방법 1: Git Reset

```bash
# 마지막 커밋 취소
git reset --hard HEAD~1

# 특정 커밋으로 롤백
git reset --hard <commit-hash>
```

#### 방법 2: 백업 복원

```bash
# 백업에서 복원
rm -rf html
cp -r html_backup_YYYYMMDD html

rm -rf type/www/css
cp -r type/www/css_backup_YYYYMMDD type/www/css

rm -rf type/www/js
cp -r type/www/js_backup_YYYYMMDD type/www/js
```

#### 방법 3: Git Revert

```bash
# 특정 커밋을 되돌리는 새 커밋 생성
git revert <commit-hash>

# 여러 커밋 되돌리기
git revert <commit1> <commit2> <commit3>
```

---

## 커밋 전략

### 단계별 커밋

```bash
# Step 1: includes 폴더 생성
git add html/includes/
git commit -m "feat(html): create includes folder with components

- Add header.html component
- Add footer.html component
- Add allmenu.html component
- Add search.html component"

# Step 2: CSS 번들
git add type/www/css/bundle.css
git commit -m "feat(css): create bundle.css for Korean pages

- Consolidate 7 CSS files into single bundle
- Reduce HTTP requests from 7 to 1"

# Step 3: JS 정리
git add html/includes/init.js type/www/js/common_kr.js
git commit -m "feat(js): add common JavaScript for Korean pages

- Add init.js for component loading
- Add common_kr.js for Korean-specific functions"

# Step 4: HTML 페이지 변경
git add html/*.html
git commit -m "refactor(html): migrate Korean pages to component structure

- Replace inline header/footer with includes
- Use bundle.css instead of individual CSS files
- Remove duplicate scripts (~4,500 lines)

Affected: 50 pages"
```

---

## 다음 단계

마이그레이션 완료 후:

1. **JSP 마이그레이션 준비**
   - `html/includes/*.html` → `jsp/includes/*.jsp` 변환
   - init.js 로직을 JSP include로 대체

2. **성능 최적화**
   - CSS/JS 파일 minify
   - 이미지 최적화
   - 캐싱 전략 수립

3. **문서화**
   - 컴포넌트별 사용 가이드 작성
   - 개발자 온보딩 문서 작성

---

## 문의

마이그레이션 중 문제가 발생하면 개발팀에 문의하세요.

- **기술 문의**: 개발팀
- **디자인 검증**: 퍼블리싱팀
- **기능 테스트**: QA팀
