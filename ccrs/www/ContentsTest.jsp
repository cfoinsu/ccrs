<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>

<script src="/ccrs/prg/js/easyCheck.js"></script>

<!-- Sidebar -->
<aside class="sidebar">
	<div class="sidebar-header">
		<h2>채무조정 지원</h2>
	</div>
	<nav class="sidebar-nav">
		<div class="nav-section active">
			<button class="nav-section-title">
				채무조정 길잡이
				<i class="nav-arrow"></i>
			</button>
			<ul class="nav-subsection">
				<li><a href="#" class="nav-subitem active">소액대출</a></li>
				<li><a href="#" class="nav-subitem">소액체크·신용카드 발급</a></li>
			</ul>
		</div>
		<div class="nav-section">
			<button class="nav-section-title">
				성실상환 혜택
				<svg class="nav-arrow" width="16" height="16" viewBox="0 0 16 16">
					<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5"></path>
				</svg>
			</button>
		</div>
		<div class="nav-section">
			<button class="nav-section-title">
				실효위기 지원
				<svg class="nav-arrow" width="16" height="16" viewBox="0 0 16 16">
					<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5"></path>
				</svg>
			</button>
		</div>
		<div class="nav-section">
			<button class="nav-section-title">
				상황별 가이드
				<svg class="nav-arrow" width="16" height="16" viewBox="0 0 16 16">
					<path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5"></path>
				</svg>
			</button>
		</div>
	</nav>
</aside>

<!-- Content Area -->
<div class="content-area">
	<!-- Breadcrumb -->
	<nav class="breadcrumb">
		<a href="#" class="breadcrumb-item">
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M8 14V8l-4-4 4-4 4 4v6z" stroke="currentColor" stroke-width="1.5"></path>
			</svg>
			홈
		</a>
		<span class="breadcrumb-separator">&gt;</span>
		<a href="#" class="breadcrumb-item">상환 중 맞춤지원</a>
		<span class="breadcrumb-separator">&gt;</span>
		<a href="#" class="breadcrumb-item">소액금융지원</a>
		<span class="breadcrumb-separator">&gt;</span>
		<span class="breadcrumb-item current">소액대출</span>
	</nav>
	<!-- Page Header -->
	<div class="page-header">
		<div class="title-wrap">
			<h1>맞춤형채무조정</h1>
			<div class="page-actions">
				<div class="view-count">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M8 12c4 0 6-3 6-4s-2-4-6-4-6 3-6 4 2 4 6 4z" stroke="currentColor" stroke-width="1.5"></path>
						<circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"></circle>
					</svg>
					9,999
				</div>
				<button class="action-btn" aria-label="도움말">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"></circle>
						<path d="M8 12v0M8 8v-1a2 2 0 1 1 2-2" stroke="currentColor" stroke-width="1.5"></path>
					</svg>
				</button>
				<button class="action-btn" aria-label="인쇄">
					<i class="fas fa-print"></i>
				</button>
				<button class="action-btn" aria-label="공유">
					<i class="fas fa-share-alt"></i>
				</button>
			</div>
		</div>
		<p class="page-description">
			<span class="info-icon">ℹ️</span>
			간략한 정보를 통해 본인에게 맞는 채무조정제도를 소개합니다.
		</p>

	</div>
	<!-- Content Sections -->
	<div class="content-sections">

		<!-- Form Section -->
		<div class="form-section">
			<div class="form-grid">
				<div class="form-group">
					<label>재화여 한화위수</label>
					<div class="input-row">
						<div class="input-wrapper">
							<input type="text" placeholder="0" class="number-input">
							<div class="input-label">화외</div>
						</div>
						<div class="input-wrapper">
							<input type="text" placeholder="0" class="number-input">
							<div class="input-label">방식</div>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label>재화여 한화위 그룹기과법</label>
					<div class="input-row">
						<div class="input-wrapper">
							<input type="text" placeholder="0" class="number-input">
							<div class="input-label">화외</div>
						</div>
						<div class="input-wrapper">
							<input type="text" placeholder="0" class="number-input">
							<div class="input-label">방식</div>
						</div>
					</div>
				</div>
			</div>

			<div class="form-grid">
				<div class="form-group">
					<label>물리범적</label>
					<select class="form-select">
						<option>주의사애</option>
					</select>
				</div>

				<div class="form-group">
					<label>물리실신</label>
					<select class="form-select">
						<option>생활자산</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Compare Section -->
		<div class="compare-section">
			<div class="compare-content">
				<div class="compare-info">
					<span>비교하기</span>
					<span class="selected-label">선택한 상품</span>
					<span class="product-name">재민금리와제회용육자금</span>
				</div>
				<button class="compare-btn" id="openCompareModal" onclick="handleSubmit();">비교</button>
			</div>
		</div>

		<!-- Quick Results -->
		<div class="results-grid">
			<div class="result-card">
				<div class="action-section">
					<div class="action-label">조치</div>
					<button class="action-button">직접신청 상담요청</button>
				</div>
			</div>

			<div class="result-card">
				<h3>간단한만 결과</h3>
				<div class="result-item">
					<div class="result-icon">📊</div>
					<div class="result-info">
						<div class="result-title">사전제무조정</div>
						<div class="result-details">
							사과처 <span class="highlight">10,000명법</span>
							A이법명 <span class="highlight">A4직련법</span>
							수실정 <span class="highlight">2.8%</span>
						</div>
					</div>
					<div class="result-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>
				<button class="more-info-btn">자제용 더보기 →</button>
			</div>
		</div>

		<!-- Additional Information -->
		<div class="additional-info">
			<h3>또 다른 정보하기</h3>

			<div class="info-list">
				<div class="info-item">
					<div class="info-icon">📋</div>
					<div class="info-content">
						<h4>회법적 청법제</h4>
						<div class="info-subtitle">회법화제도청법제중계</div>
						<div class="info-description">신법적 더불경(B2B) 상의 금융서해법</div>
					</div>
					<div class="info-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>

				<div class="info-item">
					<div class="info-icon">📋</div>
					<div class="info-content">
						<h4>회법적 금과법</h4>
						<div class="info-subtitle">회법화제도 청법</div>
						<div class="info-description">신법적 더불경(B2B) 상의 금융서해법</div>
					</div>
					<div class="info-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>

				<div class="info-item">
					<div class="info-icon">📋</div>
					<div class="info-content">
						<h4>회법적 청법제</h4>
						<div class="info-subtitle">또 다이벌 제과법</div>
						<div class="info-description">신법적 더불경(B2B) 상의 금융서해법을 화의 등용 사법약 대합 대사</div>
					</div>
					<div class="info-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>

				<div class="info-item">
					<div class="info-icon">📋</div>
					<div class="info-content">
						<h4>회법적 법제</h4>
						<div class="info-subtitle">또 다사법제화법제중계</div>
						<div class="info-description">신법적 더불경(B2B) 상의 금주서해법</div>
					</div>
					<div class="info-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>

				<div class="info-item">
					<div class="info-icon">📋</div>
					<div class="info-content">
						<h4>회법적 청법제</h4>
						<div class="info-subtitle">대법의 상법화대법제중업대법</div>
						<div class="info-description">신법적 화법 상의 화법 금융법</div>
					</div>
					<div class="info-actions">
						<button class="btn-secondary">상담신청</button>
						<button class="btn-primary">선택하기</button>
					</div>
				</div>
			</div>

			<div class="more-section">
				<button class="more-btn">더보기 →</button>
			</div>
		</div>

		<!-- Feedback Section -->
		<section class="feedback-section">
			<div class="feedback-card">
				<h3>이 페이지에서 제공하는 정보에 대하여 어느 정도 만족하셨습니까?</h3>
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
				<div class="feedback-input">
					<label class="hide" for="feedback-text">의견 입력</label>
					<textarea id="feedback-text" placeholder="100자 이내로 작성해 주세요." rows="1"></textarea>
					<button type="button" class="submit-btn">제출</button>
				</div>
			</div>
		</section>

	</div>
</div>
