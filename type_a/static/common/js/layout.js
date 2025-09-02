/* 헤더 스크립트:s */
$(window).scroll(function () {
	if ($(this).scrollTop() > 150) {
		$("#header").addClass("is-hide");
	} else {
		$("#header").removeClass("is-hide");
	}
});

//헤더메뉴 dropdown, focus 이벤트
$(function () {
	$(".gnb").on("mouseenter focusin", function () {
		$(this).parents("#header").addClass("is-active");
	});

	$("#header").on("mouseleave", function () {
		$(this).removeClass("is-active");
	});

	$('.gnb > li').on('mouseenter focusin', function () {
		$(this).addClass('is-active');
	});

	$('.gnb > li').on('mouseleave focusout', function () {
		$(this).removeClass('is-active');
	});

//전체메뉴 click, hover 이벤트
$(".hamburger-wrap").click(function () {
	$(this).find('.hamburger').toggleClass("is-active");
	$('.all-menu').toggleClass('is-active');
	if($('.all-menu').hasClass("is-active")){
		$(this).attr("title","대메뉴 닫기");
	}else{
		$(this).attr("title","대메뉴 열기");
	}
});

$(".all-menu-list > li").hover(function (e) {
	if (e.type === "mouseenter") {
		$(this).parent().addClass("darken");
		$(this).addClass("highlight").siblings().removeClass("highlight");
	}
});

$(".depth3").hover(function (e) {
	$(".depth3").removeClass("focus");
	$(this).addClass("focus");
	});
	if ($(window).width() < 1279) {
		mobileMenu();
	}
	//검색버튼 click 이벤트
	$('.search-open').on('click', function (e) {
		$("#searchTag").addClass('is-active');
	})
	$('#searchTag > .btn-close').on('click', function (e) {
		$("#searchTag").removeClass('is-active');
	})
});

//전체메뉴 모바일 애니메이션
function addListenerMulti(element, eventNames, listener) {
	var events = eventNames.split(' ');
	for (var i = 0, iLen = events.length; i < iLen; i++) {
	  element.addEventListener(events[i], listener, false);
	}
};

function mobileMenu() {
	if ($(window).width() < 1279) {
		$(".all-menu-list>li>a.depth1").on('click', function () {
			$(this).attr("href", "javascript:void(0)").next().stop(true, false).slideToggle(500);
			$(this).parent().siblings().find(".depth2").stop(true, false).slideUp(500);
	});
	} else {
		$(".all-menu-list").find(".depth2").attr("style", "");
		$(".all-menu-list>li>a.depth1").off("click");
	}

	$(".hamburger").on("click", function () {
		if (!$(this).hasClass("is-active")) {
			$("#wrap").css("height", "100vh");

			addListenerMulti(window, 'scroll, touchmove, touchstart, mousewheel', function (e) {
				e.preventDefault();
				e.stopPropagation();
			}, { passive: true })
		} else {
			$("#wrap").css("height", "inherit");
			$("html body").off("scroll touchmove touchstart mousewheel");
		}
	});
};

/* 헤더 스크립트:e */

/* 푸터 스크립트:s */
//TOP버튼 애니메이션
$(window).scroll(function () {
	if ($(this).scrollTop() > 800) {
		$(".topbtn").addClass("show");
		$(".btn-scroll").css("margin-bottom", "120px");
	} else {
		$(".topbtn").removeClass("show");
		$(".btn-scroll").css("margin-bottom", "60px");
	}
});

$(function () {
    var topEle = $('.topbtn');
    topEle.on('click', function() {
    $('html, body').stop().animate({scrollTop: 0});
    });
});

////패밀리사이트 클릭이벤트
//$(function () {
//	$(".family-list").hide();
//	$(".family").click(function () {
//		$(this).find(".family-list").slideToggle();
//		$(this).find(".family-list").toggleClass("on");
//	});
//});
//패밀리사이트 클릭이벤트
$(function () {
	$(".family-list").hide();
	$(".family-tag").click(function () {
		$(".family-list").slideToggle();
		$(".family-list").toggleClass("on");
	});
});

//패밀리사이트 hover 이벤트
$(function () {
	$(".family-list-item").find("li").hover(function () {
		$(this).toggleClass("is-active");
	});

	$(".family-list-item").hover(function () {
		$(this).toggleClass("highlight");
	});
});
/* 푸터 스크립트:e */