<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
 Class Name : IncTopSection.jsp
 Description : 상단 메뉴 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<script>
var frameBtnObj;

function setHref(obj, org){
	if($(obj).find("> div").length > 0){
		if($(obj).find("> div> ul > li:visible").length > 0){
			if($(obj).find(">a").data("sub")=="Y" ){
				$(org).find(">a").attr("href",$(obj).find("> div> ul > li:visible:eq(0) > a").attr("href"));
				$(org).find(">a").attr("target",$(obj).find("> div> ul > li:visible:eq(0) > a").attr("target"));
				
				setHref($(obj).find("> div> ul > li:visible:eq(0)"),org);
			}else{
				$(org).find(">a").attr("href",$(obj).find(">a").attr("href"));
			}
		}
	}else{
		if($(obj).find("> ul > li").not("[style*='display : none;']").length > 0){
			if($(obj).find(">a").data("sub")=="Y"){
				$(org).find(">a").attr("href",$(obj).find("> ul > li").not("[style*='display : none;']").eq(0).find(' > a').attr("href"));
				$(org).find(">a").attr("target",$(obj).find("> ul > li").not("[style*='display : none;']").eq(0).find(' > a').attr("target"));
				
				setHref($(obj).find("> ul > li").not("[style*='display : none;']").eq(0),org);
			}else{
				$(org).find(">a").attr("href",$(obj).find(">a").attr("href"));
			}
		}
	}
}

$(function(){
	$(document).on("click", "ul#gnb li, ul#snb_menu li, ul#sitemap li", function(){
		setHref($(this),$(this));
	});
	$(document).on("click", ".navList>.menu>ul>li>a", function(){
		var val = $(this).data('menuno');
		$("ul#gnb li").find('.'+val).closest('li').trigger('click');
		if($("ul#gnb li").find('.'+val).attr('target') == "_blank"){
			window.open($("ul#gnb li").find('.'+val).attr('href'));
		}else{
			location.href = $("ul#gnb li").find('.'+val).attr('href'); 			
		} 
	});
	
	$(document).on("click", ".pnbList>.menu>ul>li>a", function(){
		var val = $(this).data('menuno');
		$("ul#gnb li").find('.'+val).closest('li').trigger('click');
		if($("ul#gnb li").find('.'+val).attr('target') == "_blank"){
			window.open($("ul#gnb li").find('.'+val).attr('href'));
		}else{
			location.href = $("ul#gnb li").find('.'+val).attr('href'); 			
		} 
// 		$("ul#gnb li").find('.'+val).get(0).click();
	});
	
	if($('#gnb li.on').parents('ul').hasClass('menuSS')){
		gnbDep1 = $('#gnb > li').index($('#gnb li.on').parents('ul.menuM').parents('li'))+1;
		gnbDep2 = $('#gnb li.on').parents('ul.menuM').find('>li').index($('#gnb li.on').parents('ul.menuS').parents('li'))+1;
		gnbDep3 = $('#gnb li.on').parents('ul.menuS').find('>li').index($('#gnb li.on').parents('ul.menuSS').parents('li'))+1;
		gnbDep4 = $('#gnb li.on').parents('ul.menuSS').find('>li').index($('#gnb li.on'))+1;
	}else if($('#gnb li.on').parents('ul').hasClass('menuS')){
		gnbDep1 = $('#gnb > li').index($('#gnb li.on').parents('ul.menuM').parents('li'))+1;
		gnbDep2 = $('#gnb li.on').parents('ul.menuM').find('>li').index($('#gnb li.on').parents('ul.menuS').parents('li'))+1;
		gnbDep3 = $('#gnb li.on').parents('ul.menuS').find('>li').index($('#gnb li.on'))+1;
	}else if($('#gnb li.on').parents('ul').hasClass('menuM')){
		gnbDep1 = $('#gnb > li').index($('#gnb li.on').parents('ul.menuM').parents('li'))+1;
		gnbDep2 = $('#gnb li.on').parents('ul.menuM').find('>li').index($('#gnb li.on'))+1;
	}else{
		gnbDep1 = $('#gnb > li').index($('#gnb li.on'))+1;
	}
	$('.sVisual strong').text($('#gnb li.on > a').text());
	
	$(document).on('click', '.btn_logout', function(){
		frameBtnObj = $(this);
		$("body").css("overflow-y","hidden");
		$('<iframe id="iframeLogoutPop" src="${BASE_PATH}/cms/frCom/actionLogoutPop.do" class="pop_iframe on" height="100%" scrolling="no" frameborder="0" title="로그아웃 팝업"/>').appendTo($("body #container"));
	});
	
	$(document).on('click', '.btn_login', function(){
		location.href = "${BASE_PATH}/login/topUtilLink.do?pRetUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
	});
	
	$(document).on('click', '.btn_mypage', function(){
		location.href = "${BASE_PATH}/mypage/topUtilLink.do";
	});
	
	$(document).on('click', '.gnb_util .btn_search', function(){
		frameBtnObj = $(this);
		$("body").css("overflow-y","hidden");
		$('<iframe id="iframeSearchPop" src="/cms/frCom/actionTotalSearchPop.do?pRetUrl='+ encodeURIComponent(window.location.pathname + window.location.search)+'" class="pop_iframe on" height="100%" scrolling="no" frameborder="0" title="통합 검색 팝업"/>').appendTo($("body #container"));
	});
	
	$("header .mBtn_topMenu").click(function(){
		if(window.innerWidth < 1041){
			if(!$("nav>#gnb>li>a").hasClass('on')){
				$("nav>#gnb>li>a").eq(0).trigger('click');
			}
		}
	});
});

function closeTotalSearchPop(){
	$("body").css("overflow","");
	$("body").css("overflow-y","");
	$("#iframeSearchPop").remove();
}
function closeLogoutPop(){
	$("body").css("overflow","");
	$("body").css("overflow-y","");
	$("#iframeLogoutPop").remove();
}
/************************************************************************
* 함수명 : fn_logout
* 설 명 :  로그아웃
* 인 자 :
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2021.03.15 bvs 최초생성
************************************************************************/
function fn_logout(){
	location.href = "${BASE_PATH}/action/actionLogout.do";
}
</script>
<div id="header">
	<div class="top_link">
		<div class="inner">
		</div>
	</div>
	<header>
		<h1 class="logo">
			<a href="${BASE_PATH }/index.do">
				<img src="/ajaxa/fileCpnt/fileView.do?gbn=x01&SITE_GROUP_NO=${SITE_GROUP_NO }&SITE_NO=${SITE_NO}" alt="CMS23" />
				<span><img src="/ajaxa/fileCpnt/fileView.do?gbn=x02&SITE_GROUP_NO=${SITE_GROUP_NO }&SITE_NO=${SITE_NO}" alt="CMS23" /></span>
			</a>
		</h1>

		<button type="button" title="전체메뉴" class="mBtn_topMenu"><span>전체메뉴</span></button><!-- 모바일 전용 -->

		<nav>
			<ul id="gnb">
			<c:forEach var="MENU_1" items="${menuMap.SUB }" varStatus="status">
        		<li class="<c:if test="${not empty MENU_1.SUB }">child</c:if><c:if test="${MENU_1.MENU_NO eq param.MENU_ID }"> on</c:if> hasBnrZone${status.index+1}" <c:if test="${MENU_1.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
					<a href="${MENU_1.REAL_URL }" title="${MENU_1.MENU_NM }<c:if test="${MENU_1.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_1.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_1.LINK_SUB_YN}" target="${MENU_1.SETVAL }" class="${MENU_1.MENU_NO } <c:if test="${curMenu_1.MENU_NO eq MENU_1.MENU_NO}">on</c:if>">${MENU_1.MENU_NM }</a>
						<p class="gnbTit">
							<b>${MENU_1.MENU_NM }</b>
						</p>
					<c:if test="${not empty MENU_1.SUB }">
					<div class="group">
						<ul class="menuM menuStep">
						<c:forEach var="MENU_2" items="${MENU_1.SUB }" varStatus="status2">
					   		<li class="<c:if test="${not empty MENU_2.SUB }">child</c:if><c:if test="${MENU_2.MENU_NO eq param.MENU_ID }"> on</c:if>" <c:if test="${MENU_2.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
					   			<a href="${MENU_2.REAL_URL }" class="${MENU_2.MENU_NO }" title="${MENU_2.MENU_NM }<c:if test="${MENU_2.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_2.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_2.LINK_SUB_YN}" target="${MENU_2.SETVAL }">
					   				<em class="menuM_step">Step ${status2.index +1 }</em>
									<span>${MENU_2.MENU_NM }</span>
					   			</a>
							    <c:if test="${not empty MENU_2.SUB }">
							    <div class="group">
								    <ul class="menuS">
									<c:forEach var="MENU_3" items="${MENU_2.SUB }">
										<li class="<c:if test="${not empty MENU_3.SUB }">child</c:if><c:if test="${MENU_3.MENU_NO eq param.MENU_ID }"> on</c:if>" <c:if test="${MENU_3.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
											<a href="${MENU_3.REAL_URL }" class="${MENU_3.MENU_NO }" title="<c:if test="${MENU_3.SETVAL eq '_blank'}">새창열림</c:if>" data-sub="${MENU_3.LINK_SUB_YN}" target="${MENU_3.SETVAL }"><span>${MENU_3.MENU_NM }</span></a>
											<c:if test="${not empty MENU_3.SUB }">
											<div class="group">
												<ul class="menuSS">
												<c:forEach var="MENU_4" items="${MENU_3.SUB }" >
													<li class="<c:if test="${MENU_4.MENU_NO eq param.MENU_ID }">on</c:if>" <c:if test="${MENU_4.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
														<a href="${MENU_4.REAL_URL }" class="${MENU_4.MENU_NO }" title="<c:if test="${MENU_4.SETVAL eq '_blank'}">새창열림</c:if>" target="${MENU_4.SETVAL }"><span>${MENU_4.MENU_NM }</span></a>
													</li>
												</c:forEach>
												</ul>
											</div>
											</c:if>
										</li>
									</c:forEach>
									</ul>
								</div>
								</c:if>
							</li>
						</c:forEach>
						</ul>
					</div>
					</c:if>
				</li>
			</c:forEach>
            </ul>
		</nav>

		<div class="gnb_util">
			<c:if test="${empty USER_INFO }">
			<button type="button" class="btn_login" title="로그인"><span>로그인</span></button>
			</c:if>
			<c:if test="${not empty USER_INFO }">
			<button type="button" class="btn_logout" title="로그아웃"><span>로그아웃</span></button>
			<a href="#;" class="btn_mypage" title="마이페이지"><span>마이페이지</span></a>
			</c:if>
			<button type="button" class="btn_sitemap" title="사이트맵">사이트맵</button>
		</div>

		<div class="mBtn">
			<button class="mBtn_close"><span>메뉴 닫기</span></button><!-- 모바일 전용 -->
		</div>
	</header>
</div>

<jsp:include page="./IncSitemap.jsp"/>

<hr />

<script src="/type/${TEMP_CD}/js/layout.js"></script><!-- layout -->