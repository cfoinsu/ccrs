# 📱 Mobile/Tablet 헤더 구성 가이드

> 서브페이지의 depth별 mobile/tablet 헤더 구성 규칙

## 🎯 추천 최종 구성

### Main (메인 페이지)
```
[Logo ————————————————— 검색 | 영문 | 전체메뉴]
```
- **좌측**: 로고
- **우측**: 검색, 영문전환, 전체메뉴 (3개 아이콘)
- **특징**: 모든 기능 노출

---

### Depth 1 (1차 메뉴)
```
[Logo | Depth1명 ——————— 검색 | 영문 | 전체메뉴]
```
- **좌측**: 로고 + Depth1 페이지명
- **우측**: 검색, 영문전환, 전체메뉴 (3개 아이콘)
- **예시**: `[Logo | 채무조정 ——— 🔍 | 🌐 | ☰]`
- **특징**: 현재 위치 표시, 모든 기능 유지

---

### Depth 2 (2차 메뉴)
```
[← 뒤로 | Depth2명 ————————————— ☰ 전체메뉴]
```
- **좌측**: 뒤로가기 버튼 + Depth2 페이지명
- **우측**: 전체메뉴만
- **예시**: `[← 뒤로 | 신속채무조정 ————— ☰]`
- **특징**:
  - 검색/영문 버튼은 전체메뉴 안으로 이동
  - 뒤로가기로 이전 페이지 이동
  - 헤더 단순화로 컨텐츠 집중

---

### Depth 3 (3차 메뉴)
```
[← 뒤로 | Depth3명 ————————————— ☰ 전체메뉴]
```
- **좌측**: 뒤로가기 버튼 + Depth3 페이지명
- **우측**: 전체메뉴만
- **예시**: `[← 뒤로 | 일반 ————— ☰]`
- **특징**: Depth 2와 동일한 구조 유지

---

## 🔑 핵심 규칙

### 1. 깊이에 따른 단순화
```scss
Main/Depth1:  [Logo + 페이지명] ——— [검색 | 영문 | 메뉴]  // 풀 기능
Depth2/3:     [← 뒤로 + 페이지명] ———————— [메뉴]        // 최소화
```

### 2. 뒤로가기 버튼
- **Depth 2 이상**: 필수
- **동작**: 이전 페이지로 이동 (브라우저 히스토리 사용)
- **아이콘**: `←` 또는 `<`

### 3. 전체메뉴 내 기능
Depth 2 이상에서는 다음 기능들이 전체메뉴 안으로 이동:
- 🔍 검색
- 🌐 영문전환
- 🏠 홈으로 (선택사항)

### 4. Breadcrumb 대안
헤더에 표시하기 어려운 경우, 컨텐츠 영역 상단에 배치:
```html
<div class="breadcrumb">
  홈 > 채무조정 > 신속채무조정 > 일반
</div>
```

---

## 📐 레이아웃 스펙

### 헤더 높이
```scss
$hdH-t: 72px;  // Tablet/Mobile 헤더 높이
```

### 좌측 영역
- **로고**: 고정 너비 (예: 180px)
- **페이지명**: 폰트 크기 16px~18px, 말줄임 처리
- **뒤로가기**: 버튼 크기 44x44px (터치 영역)

### 우측 영역
- **아이콘 크기**: 24x24px
- **버튼 크기**: 44x44px (터치 영역)
- **간격**: 아이콘 간 8px~12px

---

## 💡 구현 예시

### HTML 구조
```html
<!-- Main -->
<header class="mobile-header" data-depth="main">
  <div class="header-left">
    <a href="/" class="logo">
      <img src="logo.png" alt="신용회복위원회">
    </a>
  </div>
  <div class="header-right">
    <button class="btn-search" aria-label="검색">🔍</button>
    <button class="btn-lang" aria-label="영문전환">🌐</button>
    <button class="btn-menu" aria-label="전체메뉴">☰</button>
  </div>
</header>

<!-- Depth 1 -->
<header class="mobile-header" data-depth="1">
  <div class="header-left">
    <a href="/" class="logo">
      <img src="logo.png" alt="신용회복위원회">
    </a>
    <span class="divider">|</span>
    <h1 class="page-title">채무조정</h1>
  </div>
  <div class="header-right">
    <button class="btn-search" aria-label="검색">🔍</button>
    <button class="btn-lang" aria-label="영문전환">🌐</button>
    <button class="btn-menu" aria-label="전체메뉴">☰</button>
  </div>
</header>

<!-- Depth 2/3 -->
<header class="mobile-header" data-depth="2">
  <div class="header-left">
    <button class="btn-back" aria-label="뒤로가기">←</button>
    <span class="divider">|</span>
    <h1 class="page-title">신속채무조정</h1>
  </div>
  <div class="header-right">
    <button class="btn-menu" aria-label="전체메뉴">☰</button>
  </div>
</header>
```

### SCSS 스타일
```scss
.mobile-header {
  height: $hdH-t;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0; // 말줄임을 위해 필요

    .logo {
      flex-shrink: 0;
      width: 180px;
    }

    .divider {
      color: #ddd;
    }

    .page-title {
      font-size: 18px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-back {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
  }

  .header-right {
    display: flex;
    gap: 8px;
    flex-shrink: 0;

    button {
      width: 44px;
      height: 44px;
    }
  }

  // Depth별 스타일
  &[data-depth="main"],
  &[data-depth="1"] {
    .header-right {
      button {
        display: block;
      }
    }
  }

  &[data-depth="2"],
  &[data-depth="3"] {
    .header-right {
      .btn-search,
      .btn-lang {
        display: none;
      }
    }
  }
}
```

---

## 🎨 UX 고려사항

### 1. 뒤로가기 동작
```javascript
// 뒤로가기 버튼 클릭 시
document.querySelector('.btn-back')?.addEventListener('click', () => {
  window.history.back();
});
```

### 2. 페이지명 말줄임
- 긴 제목은 ellipsis 처리
- 최대 1줄 표시
- 필요시 title 속성으로 전체 텍스트 제공

### 3. 접근성
```html
<button class="btn-back" aria-label="이전 페이지로 돌아가기">
  <i class="icon-arrow-left" aria-hidden="true"></i>
</button>
```

### 4. 반응형 분기점
```scss
@include mobile {      // ~767px
  .mobile-header {
    padding: 0 16px;

    .logo {
      width: 140px;
    }

    .page-title {
      font-size: 16px;
    }
  }
}

@include tabletLess {  // 768px~1023px
  .mobile-header {
    padding: 0 20px;
  }
}
```

---

## ✅ 체크리스트

헤더 구현 시 확인사항:

- [ ] Main과 Depth1은 모든 기능(검색/영문/메뉴) 노출
- [ ] Depth2 이상은 뒤로가기 + 전체메뉴만
- [ ] 뒤로가기 버튼의 터치 영역 최소 44x44px
- [ ] 페이지명 말줄임 처리 적용
- [ ] 헤더 높이 72px 고정
- [ ] 전체메뉴 내 검색/영문 기능 제공
- [ ] 접근성 레이블(aria-label) 추가
- [ ] 키보드 네비게이션 지원

---

## 📚 관련 문서

- [UI 컴포넌트 라이브러리](./UI_COMPONENTS_LIBRARY.md)
- [반응형 레이아웃 가이드](./CODING_GUIDE.md#반응형)
- [접근성 가이드](./CODING_GUIDE.md#접근성)

---

**작성일**: 2025-11-07
**버전**: 1.0
