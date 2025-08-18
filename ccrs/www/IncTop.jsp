<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%--
 Class Name : IncTop.jsp
 Description : 탑 메뉴 영역
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
<script>
	var gnbDep1 = 0;
	var gnbDep2 = 0;
	var gnbDep3 = 0;
	var gnbDep4 = 0;

$(function(){

	$('.mTopNotice .innerCont').not('.slick-initialized').slick({
		speed : 300,
		dots: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		infinite: true,
		// 21-11-24 추가
		autoplay:true
	});
	
	/* 21-11-15 탑배너 버튼 추가 1 */
	if( $(".mTopNotice .slick-arrow").length < 1 ){
		$(".mTopNotice .list_control").removeClass('on')
	}else{
		$(".mTopNotice .list_control").addClass('on')
	}

	$(".mTopNotice .list_control>button").click(function(){
		if($(this).hasClass('btn_pause')){
			$(".mTopNotice .slick-slider").slick('slickPause');
			$(this).attr('class','btn_play').text('재생');
		}else{
			$(".mTopNotice .slick-slider").slick('slickPlay');
			$(this).attr('class','btn_pause').text('일시정지');
		}
	});
	/* //21-11-15 탑배너 버튼 추가 1 */

	//상단공지 닫기
	$(document).on("click", ".mTopNotice .closedArea .closedBtn", function(e){
		if($("input[name=dream_top_cls]").prop("checked")){
			setCookie("dream_top_cls","done",1);
		}
		$("body").removeClass("typeTopNotice");
		$(".mTopNotice").hide();
	});

	<c:if test="${not empty mainTopBannerList}">
		if(getCookie("dream_top_cls") != "done"){
			$(".mTopNotice").css('display', 'inline-block');
			$(".typeMain").addClass("typeTopNotice");
		}else{
			$(".mTopNotice").hide();
			$(".typeMain").removeClass("typeTopNotice");
		}
	</c:if>
	<c:if test="${empty mainTopBannerList}">
			$(".mTopNotice").hide();
			$(".typeMain").removeClass("typeTopNotice");
	</c:if>
});

</script>
<div id="skip_menu">
	<a href="#contents">본문 바로가기</a>
	<a href="#header">주메뉴 바로가기</a>
	<a href="#footer">푸터 바로가기</a>
</div>

<div id="dim"></div>
<div id="gnb_dim"></div>

<c:if test="${not empty mainTopBannerList}">
	<!-- 상단공지 -->
	<div class="mTopNotice" style="display:none;">
		<div class="innerCont">
			<c:forEach var="list" items="${mainTopBannerList}">
				<div class="unit">
					<!-- 일반 -->
					<a href="${list.LINK_URL}" target="${list.WINDOW_YN}" title="새 창 열림" class="Alert">
						<img src="/type/news/img/layout/icon_mTopNotice_Alert${list.CMN_VALUE}.png" alt="">
						<p><c:out value="${list.CONTENTS}"/></p>
						<span>자세히보기</span>
					</a>
				</div>
			</c:forEach>
		</div>
		<span class="list_control on">
			<button type="button" class="btn_pause">일시정지</button>
		</span>
		
		<div class="closedArea">
			<input type="checkbox" name="dream_top_cls" id="dream_top_cls"/>
			<i></i>
			<label class="todayCk" for="dream_top_cls">
				<span>오늘 하루 열지 않기</span>
			</label>
			<button type="button" class="closedBtn">닫기</button>
		</div>
		
	</div>
	<!-- //상단공지 -->
</c:if>
