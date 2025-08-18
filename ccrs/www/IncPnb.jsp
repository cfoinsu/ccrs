<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!-- <script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script> -->
<%--
 Class Name : IncPnb.jsp
 Description : PNB영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<script>
$(function(){
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
<div id="pnb">
    <div class="pnb_menu">
    
        <!-- 메뉴리스트로 있을때 -->
        <div class="pnbList">
            <div class="menu">
                <button type="button" class="btnTit">${thisMenu.MENU_NM }</button>
                <c:if test="${not empty siblingMenu }">
                <ul>
                	<c:forEach var="list" items="${siblingMenu }" >
                    <li><a href="#;" data-menuno="${list.MENU_NO }" title="현재창 이동" target="_self">${list.MENU_NM }</a></li>
                	</c:forEach>
                </ul>
                </c:if>
            </div>
        </div>
    </div>

    <div class="pnb_func">
    	<c:if test="${sProgramNo ne '8' }">
	        <button type="button" class="btn_print" title="프린트">프린트</button>
	        <button type="button" class="btn_share" title="공유하기">공유</button>
	    </c:if>
        <c:if test="${not empty USER_INFO && sProgramNo ne '8' }">
        	<%-- <button type="button" class="btn_bookmark <c:if test="${not empty bookmarkYn && bookmarkYn eq 'Y'}">on</c:if>" value="${bookmarkYn}" title="북마크설정">북마크</button> --%>
        </c:if>
        <!-- 공유박스 -->
        <div class="shareBox">
            <div class="shareBox_wrap">
                <strong>공유하기</strong>
                <ul>
                    <li><a href="#;" class="btn_facebook" onclick="shareSns('facebook');" title="새 창 열림">페이스북</a></li>
                    <li><a href="#;" class="btn_twitter" onclick="shareSns('twitter');" title="새 창 열림">트위터</a></li>
                    <li><a href="#;" id="kakao-link-btn" class="btn_kakaotalk" title="새 창 열림">카카오톡</a></li>
                    <li><a href="#;" class="btn_nBlog" onclick="shareSns('blog');" title="새 창 열림">네이버블로그</a></li>
                    <li class="etc">
                        <input type="text" id="copyUrl" title="복사할 URL" />
                        <button type="button" class="btn_urlCopy">URL 복사</button>
                    </li>
                </ul>
                <button type="button" class="btn_close">닫기</button>
            </div>
        </div>
        <!-- //공유박스 -->
    </div>
</div>