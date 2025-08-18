<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%--
 Class Name : Templete.jsp
 Description : Front 본문 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<!DOCTYPE html>
<html lang="ko">
<head>
<jsp:include page="./IncHeaderS.jsp"/>
</head>
<body class="typeSub<c:if test="${not empty USER_INFO }"> typeLogin</c:if> reN">
<%--	<jsp:include page="./IncTop.jsp"/>--%>
    
<%--	<jsp:include page="./IncTopSection.jsp"/>--%>

<div id="Wrap">

<jsp:include page="./IncSnb.jsp"/>

	<!-- container -->
<%--	<div id="container">--%>
<main class="main-content" id="main-content">
	<div class="container">
<%--		<jsp:include page="./IncSnb.jsp"/>--%>
<%--		<div id="contents">--%>
<%-- 			<jsp:include page="./IncPnb.jsp"/>--%>
			<c:if test="${TAB_YN eq 'Y' }">

           	<div id="pageTab">
           		<ul class="tabList tab${fn:length(tabList) }">
               	<c:forEach var="list" items="${tabList }" >
	               	<c:if test="${list.CONT_TYPE eq 'C0203' || list.CONT_TYPE eq 'C0205' }">
	               	<li><a href="${list.LINK_URL }" target="${list.SETVAL }" <c:if test="${CONTENTS_NO eq list.CONTENTS_NO }"> title="선택됨" class="on"</c:if>>${list.CONTENTS_TITLE }</a></li>
            		</c:if>
               		<c:if test="${list.CONT_TYPE ne 'C0203' && list.CONT_TYPE ne 'C0205' }">
               		<c:if test="${empty BASE_PATH }">
               			<li><a href="/cms/com/index.do?MENU_ID=${param.MENU_ID}&CONTENTS_NO=${list.CONTENTS_NO }" <c:if test="${CONTENTS_NO eq list.CONTENTS_NO }"> title="선택됨" class="on"</c:if>>${list.CONTENTS_TITLE }</a></li>
               		</c:if>
               		<c:if test="${not empty BASE_PATH }">
	               		<li><a href="${BASE_PATH }/cms/com/index.do?MENU_ID=${param.MENU_ID}&CONTENTS_NO=${list.CONTENTS_NO }" <c:if test="${CONTENTS_NO eq list.CONTENTS_NO }"> title="선택됨" class="on"</c:if>>${list.CONTENTS_TITLE }</a></li>
               		</c:if>
               		</c:if>
               	</c:forEach>
               </ul>
           	</div>
			</c:if>
			
			<c:if test="${not empty contsInfo && not empty contsInfo.HEAD_CONTENTS }">
			<c:out value="${contsInfo.HEAD_CONTENTS }" escapeXml="false"/>
			</c:if>

			<div class="content-layout">
	            <jsp:include page="./Contents.jsp"/>
<%--	            <jsp:include page="./ContentsTest.jsp"/>--%>
			</div>
			
			<c:if test="${not empty footContentInfo && not empty footContentInfo.FOOT_CONTENTS }">
				<div class="pageBtm_bnr">
					<c:out value="${footContentInfo.FOOT_CONTENTS }" escapeXml="false"/>
				</div>
			</c:if>
	</div>
</main>
		
<%--	</div>--%>
<%--	<button type="button" id="btn_top">TOP</button>--%>

	<!-- Quick Menu -->
	<div class="quick-menu">
		<div class="quick-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M8 12h8M8 8h8M8 16h8" stroke="currentColor" stroke-width="1.5"/>
			</svg>
			<span>상담신청</span>
		</div>
		<div class="quick-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
				<path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5"/>
			</svg>
			<span>자주 묻는<br>질문</span>
		</div>
		<div class="quick-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M9 11l3 3 8-8" stroke="currentColor" stroke-width="1.5"/>
			</svg>
			<span>간편진단</span>
		</div>
		<div class="quick-item">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.5"/>
			</svg>
			<span>협약가입<br>금융사</span>
		</div>
		<div class="quick-notification">
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
				<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#F48F01" stroke-width="1.5"/>
			</svg>
		</div>
	</div>

	<jsp:include page="./IncFooter.jsp"/>

</div>

<script src="/ccrs/resources/js/common.js"></script>
<script src="/ccrs/resources/js/layout.js"></script>
<script src="/ccrs/resources/js/script.js"></script>
</body>
</html>