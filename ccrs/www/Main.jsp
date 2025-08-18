<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page trimDirectiveWhitespaces="true" %>

<%--
 Class Name : Main.jsp
 Description : Front 메인 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<!DOCTYPE html>
<html lang="ko">
<head>
<jsp:include page="./IncHeaderM.jsp"/>
<script>
$(function(){
    //해당 팝업 닫기
	$(document).on('click', '.mPopZone .closedArea .closedBtn', function(){
		$(this).parents('div.pop_admin').remove();
		if($('.mPopZone > .pop_admin').length == 0){
			$('.mPopZone').remove();
		}
	});
});

/************************************************************************
* 함수명 : 
* 설 명 : 메인 로딩 시 팝업 여부 확인 및 동작
* 인 자 :
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2022.07.01 bvs 최초생성
************************************************************************/
window.onload = function () {
	 <c:if test="${not empty mainPopList }">
	 	<c:forEach var="cookiePop" items="${mainPopList}">
 	 	if ("${cookiePop.NOTOPEN_YN}" == 'Y') {
		 	if(getCookie("pop_${cookiePop.POPUP_SEQ}") != "done"){
		 		$("#pop_${cookiePop.POPUP_SEQ}").css('display', 'inline-block');
		   	}else{
		   		$("#pop_${cookiePop.POPUP_SEQ}").remove();
		   	}				
		}else {
			$("#pop_${cookiePop.POPUP_SEQ}").css('display', 'inline-block');
		}
 		</c:forEach>
		if($('.mPopZone > .pop_admin').length == 0){
			$('.mPopZone').remove();
		}
	</c:if>
}

/************************************************************************
* 함수명 : fn_closePop
* 설 명 :  팝업 닫기
* 인 자 : obj
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2022.07.01 bvs 최초생성
************************************************************************/
function fn_closePop(obj){
	setCookie($(obj).parents("div.pop_admin").attr("id"),"done",1);
    $(obj).parents("div.pop_admin").remove();
	if($('.mPopZone > .pop_admin').length == 0){
		$('.mPopZone').remove();
	}
}

</script>
</head>
<body class="typeMain<c:if test="${not empty USER_INFO }"> typeLogin</c:if><c:if test="${not empty mainTopBannerList}"> typeTopNotice</c:if>">
<jsp:include page="./IncTop.jsp"/>
<jsp:include page="./IncTopSection.jsp"/>

<!-- 메인팝업  -->
<c:if test="${not empty mainPopList }">
	<div id="mainPop" class="mPopZone">
		<c:forEach var="popList" items="${mainPopList }">
			<div id="pop_${popList.POPUP_SEQ }" class="pop_admin" style="display:none; width:${popList.SIZE_WIDTH}px; height:${popList.SIZE_HEIGHT }px; top:${popList.POP_TOP}px; left:${popList.POP_LEFT}px;">
				<div class="pop_ct">
					<p>${popList.CONTENTS }</p>
				</div>
				<div class="closedArea">
				<c:if test="${popList.NOTOPEN_YN eq 'Y' }">
					<span class="inp_c" onclick="fn_closePop(this);">
						<input type="checkbox" name="inp_c1" id="inp_c1_${popList.POPUP_SEQ }" class="closChk" />
						<label>오늘 하루 열지 않기</label>
					</span>
				</c:if>
					<button type="button" class="closedBtn"><span>팝업 닫기</span></button>
				</div>
			</div>
		</c:forEach>
	</div>
</c:if>
<!-- 메인팝업  -->

	<div id="container">
	    <div id="contents">
	    </div>
	</div>
	<!-- //container -->
<jsp:include page="./IncFooter.jsp"/>
</body>
</html>