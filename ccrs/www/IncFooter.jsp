<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%--
 Class Name : IncFooter.jsp
 Description : Front 푸터 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 <script>
$(function(){
});
</script>
<%--<div id="footer">--%>
<%--	<footer>--%>
<%--		<div class="f_etc">--%>
<%--	        <div class="familySite">--%>
<%--	            <button type="button" class="btn_familysite" title="Alliance Site 펼치기">Alliance Site</button>--%>
<%--	            <ul class="list_familysite">--%>
<%--	            <c:forEach var="list" items="${footerLinkInfo }">--%>
<%--	                <li>--%>
<%--	                    <a href="${list.URL }" title="${list.TEXT }<c:if test="${list.SETVAL eq '_self'}"> 현재창</c:if> <c:if test="${list.SETVAL eq '_blank'}"> 새창</c:if> 이동" target="${list.SETVAL }">${list.TEXT }</a>--%>
<%--	                </li>--%>
<%--	            </c:forEach>--%>
<%--	            </ul>--%>
<%--	        </div>--%>
<%--	    </div>--%>

<%--		<c:if test="${not empty footerSiteInfo }">--%>
<%--		<ul class="f_menu">--%>
<%--			<c:forEach var="list" items="${footerSiteInfo }" varStatus="status">--%>
<%--				<li <c:if test="${list.ACCENT_YN eq 'Y' }">class="point"</c:if>><a href="${list.URL }" target="${list.SETVAL }" title="${list.TEXT }<c:if test="${list.SETVAL eq '_self'}"> 현재창 열림</c:if><c:if test="${list.SETVAL eq '_blank'}"> 새 창 열림</c:if>">${list.TEXT }</a></li>--%>
<%--			</c:forEach>--%>
<%--		</ul>--%>
<%--		</c:if>--%>

<%--		<c:if test="${not empty footerInfo }">--%>
<%--		<address>--%>
<%--			${footerInfo.CONTENTS }--%>
<%--		</address>--%>
<%--		</c:if>--%>

<%--		<c:if test="${not empty footerImgSiteInfo }">--%>
<%--		<div class="f_accessibility">--%>
<%--			<c:forEach var="list" items="${footerImgSiteInfo }" varStatus="status">--%>
<%--				<a href="${list.URL }" class="btn_wa" title="새 창 열림" target="${list.SETVAL }">--%>
<%--					<img src="/ajaxa/fileCpnt/fileView.do?gbn=f01&BASIC_SEQ=${list.BASIC_SEQ }&INFO_SEQ=${list.INFO_SEQ }" alt="${list.REP_TEXT }">--%>
<%--				</a>--%>
<%--			</c:forEach>--%>
<%--		</div>--%>
<%--		</c:if>--%>

<%--	</footer>--%>
<%--</div>--%>


<!-- Institution Links -->
<div class="institution-links">
	<img src="/ccrs/resources/images/bg/bg_links.png" alt="관련기관 배경">
	<div class="institution-carousel" style="display:none;">
		<!-- <div class="institution-item">
			<img src="" alt="관련기관1">
		</div>
		<div class="institution-item">
			<img src="" alt="관련기관2">
		</div>
		<div class="institution-item">
			<img src="" alt="관련기관3">
		</div>
		<div class="institution-item">
			<img src="" alt="관련기관4">
		</div>
		<div class="institution-item">
			<img src="" alt="관련기관5">
		</div>
		<div class="institution-item">
			<img src="" alt="관련기관6">
		</div> -->
	</div>
</div>
<!-- Footer -->
<footer class="footer">
	<img src="/ccrs/resources/images/bg/bg_footer.png" alt="푸터">
	<div class="container" style="display:none;">
		<div class="footer-content">
			<div class="footer-logo">
				<img src="https://via.placeholder.com/180x33/FFFFFF/EF8200?text=LOGO" alt="신용회복위원회">
			</div>
			<div class="footer-links">
<%--				<a href="#" class="footer-link important">개인정보처리방침</a>--%>
<%--				<a href="#" class="footer-link">신용정보 활용체제</a>--%>
<%--				<a href="#" class="footer-link">저작권보호정책</a>--%>
<%--				<a href="#" class="footer-link">이메일주소집단수집거부</a>--%>
				<c:forEach var="list" items="${footerSiteInfo }" varStatus="status">
					<a class="footer-link" href="${list.URL }" target="${list.SETVAL }" title="${list.TEXT }<c:if
									 test="${list.SETVAL eq '_self'}"> 현재창 열림</c:if><c:if test="${list.SETVAL eq '_blank'}"> 새 창 열림</c:if>">${list.TEXT }</a>
				</c:forEach>
			</div>
<%--			<div class="footer-info">--%>
<%--				<p><strong>주소</strong> : 04520 서울특별시 중구 세종대로 124 한국프레스센터 6~8층</p>--%>
<%--				<p><strong>대표번호</strong> : 1600-5500</p>--%>
<%--				<p>ⓒ 2025 신용회복위원회. All Rights Reserved.</p>--%>
<%--			</div>--%>
<%--			<div class="footer-contact">--%>
<%--				<p><strong>상담전화 운영시간</strong> : 평일 09시-18시</p>--%>
<%--				<p><strong class="phone-number">1600-5500</strong> (국내)</p>--%>
<%--				<p><strong>+82-2-6337-2000</strong> (해외)</p>--%>
<%--			</div>--%>
			${footerInfo.CONTENTS }
		</div>
	</div>
</footer>
