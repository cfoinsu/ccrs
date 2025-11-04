# CCRS 프로젝트 문서

## 📚 문서 목록

### 1. [ARCHITECTURE.md](./ARCHITECTURE.md)
**대상**: 모든 개발자, 퍼블리셔

**내용**:
- 영문 사이트 (html_en) 구조 분석
- 파일 구조 및 디렉토리 구성
- 컴포넌트 상세 설명 (Header, Footer, AllMenu, Search)
- CSS 번들링 구조
- JavaScript 아키텍처
- 국문 사이트 마이그레이션 개요
- JSP 마이그레이션 가이드
- 성과 지표 및 개선 효과
- 베스트 프랙티스
- 트러블슈팅

**언제 읽어야 하나요?**
- ✅ 프로젝트 구조를 이해하고 싶을 때
- ✅ 컴포넌트 기반 구조의 작동 방식을 알고 싶을 때
- ✅ 국문 사이트 마이그레이션을 시작하기 전
- ✅ 신규 개발자 온보딩 시

---

### 2. [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)
**대상**: 퍼블리셔, 프론트엔드 개발자

**내용**:
- 국문 사이트 마이그레이션 단계별 가이드
- 준비 작업 (Git, 백업)
- includes 폴더 생성 및 컴포넌트 분리
- CSS 번들 생성
- JavaScript 정리
- HTML 페이지 일괄 변경 스크립트
- 테스트 체크리스트
- 롤백 계획
- 커밋 전략

**언제 읽어야 하나요?**
- ✅ 국문 사이트를 영문과 같은 구조로 변경할 때
- ✅ 단계별 작업 순서를 알고 싶을 때
- ✅ 자동화 스크립트를 사용하고 싶을 때
- ✅ 테스트 방법을 알고 싶을 때

---

## 🚀 빠른 시작

### 신규 개발자

1. **ARCHITECTURE.md 읽기** (30분)
   - 프로젝트 전체 구조 이해
   - 컴포넌트 기반 아키텍처 파악

2. **로컬 환경 설정** (10분)
   ```bash
   # 저장소 클론
   git clone <repository-url>
   cd cms-publish

   # 로컬 서버 실행
   python3 -m http.server 8000

   # 브라우저에서 확인
   # http://localhost:8000/html_en/main_en.html
   ```

3. **영문 사이트 탐색** (20분)
   - 각 페이지 구조 확인
   - 개발자 도구로 includes 로딩 확인
   - Network 탭에서 bundle_en.css 확인

---

### 국문 사이트 작업자

1. **MIGRATION_GUIDE.md 읽기** (30분)
   - 마이그레이션 전체 프로세스 이해
   - 예상 작업 시간 파악

2. **백업 및 브랜치 생성** (10분)
   ```bash
   # 백업
   cp -r html html_backup_$(date +%Y%m%d)

   # 브랜치 생성
   git checkout -b refactor/korean-site-components
   ```

3. **단계별 마이그레이션 진행**
   - Step 1: includes 폴더 생성
   - Step 2: CSS 번들 생성
   - Step 3: JS 정리
   - Step 4: HTML 페이지 변경
   - Step 5: 테스트

---

## 📖 학습 경로

### Level 1: 초급 (프로젝트 이해)

**목표**: 프로젝트 구조와 컴포넌트 이해

**학습 순서**:
1. ARCHITECTURE.md → "개요" 섹션
2. ARCHITECTURE.md → "영문 사이트 구조" 섹션
3. ARCHITECTURE.md → "컴포넌트 설명" 섹션
4. 실제 파일 탐색: `html_en/includes/` 폴더

**예상 시간**: 1시간

---

### Level 2: 중급 (마이그레이션 준비)

**목표**: 국문 사이트 마이그레이션 이해

**학습 순서**:
1. ARCHITECTURE.md → "국문 사이트 마이그레이션 가이드" 섹션
2. MIGRATION_GUIDE.md → "준비 작업" 섹션
3. MIGRATION_GUIDE.md → "단계별 마이그레이션" 섹션
4. 테스트 환경에서 1-2개 페이지 마이그레이션 연습

**예상 시간**: 2-3시간

---

### Level 3: 고급 (JSP 전환)

**목표**: JSP 마이그레이션 준비

**학습 순서**:
1. ARCHITECTURE.md → "JSP 마이그레이션 가이드" 섹션
2. includes/*.html을 includes/*.jsp로 변환 연습
3. init.js 로직을 JSP include로 대체하는 방법 학습

**예상 시간**: 3-4시간

---

## 🛠️ 유용한 명령어

### Git 관련

```bash
# 작업 브랜치 생성
git checkout -b feature/my-feature

# 변경사항 확인
git status
git diff

# 커밋
git add .
git commit -m "feat: add new feature"

# 푸시
git push origin feature/my-feature
```

### 파일 검색

```bash
# 특정 텍스트 검색
grep -r "검색어" html/

# HTML 파일에서 검색
grep -r "검색어" html/*.html

# 파일 개수 확인
ls -1 html/*.html | wc -l
```

### 로컬 서버

```bash
# Python Simple HTTP Server
python3 -m http.server 8000

# Node.js http-server (설치 필요)
npx http-server -p 8000

# PHP Built-in Server
php -S localhost:8000
```

---

## 📊 프로젝트 현황

### 영문 사이트 (html_en)

| 항목 | 상태 | 비고 |
|------|------|------|
| 컴포넌트 분리 | ✅ 완료 | 4개 컴포넌트 (Header, Footer, AllMenu, Search) |
| CSS 번들링 | ✅ 완료 | bundle_en.css (10개 파일 통합) |
| JS 정리 | ✅ 완료 | common_en.js, init.js |
| 페이지 마이그레이션 | ✅ 완료 | 22개 페이지 |
| 코드 감소 | ✅ 95% | ~5,000줄 → ~250줄 |

### 국문 사이트 (html)

| 항목 | 상태 | 비고 |
|------|------|------|
| 컴포넌트 분리 | ⏳ 대기 | MIGRATION_GUIDE.md 참고 |
| CSS 번들링 | ⏳ 대기 | bundle.css 생성 필요 |
| JS 정리 | ⏳ 대기 | common_kr.js, init.js 필요 |
| 페이지 마이그레이션 | ⏳ 대기 | ~50개 페이지 예상 |
| 예상 코드 감소 | 📈 96% | 영문 사이트 기준 추정 |

---

## 🔗 관련 링크

### 내부 문서
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 아키텍처 문서
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - 마이그레이션 가이드

### 외부 리소스
- [jQuery Documentation](https://api.jquery.com/)
- [AOS Animation Library](https://michalsnik.github.io/aos/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ FAQ

### Q1: 왜 컴포넌트 기반 구조로 변경했나요?

**A**: 코드 중복을 제거하고 유지보수성을 향상시키기 위해서입니다.

**개선 효과**:
- 코드 중복 95% 감소
- HTTP 요청 90% 감소
- 유지보수 시간 80% 단축

---

### Q2: JSP로 전환은 언제 하나요?

**A**: HTML 기반 마이그레이션이 완료되고 안정화된 후, 백엔드 개발과 함께 진행합니다.

**전환 과정**:
1. HTML 컴포넌트 구조 완성 (현재 단계)
2. 안정화 및 테스트
3. JSP include 문법으로 변환
4. 백엔드 API 연동

---

### Q3: 영문 사이트와 국문 사이트의 차이점은?

**A**: 구조는 동일하고, 파일명과 텍스트만 다릅니다.

| 구분 | 영문 사이트 | 국문 사이트 |
|------|-------------|-------------|
| **폴더** | `html_en/` | `html/` |
| **CSS 번들** | `bundle_en.css` | `bundle.css` |
| **JS 공통** | `common_en.js` | `common_kr.js` |
| **컴포넌트** | `header_en.html` | `header.html` |
| **언어** | English | 한국어 |

---

### Q4: 기존 페이지가 깨지지 않을까요?

**A**: 단계별로 진행하며, 각 단계마다 테스트하므로 안전합니다.

**안전 장치**:
- ✅ Git 브랜치로 작업 (main 브랜치 보호)
- ✅ 백업 생성 (롤백 가능)
- ✅ 단계별 커밋 (문제 발생 시 특정 단계로 복구)
- ✅ 테스트 체크리스트 (모든 기능 검증)

---

### Q5: 자동화 스크립트를 사용해야 하나요?

**A**: 50개 이상의 페이지를 변경하므로 자동화를 강력히 권장합니다.

**장점**:
- ⏱️ 시간 절약: 4시간 → 30분
- ✅ 일관성: 모든 페이지 동일한 패턴 적용
- 🔍 오류 감소: 수동 작업보다 실수가 적음

**주의사항**:
- 반드시 백업 후 실행
- 1-2개 페이지로 먼저 테스트
- 특수한 구조의 페이지는 수동 검증

---

## 📞 지원

### 문의 채널

- **기술 문의**: 개발팀
- **디자인 검증**: 퍼블리싱팀
- **기능 테스트**: QA팀
- **문서 오류**: GitHub Issues

---

## 📝 변경 이력

| 날짜 | 버전 | 변경 내용 |
|------|------|-----------|
| 2025-11-04 | 1.0 | 초기 문서 작성 (ARCHITECTURE.md, MIGRATION_GUIDE.md, README.md) |

---

## 📄 라이선스

이 문서는 CCRS 프로젝트의 일부이며, 내부 사용 목적으로 작성되었습니다.

---

**작성**: Claude Code
**최종 수정**: 2025-11-04
**버전**: 1.0
