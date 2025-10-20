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

$(document).ready(function () {
    $(".quick-chat").on("click", function (e) {
        e.preventDefault();
        var url = 'https://ichat.ccrs.or.kr/ichat/ichat.do?type=a&device=web';
        var win = window.open(url, 'popup', 'width=540,height=820,location=no,scrollbar=yes,resizable=yes');
    });
	
	$('.quick-item.book').click(function() {
		$(this).toggleClass('on');
	})
});
$(document).ready(function() {
    $('.appdown').on('click', function() {
        // 이미 공유하기 팝업이 있는지 확인
        const $linkHtml = $(this).next('.item-share');

        // 팝업이 존재하지 않으면 생성하여 삽입
        if ($linkHtml.length === 0) {
            const linkHtml = `
                <div class="item-share active">
                    <strong class="section-subtit">앱 다운로드</strong>
                    <div class="g-qr-box">
                        <div class="qr-box">
                            <p class="font-bold">구글 플레이</p>
                            <img src="/type/www/img/contents/png/qr-googleplay.png">
                        </div>
                        <div class="qr-box">
                            <p class="font-bold">앱 스토어</p>
                            <img src="/type/www/img/contents/png/qr-appstore.png">
                        </div>
                    </div>
                    <button type="button" class="btn-close">
                        <span class="sr-only">앱 다운로드 닫기</span>
                    </button>
                </div>`;
            
            // 현재 클릭된 요소 바로 뒤에 삽입
            $(this).after(linkHtml);

            // 삽입 후 닫기 버튼에 이벤트 리스너 추가 (옵션)
            // 닫기 버튼을 클릭했을 때 팝업을 닫고 버튼의 active 클래스 제거
            $(this).next('.item-share').find('.btn-close').on('click', function() {
                $(this).closest('.item-share').remove();
            });
        } 
    });



    $('[aria-label="공유"]').on('click', function() {
        // 이미 공유하기 팝업이 있는지 확인
        const $sharePopup = $(this).next('.item-share');

        // 팝업이 존재하지 않으면 생성하여 삽입
        if ($sharePopup.length === 0) {
            const shareHtml = `
                <div class="item-share">
                    <strong class="section-subtit">공유하기</strong>
                    <div class="sns-type">
                        <a href="javascript:;" class="_btnFacebook" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_facebook.svg" alt="">
                            </i> 
                            <span>페이스북</span>
                        </a>
                        <a href="javascript:;" class="_btnX" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_x.svg" alt="">
                            </i> 
                            <span>X</span>
                        </a>
                        <a href="javascript:;" class="_btnKakao" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_kakao.svg" alt="">
                            </i> 
                            <span>카카오스토리</span>
                        </a>
                        <a href="javascript:;" class="_btnBand" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_band.svg" alt="">
                            </i> 
                            <span>네이버밴드</span>
                        </a>
                        <a href="javascript:;" class="_btnBlog" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_blog.svg" alt="">
                            </i> 
                            <span>네이버블로그</span>
                        </a>
                        <a href="javascript:;" class="_btnTumblr" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_tumblr.svg" alt="">
                            </i> 
                            <span>텀블러</span>
                        </a>
                        <a href="javascript:;" class="_btnPinter" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_pinter.svg" alt="">
                            </i> 
                            <span>핀터레스트</span>
                        </a>
                        <a href="javascript:;" class="_btnInsta" title="새창열림">
                            <i class="icon" aria-hidden="true">
                                <img src="/type/www/img/icons/icon_logo_insta.svg" alt="">
                            </i> 
                            <span>인스타그램</span>
                        </a>
                    </div>
                    <button type="button" class="btn-close">
                        <span class="sr-only">공유하기 닫기</span>
                    </button>
                </div>`;
            
            // 현재 클릭된 요소 바로 뒤에 삽입
            $(this).after(shareHtml);

            // 삽입 후 닫기 버튼에 이벤트 리스너 추가 (옵션)
            // 닫기 버튼을 클릭했을 때 팝업을 닫고 버튼의 active 클래스 제거
            $(this).next('.item-share').find('.btn-close').on('click', function() {
                $(this).closest('.item-share').remove();
                $('[aria-label="공유"]').removeClass('active'); // 공유 버튼의 active 클래스 제거
            });
        } 
        
        // 클릭된 버튼의 active 클래스 토글 (팝업 표시/숨김용)
        $(this).toggleClass('active');

        // 생성된(또는 이미 존재하는) 팝업을 토글
        $(this).next('.item-share').toggleClass('active');
    });
	$('.item-share .btn-close').on('click', function() {
		$(this).closest('.item-share').removeClass('active');
		$('[aria-label="공유"]').removeClass('active');
	});

    // 참고: 위 코드는 팝업을 '생성'하고 '토글'하는 로직을 모두 포함하고 있습니다.
    // 만약 HTML에 팝업이 미리 존재하고 단순히 '클래스 토글'만 하고 싶다면 아래 코드가 더 간단합니다.

    /*
    // 팝업이 이미 HTML에 존재한다고 가정할 경우의 간결한 jQuery 코드:
    $('[aria-label="공유"]').on('click', function() {
        $(this).toggleClass('active');
        $(this).next('.item-share').toggleClass('active');

        // 팝업 내 닫기 버튼 이벤트 처리
        $(this).next('.item-share').find('.btn-close').on('click', function() {
            $(this).closest('.item-share').removeClass('active');
            $('[aria-label="공유"]').removeClass('active');
        });
    });
    */
});
$(document).ready(function() {
    // 1. URL 및 제목 정의
    const rawCurrentUrl = window.location.href; // 인스타그램 복사용 원본 URL
    const currentUrl = encodeURIComponent(rawCurrentUrl);
    const currentTitle = encodeURIComponent(document.title);
    const popupOption = '_blank';

    // 2. URL 복사 기능 함수 (재사용)
    function copyToClipboard(text) {
        if (!navigator.clipboard) {
            // Fallback: 구형 브라우저
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                return true;
            } catch (err) {
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        } else {
            // 최신 API: HTTPS 환경 권장
            navigator.clipboard.writeText(text).then(() => {
                // 복사 성공 (처리)
            }, (err) => {
                console.error('클립보드 복사 실패:', err);
            });
            return true;
        }
    }

    // 3. SNS 공유 로직 함수
    function shareToSNS(snsType) {
        let shareUrl = '';

        switch (snsType) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                break;
            case 'x':
                shareUrl = `https://twitter.com/intent/tweet?text=${currentTitle}&url=${currentUrl}`;
                break;
            case 'kakaostory':
                shareUrl = `https://story.kakao.com/share?url=${currentUrl}`;
                break;
            case 'band':
                shareUrl = `https://band.us/plugin/share?body=${currentTitle}%0A${currentUrl}&route=BAND`;
                break;
            case 'blog':
                shareUrl = `https://share.naver.com/web/shareView?url=${currentUrl}&title=${currentTitle}`;
                break;
            case 'tumblr':
                shareUrl = `https://www.tumblr.com/widgets/share/tool?posttype=link&canonicalUrl=${currentUrl}&title=${currentTitle}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${currentUrl}&description=${currentTitle}`;
                break;
            case 'insta':
                // 인스타그램 특수 처리: URL 복사 후 인스타그램 홈으로 이동
                if (copyToClipboard(rawCurrentUrl)) {
                    // 복사에 성공하면 사용자에게 안내합니다. (복사 성공 여부 확인용)
                    // 복사가 비동기로 이루어질 수 있지만, 일단 안내 후 이동합니다.
                    alert('현재 페이지 URL이 복사되었습니다. 인스타그램 게시물에 붙여넣어 공유해 주세요! ✨');
                } else {
                    alert('URL 복사에 실패했습니다. 직접 주소창의 URL을 복사해 주세요.');
                }
                
                // 인스타그램 웹사이트 또는 모바일 앱 URI로 이동합니다.
                // 새 탭에서 열어 기존 페이지를 유지합니다.
                window.open('https://www.instagram.com/', '_blank');
                return; // 팝업 로직을 실행하지 않고 종료

            default:
                return;
        }

        // 새 창 팝업 (인스타그램 제외한 SNS)
        window.open(shareUrl, 'snsSharePop', popupOption);
    }

    // 4. 각 버튼에 클릭 이벤트 연결 (이전과 동일)
    // 동적으로 생성된 요소에도 이벤트가 적용되도록 $('body').on('click', ...) 사용
    $('body').on('click', '._btnFacebook, ._btnX, ._btnKakao, ._btnBand, ._btnBlog, ._btnTumblr, ._btnPinter, ._btnInsta', function(e) {
        e.preventDefault();
        
        let snsType = '';
        if ($(this).hasClass('_btnFacebook')) snsType = 'facebook';
        else if ($(this).hasClass('_btnX')) snsType = 'x';
        else if ($(this).hasClass('_btnKakao')) snsType = 'kakaostory';
        else if ($(this).hasClass('_btnBand')) snsType = 'band';
        else if ($(this).hasClass('_btnBlog')) snsType = 'blog';
        else if ($(this).hasClass('_btnTumblr')) snsType = 'tumblr';
        else if ($(this).hasClass('_btnPinter')) snsType = 'pinterest';
        else if ($(this).hasClass('_btnInsta')) snsType = 'insta';
        
        if (snsType) {
            shareToSNS(snsType);
        }
    });
});