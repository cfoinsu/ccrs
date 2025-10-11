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

    
// Scroll to top functionality
$(window).scroll(function() {
	if ($(this).scrollTop() > 200) {
		if (!$('.scroll-to-top').length) {
			$('body').append(
				'<button class="scroll-to-top" style="position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; background: #f97316; border: none; border-radius: 50%; cursor: pointer; z-index: 999; font-size: 18px;"><img src="/type/www/img/icons/ico_go_top.svg" alt="맨 위로 가기" style="filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(132deg) brightness(103%) contrast(103%);"></button>'
			);
		}
		$('.scroll-to-top').fadeIn();
	} else {
		$('.scroll-to-top').fadeOut();
	}
});

$(document).on('click', '.scroll-to-top', function() {
	$('html, body').animate({scrollTop: 0}, 500);
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
// 팝업스크립트
const openYoutubeUrl = (url) => {
	if (!url) {
		url = "/index.do";
	}

	var name = 'workoutPopup';
	var specs = [
		'width=960',
		'height=600',
		'left=' + Math.max(0, (screen.width - 960) / 2),
		'top=' + Math.max(0, (screen.height - 600) / 2),
		'resizable=yes',
		'scrollbars=yes',
		'toolbar=no',
		'menubar=no',
		'location=no',
		'status=no'
	].join(',');

	var win = window.open(url, name, specs);
	if (win) {
		win.opener = null; // 보안 권장
		win.focus();
	} else {
		alert('팝업이 차단되었습니다. 팝업 허용 후 다시 시도하세요.');
	}
}
/**
 * 버튼 클릭 시 특정 URL로 이동하는 함수
 * @param {string} url - 이동할 웹 주소 (URL)
 */
function goToPage(url) {
    // window.location.href 속성에 원하는 URL을 할당하면
    // 브라우저는 해당 주소로 페이지를 이동(리디렉션)합니다.
    window.location.href = url;
}
$(function() {
  // 초기화: 첫번째 li만 "선택됨" 요소 추가
//   $('ul[role="tablist"] > li').each(function(idx){
//     var $btn = $(this).find('.btn-tab');
//     $btn.find('.sr-only.created').remove(); // 모두 삭제 후
//     if(idx === 0){
//       $btn.append('<i class="sr-only created">선택됨</i>');
//       $(this).addClass('active').attr('aria-selected', 'true');
//     } else {
//       $(this).removeClass('active').attr('aria-selected', 'false');
//     }
//   });

  // 탭 클릭 이벤트
  $('.search-list-top ul[role="tablist"] .btn-tab').on('click', function(e) {
    e.preventDefault();
    var $li = $(this).closest('li');

    // 모든 탭 비활성화 및 "선택됨" 요소 삭제
    $li.siblings('li').each(function(){
      $(this).removeClass('active').attr('aria-selected', 'false');
      $(this).find('.btn-tab .sr-only.created').remove();
    });

    // 선택된 탭에 "선택됨" 추가 및 활성화
    $li.addClass('active').attr('aria-selected', 'true');
    var $btn = $li.find('.btn-tab');
    $btn.find('.sr-only.created').remove();
    $btn.append('<i class="sr-only created">선택됨</i>');
  });
});