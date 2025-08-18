<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
 Class Name : IncSitemap.jsp
 Description : 사이트맵 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<script>
$(function(){
	$('.sitemapBox_reN #sitemap>li').attr('tabindex','0')

	// 포커스 시 초점 이동 막기
	$.fn.focusWithoutScrolling = function(){
		var x = window.scrollX, y = window.scrollY;
		this.focus();
		window.scrollTo(x, y);
		return this; //chainability
	};

	$(".sitemapBox_reN .map_nav").mCustomScrollbar();
	
	$(".sitemapBox_reN .map_gnb>li>a").click(function(){
		var mapGnb_num = $(this).parent('li').index();
		$(".sitemapBox_reN .map_gnb>li>a").removeClass('on');
		$(".sitemapBox_reN .map_gnb>li>a").attr('title','');
		$(this).addClass('on');
		$(this).attr('title','선택됨');

		$(".sitemapBox_reN .map_nav").mCustomScrollbar("scrollTo", $(".sitemapBox_reN").find('.mCSB_container').find('#sitemap>li:eq(' +mapGnb_num+')'));
	});
});
</script>

<section class="sitemapBox_reN">
	<h2 class="txtHidden">사이트맵</h2>
    <div class="sitemap_wrap">
    
    	<ul class="map_gnb">
		<c:forEach var="MENU_1" items="${menuMap.SUB }" varStatus="status">
			<li <c:if test="${MENU_1.SHOW_YN ne 'Y' }">style="display : none;"</c:if>><a href="#" title="${MENU_1.MENU_NM }" <c:if test="${curMenu_1.MENU_NO eq MENU_1.MENU_NO}">class="on"</c:if>>${MENU_1.MENU_NM }</a></li>
        </c:forEach>
        </ul>

        <div class="box_ct">
            <div class="map_nav">
                <ul id="sitemap">
 				<c:forEach var="MENU_1" items="${menuMap.SUB }">
  					<c:if test="${MENU_1.SHOW_YN eq 'Y' }">
	                    <li <c:if test="${not empty MENU_1.SUB }">class="child"</c:if> <c:if test="${MENU_1.SHOW_YN ne 'Y' }">style="display : none;"</c:if>><a href="#none">${MENU_1.MENU_NM }</a>
		 					<c:if test="${not empty MENU_1.SUB }">
	    					<ul class="menuM">
	    						<c:forEach var="MENU_2" items="${MENU_1.SUB }" >
	    						<li <c:if test="${not empty MENU_2.SUB }">class="child"</c:if> <c:if test="${MENU_2.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
	    							<a href="${MENU_2.REAL_URL }"  title="${MENU_2.MENU_NM }<c:if test="${MENU_2.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${MENU_2.SETVAL eq '_blank'}"> 새창</c:if> 이동" data-sub="${MENU_2.LINK_SUB_YN}" target="${MENU_2.SETVAL }">
	    								<span>${MENU_1.MENU_NM } - ${MENU_2.MENU_NM }</span>
	    							</a>
	    							<c:if test="${not empty MENU_2.SUB }">
	    							<ul class="menuS">
	    							<c:forEach var="MENU_3" items="${MENU_2.SUB }" >
	    								<li <c:if test="${not empty MENU_3.SUB }">class="child"</c:if> <c:if test="${MENU_3.SHOW_YN ne 'Y' }">style="display : none;"</c:if>>
	    									<a href="${MENU_3.REAL_URL }" title="<c:if test="${MENU_3.SETVAL eq '_blank'}">새창열림</c:if>" data-sub="${MENU_3.LINK_SUB_YN}" target="${MENU_3.SETVAL }"><span>${MENU_3.MENU_NM }</span></a>
	    									<c:if test="${not empty MENU_3.SUB }">
	    									<ul class="menuSS">
	    									<c:forEach var="MENU_4" items="${MENU_3.SUB }" >
	    										<li<c:if test="${MENU_4.SHOW_YN ne 'Y' }"> style="display : none;"</c:if>>
													<a href="${MENU_4.REAL_URL }" title="<c:if test="${MENU_4.SETVAL eq '_blank'}">새창열림</c:if>" target="${MENU_4.SETVAL }"><span>${MENU_4.MENU_NM }</span></a>
												</li>
	    									</c:forEach>
	    									</ul>
	    									</c:if>
	    								</li>
	    							</c:forEach>
	    							</ul>
	    							</c:if>
	    						</li>
	    						</c:forEach>
	    					</ul>
		    				</c:if>
	    				</li>
    				</c:if>
    			</c:forEach>
    			</ul>
            </div>
            <div class="map_func">

            </div>
        </div>

        <button type="button" class="btn_close"><span class="txtHidden">닫기</span></button>
    </div>
</section>