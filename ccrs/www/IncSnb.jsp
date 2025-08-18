<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
<%--
 Class Name : IncSnb.jsp
 Description : SNB영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
<script>
$(function(){
	var slickSnbBookmark = {
		// infinite: true,
		autoplay: false,
		arrows: false,
		button: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 600,
		variableWidth: true,
		swipeToSlide: true,
	}
	$("#snb_board .snb_bookmark .list").not('.slick-initialized').slick(slickSnbBookmark);
	
	$(".btn_print").bind("click", function(){
		window.print();
	});
	
	var clipboard = new ClipboardJS('.btn_urlCopy', {
		text: function() {
			return fn_getUrl();
		}
	});
	clipboard.on('success', function(e) {
		alert("URL이 복사되었습니다.");
	});
	clipboard.on('error', function(e) {
		alert("URL복사에 실패했습니다.");
	}); 
	
	$("#copyUrl").val(fn_getUrl());
	
	$(document).on('click', '.btn_bookmark', function(){
		var val = $(this).val();
		if(val == null || val == '') val = "N";
		fn_comm_ajax({
            url : "/ajaxf/frCom/setBookmark.do",
            data : {SITE_NO : "${SITE_NO }", MENU_NO : "${param.MENU_ID }", CONTENTS_NO : "${CONTENTS_NO}", bookmarkYn : val},
            dataType : "json",
            success : function(data) {
                if(data != null){
                	alert(data.MSG);
                	
                	if("SUCCESS" == data.RESULT){
                		if(val == "Y"){
                			$(".btn_bookmark").val('N');
                			$(".btn_bookmark").removeClass('on');
                		}else{
                			$(".btn_bookmark").val('Y');
                			$(".btn_bookmark").addClass('on');
                		}
                	}
                }
            }
        });
	});
	
	try{
    	Kakao.init('db8f875d5ed49c0de3dbd61f92fbc7d0');
	} catch(e){
	}
	
	var title2 = $(document).attr("title");
	
	var newsImageUrl = "";
	
	try{
		Kakao.Link.createDefaultButton({
			container: '#kakao-link-btn',
			objectType: 'feed',
			content: {
				title: title2,
				description: title2,
				imageUrl: newsImageUrl,
				imageWidth : 60,
				imageHeight : 15,
				link: {
					mobileWebUrl: location.href,
					webUrl: location.href,
					androidExecParams:location.href,
					iosExecParams:location.href
				}
			},
			buttons: [
				{
					title: '웹으로 보기',
					link: {
					mobileWebUrl: location.href,
					webUrl: location.href
					}
				}
			]
		});
	} catch(e){
	}
});

function fn_getUrl(){
	var rtnUrl = ""; 
	var url = decodeURIComponent(location.href);
	url = decodeURIComponent(url).replace("#","");
	url = decodeURIComponent(url).replace(";","");
	rtnUrl = url.replace("#;","");
	return rtnUrl;
}
  
function shareSns(sns){
	var snsTitle = '';
	var snsItems = new Array();
	var winOpt = new Array();	
	var snsUrl = fn_getUrl();

	snsItems['facebook'] = "http://www.facebook.com/share.php?t="+encodeURIComponent(snsTitle) + "&u=" + encodeURIComponent(snsUrl);
	snsItems['twitter'] = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(snsTitle + "\n" + snsUrl);
	snsItems['kakao'] = "https://story.kakao.com/share?url="+encodeURIComponent(snsUrl);
	snsItems['blog'] = "http://blog.naver.com/openapi/share?url="+encodeURIComponent(snsUrl)+"&title="+encodeURIComponent(snsTitle);
	
	winOpt['facebook'] = "width=700, height=500, resizable=yes";
	winOpt['twitter'] = "width=700, height=500, resizable=yes";
	winOpt['kakao'] = "width=500, height=500, resizable=yes";
	winOpt['blog'] = "width=500, height=500, resizeable=yes";
	
	var win = window.open(snsItems[sns], sns, winOpt[sns]);
	if (win) {
		win.focus();
	}
}
</script>

<%--<div id="snb_board">--%>
<%--    <div class="snb_wrap">--%>
<%--       &lt;%&ndash;  <div class="snb_bookmark">--%>
<%--            <strong>Book Mark</strong>--%>
<%--            <div class="list">--%>
<%--            	<c:forEach var="list" items="${bookmarList }">--%>
<%--                <div class="unit">--%>
<%--                    <a href="${BASE_PATH }/cms/com/index.do?MENU_ID=${list.MENU_NO}&CONTENTS_NO=${list.CONTENTS_NO}"><c:out value="${list.MENU_NM }"/></a>--%>
<%--                </div>--%>
<%--            	</c:forEach>--%>
<%--			</div>--%>
<%--		</div> &ndash;%&gt;--%>
<%--	</div>--%>
<%--</div>--%>

<%--<nav id="snb_nav">--%>
<%--	<div class="snb_area">--%>
<%--		<a href="${BASE_PATH }/index.do" class="btn_home"><span>HOME</span></a>--%>
<%--		<ul id="snb_menu">--%>
<%--			<c:forEach var="MENU_1" items="${menuMap.SUB }">--%>
<%--				<li <c:if test="${not empty MENU_1.SUB }">class="child"</c:if> <c:if test="${MENU_1.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>--%>
<%--					<a href="${MENU_1.REAL_URL }"  title="${MENU_1.MENU_NM }<c:if test="${MENU_1.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_1.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_1.LINK_SUB_YN}" target="${MENU_1.SETVAL }">${MENU_1.MENU_NM }</a>--%>
<%--					<c:if test="${not empty MENU_1.SUB }">--%>
<%--						<ul class="menuM">--%>
<%--	    					<c:forEach var="MENU_2" items="${MENU_1.SUB }" >--%>
<%--    						<li <c:if test="${not empty MENU_2.SUB }">class="child"</c:if> <c:if test="${MENU_2.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>--%>
<%--    							<a href="${MENU_2.REAL_URL }"  title="${MENU_2.MENU_NM }<c:if test="${MENU_2.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_2.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_2.LINK_SUB_YN}" target="${MENU_2.SETVAL }">--%>
<%--    								<span>${MENU_2.MENU_NM }</span>--%>
<%--    							</a>--%>
<%--    							<c:if test="${not empty MENU_2.SUB }">--%>
<%--    							<ul class="menuS">--%>
<%--    							<c:forEach var="MENU_3" items="${MENU_2.SUB }" >--%>
<%--    								<li <c:if test="${not empty MENU_3.SUB }">class="child"</c:if> <c:if test="${MENU_3.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>--%>
<%--    									<a href="${MENU_3.REAL_URL }" title="<c:if test="${MENU_3.SETVAL eq '_blank'}">새창열림</c:if>" data-sub="${MENU_3.LINK_SUB_YN}" target="${MENU_3.SETVAL }"><span>${MENU_3.MENU_NM }</span></a>--%>
<%--    									<c:if test="${not empty MENU_3.SUB }">--%>
<%--    									<ul class="menuSS">--%>
<%--    									<c:forEach var="MENU_4" items="${MENU_3.SUB }" >--%>
<%--    										<li<c:if test="${MENU_4.SHOW_YN ne 'Y' }"> style="display : none;"</c:if>>--%>
<%--												<a href="${MENU_4.REAL_URL }" title="<c:if test="${MENU_4.SETVAL eq '_blank'}">새창열림</c:if>" target="${MENU_4.SETVAL }"><span>${MENU_4.MENU_NM }</span></a>--%>
<%--											</li>--%>
<%--    									</c:forEach>--%>
<%--    									</ul>--%>
<%--    									</c:if>--%>
<%--    								</li>--%>
<%--    							</c:forEach>--%>
<%--    							</ul>--%>
<%--    							</c:if>--%>
<%--    						</li>--%>
<%--    						</c:forEach>--%>
<%--    					</ul>--%>
<%--					</c:if>--%>
<%--				</li>--%>
<%--			</c:forEach>--%>
<%--		</ul>--%>

<%--		<div class="snb_util">--%>
<%--			<button type="button" class="btn_print" title="인쇄하기"><span>인쇄</span></button>--%>
<%--			<button type="button" class="btn_share" title="공유하기 레이어 닫힘"><span>공유</span></button>--%>
<%--			<c:if test="${not empty USER_INFO && sProgramNo ne '8' }">--%>
<%--	        	&lt;%&ndash; <button type="button" class="btn_bookmark <c:if test="${not empty bookmarkYn && bookmarkYn eq 'Y'}">on</c:if>" value="${bookmarkYn}" title="북마크설정">북마크</button> &ndash;%&gt;--%>
<%--	        </c:if>--%>
<%--			<!-- 공유박스 -->--%>
<%--			<div class="shareBox">--%>
<%--				<div class="shareBox_wrap">--%>
<%--					<strong>공유하기</strong>--%>
<%--					<ul>--%>
<%--						<li><a href="#none" target="_blank" title="새 창 열림" class="btn_facebook" onclick="shareSns('facebook');"><span>페이스북</span></a></li>--%>
<%--						<li><a href="#none" target="_blank" title="새 창 열림" class="btn_twitter" onclick="shareSns('twitter');"><span>트위터</span></a></li>--%>
<%--						<li><a href="#none" target="_blank" title="새 창 열림" class="btn_kakaotalk" id="kakao-link-btn"><span>카카오톡</span></a></li>--%>
<%--						<li><a href="#none" target="_blank" title="새 창 열림" class="btn_nBlog" onclick="shareSns('blog');"><span>네이버블로그</span></a></li>--%>
<%--						<li class="etc">--%>
<%--							<input type="text" id="copyUrl" title="복사할 URL">--%>
<%--							<button type="button" class="btn_urlCopy">URL 복사</button>--%>
<%--						</li>--%>
<%--					</ul>--%>
<%--					<button type="button" class="btn_close">닫기</button>--%>
<%--				</div>--%>
<%--			</div>--%>
<%--			<!-- //공유박스 -->--%>
<%--		</div>--%>
<%--	</div>--%>
<%--</nav>--%>



<!-- Skip Navigation -->
<div id="skip_nav">
	<a href="#main-content">본문 바로가기</a>
	<a href="#nav-menu">메인메뉴 바로가기</a>
</div>

<!-- header:s -->
<header id="header" class="header">
	<!-- Utility Bar -->
	<div class="utility-bar">
		<img src="/ccrs/resources/images/bg/bg_top.png" alt="">
<%--		<div class="container">--%>
<%--			<div class="utility-left">--%>
<%--				<span class="font-bold">신용회복위원회</span>--%>
<%--				<span>사이버상담부</span>--%>
<%--				<span>신용상담사 자격시험원</span>--%>
<%--			</div>--%>
<%--			<div class="utility-right">--%>
<%--				<span>앱 다운로드</span>--%>
<%--				<span>|</span>--%>
<%--				<span>상담전화</span>--%>
<%--				<span class="phone-number">1600-5500</span>--%>
<%--			</div>--%>
<%--		</div>--%>
	</div>
	<div class="header-container">
		<div class="gnb-wrap">
			<div class="logo">
				<a href="${BASE_PATH }/index.do">
					<img src="/ccrs/resources/images/logo/logo.svg" alt="logo">
				</a>
			</div>
			<nav>
				<ul class="gnb">
					<c:forEach var="MENU_1" items="${menuMap.SUB }">
						<li <c:if test="${not empty MENU_1.SUB }">class="child"</c:if> <c:if test="${MENU_1.SHOW_YN
						ne 'Y' }">style="display : none;"</c:if>>
							<a href="${MENU_1.REAL_URL }"  title="${MENU_1.MENU_NM }<c:if test="${MENU_1.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_1.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_1.LINK_SUB_YN}" target="${MENU_1.SETVAL }">${MENU_1.MENU_NM }</a>
							<c:if test="${not empty MENU_1.SUB }">
								<ul class="depth2">
									<c:forEach var="MENU_2" items="${MENU_1.SUB }" >
										<li <c:if test="${not empty MENU_2.SUB }">class="child"</c:if> <c:if test="${MENU_2.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
											<a href="${MENU_2.REAL_URL }"  title="${MENU_2.MENU_NM }<c:if test="${MENU_2.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_2.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_2.LINK_SUB_YN}" target="${MENU_2.SETVAL }">
													${MENU_2.MENU_NM }
											</a>
										</li>
									</c:forEach>
								</ul>
							</c:if>
						</li>
					</c:forEach>
<%--					<li class="is-active">--%>
<%--						<a href="#" class="menu-label">--%>
<%--							채무조정 지원--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">채무조정 길잡이</a></li>--%>
<%--							<li><a href="#">나에게 맞는 채무조정 찾기</a></li>--%>
<%--							<li><a href="#">맞춤형 채무조정제도</a></li>--%>
<%--							<li><a href="#">개인회생·파산 제도</a></li>--%>
<%--							<li><a href="#">금융회사 채무조정</a></li>--%>
<%--						</ul>--%>
<%--					</li>--%>
<%--					<li>--%>
<%--						<a href="#" class="menu-label">--%>
<%--							상환 중 맞춤지원--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">소액금융지원</a></li>--%>
<%--							<li><a href="#">성실상환 혜택</a></li>--%>
<%--							<li><a href="#">실효위기 지원</a></li>--%>
<%--							<li><a href="#">상환단계별 맞춤형 가이드</a></li>--%>
<%--						</ul>--%>
<%--					</li>--%>
<%--					<li>--%>
<%--						<a href="#" class="menu-label">--%>
<%--							금융생활지원--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">금융·고용·복지 복합지원</a></li>--%>
<%--							<li><a href="#">컨설팅 지원</a></li>--%>
<%--							<li><a href="#">신용교육</a></li>--%>
<%--							<li><a href="#">신용상담사 자격시험</a></li>--%>
<%--							<li><a href="#">불법사금융 알아보기</a></li>--%>
<%--						</ul>--%>
<%--					</li>--%>
<%--					<li>--%>
<%--						<a href="#" class="menu-label">--%>
<%--							알림과 활동소식--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">새소식</a></li>--%>
<%--							<li><a href="#">인재채용</a></li>--%>
<%--							<li><a href="#">공고</a></li>--%>
<%--							<li><a href="#">홍보활동</a></li>--%>
<%--							<li><a href="#">사회공헌</a></li>--%>
<%--							<li><a href="#">자료실</a></li>--%>
<%--							<li><a href="#">결산현황</a></li>--%>

<%--						</ul>--%>
<%--					</li>--%>
<%--					<li>--%>
<%--						<a href="#" class="menu-label">--%>
<%--							소통과 참여공간--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">자주묻는 질문(FAQ)</a></li>--%>
<%--							<li><a href="#">열린참여공간</a></li>--%>
<%--							<li><a href="#">군복무자 전용 질의응답</a></li>--%>
<%--							<li><a href="#">이용 수기</a></li>--%>
<%--						</ul>--%>
<%--					</li>--%>
<%--					<li>--%>
<%--						<a href="#" class="menu-label">--%>
<%--							위원회 소개--%>
<%--						</a>--%>
<%--						<ul class="depth2">--%>
<%--							<li><a href="#">위원장 인사말</a></li>--%>
<%--							<li><a href="#">기관소개</a></li>--%>
<%--							<li><a href="#">사회적 가치</a></li>--%>
<%--							<li><a href="#">청렴경영</a></li>--%>

<%--							<li><a href="#">지부위치 안내</a></li>--%>
<%--						</ul>--%>
<%--					</li>--%>
				</ul>
			</nav>
			<ul class="utils">
				<li class="search"><a href="#"><img src="/ccrs/resources/images/ic/header-language.svg" alt="언어 변경"></a></li>
				<li class="search"><a class="search-open"><img src="/ccrs/resources/images/ic/header-search.svg" alt="컨텐츠 검색"></a></li>
			</ul>
			<button type="button" class="hamburger-wrap" id="hamburgerBtn" title="전체메뉴 열기">
				<a href="#" class="hamburger"><span class="hide">전체메뉴</span></a>
			</button>
			<div class="all-menu" id="allMenuTag">
				<nav>
					<ul class="all-menu-list">
						<li>
							<a href="#" class="depth1">채무조정 지원</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">채무조정 길잡이</a></li>
								<li class="depth3"><a href="#">나에게 맞는 채무조정 찾기</a></li>
								<li class="depth3"><a href="#">맞춤형 채무조정제도</a></li>
								<li class="depth3"><a href="#">개인회생·파산 제도</a></li>
								<li class="depth3"><a href="#">금융회사 채무조정</a></li>
							</ul>
						</li>
						<li>
							<a href="#" class="depth1">
								상환 중 맞춤지원
							</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">소액금융지원</a></li>
								<li class="depth3"><a href="#">성실상환 혜택</a></li>
								<li class="depth3"><a href="#">실효위기 지원</a></li>
								<li class="depth3"><a href="#">상환단계별 맞춤형 가이드</a></li>
							</ul>
						</li>
						<li>
							<a href="#" class="depth1">
								금융생활지원
							</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">금융·고용·복지 복합지원</a></li>
								<li class="depth3"><a href="#">컨설팅 지원</a></li>
								<li class="depth3"><a href="#">신용교육</a></li>
								<li class="depth3"><a href="#">신용상담사 자격시험</a></li>
								<li class="depth3"><a href="#">불법사금융 알아보기</a></li>
							</ul>
						</li>
						<li>
							<a href="#" class="depth1">
								알림과 활동소식
							</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">새소식</a></li>
								<li class="depth3"><a href="#">인재채용</a></li>
								<li class="depth3"><a href="#">공고</a></li>
								<li class="depth3"><a href="#">홍보활동</a></li>
								<li class="depth3"><a href="#">사회공헌</a></li>
								<li class="depth3"><a href="#">자료실</a></li>
								<li class="depth3"><a href="#">결산현황</a></li>
							</ul>
						</li>
						<li>
							<a href="#" class="depth1">
								소통과 참여공간
							</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">자주묻는 질문(FAQ)</a></li>
								<li class="depth3"><a href="#">열린참여공간</a></li>
								<li class="depth3"><a href="#">군복무자 전용 질의응답</a></li>
								<li class="depth3"><a href="#">이용 수기</a></li>
							</ul>
						</li>
						<li>
							<a href="#" class="depth1">
								위원회 소개
							</a>
							<ul class="depth2">
								<li class="depth3"><a href="#">위원장 인사말</a></li>
								<li class="depth3"><a href="#">기관소개</a></li>
								<li class="depth3"><a href="#">사회적 가치</a></li>
								<li class="depth3"><a href="#">청렴경영</a></li>

								<li class="depth3"><a href="#">지부위치 안내</a></li>
							</ul>
						</li>
					</ul>
					<div class="allmenu-util">
						<a href="#" class="util1 hamburger-wrap">
							<img src="/ccrs/resources/images/ic/close.png" alt="전체메뉴 닫기">
						</a>
						<a href="#" class="util2 search-open">
							<img src="/ccrs/resources/images/ic/allmenu-search.svg" alt="검색메뉴">
						</a>
						<a href="#" class="util3">
							<img src="/ccrs/resources/images/ic/allmenu-language.svg" alt="언어변경">
						</a>
					</div>
				</nav>
			</div>
			<div class="search-menu" id="searchTag">
				<h5>통합검색</h5>
				<div class="search-area-header">
					<label for="searchText" class="hide">검색</label>
					<input type="text" name="commonSearchText" id="searchText" placeholder="검색어를 입력하세요" onfocus="this.placeholder=''" onblur="this.placeholder='검색어를 입력하세요'">
					<a class="btn-search-header" onclick="javascript:fn_commonSearch(1);"></a>
				</div>
				<div class="result-title">
					<h5>검색결과</h5><span id="common_total_cnt" class="sp">0</span><h5> 건</h5>
				</div>
				<a href="#" class="btn-close">
					<img src="/ccrs/resources/images/ic/close.png" alt="검색메뉴 닫기">
				</a>
				<div class="result-area">
					<div id="commonSearchItemDiv" class="list-body" style="margin-bottom: 24px;">

					</div>
					<div id="commonSearchPagenationDiv" class="pagenation">

					</div>
				</div>
			</div>
		</div>
	</div>
</header>
<!-- header:e -->