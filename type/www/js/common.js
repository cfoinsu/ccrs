//aos init
// AOS.init({
//     duration: 600,
//     easing: "ease",
//     offset: 0,
// });

/**
 * Common JavaScript functions for Korean pages
 * 국문 페이지 공통 기능
 */
$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();

    // Initialize institution carousel
    initInstitutionCarousel();
});

/**
 * Initialize support content toggle functionality
 * 지원내용 토글 버튼 초기화
 */
function initSupportContentToggle() {
    const $toggleBtn = $('#toggleButton');
    const $toggleText = $('#toggleText');
    const $arrowIcon = $('#arrowIcon');
    const $separator = $('#separator');
    const $support = $('#supportContent');

    // Only initialize if toggle button exists on the page
    if ($toggleBtn.length === 0) {
        return;
    }

    // Click event handler
    $toggleBtn.on('click', function() {
        // Toggle class and check current state
        const isOpen = $support.toggleClass('open').hasClass('open');

        // Update UI based on open/closed state
        if (isOpen) {
            $toggleText.text('지원내용 닫기');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show(); // display:block
        } else {
            $toggleText.text('지원내용 보기');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide(); // display:none
        }
    });
}

/**
 * Institution Carousel Swiper Initialization
 * 관련기관 캐러셀 초기화
 *
 * This function should be called after the footer HTML is loaded
 * Footer 로드 후 호출해야 함
 */
function initInstitutionCarousel() {
    // Swiper 요소 확인
    var swiperElement = document.querySelector('.institution-carousel-swiper');
    if (!swiperElement) {
        console.warn('Institution carousel element not found');
        return;
    }

    // Swiper 라이브러리 확인
    if (typeof Swiper === 'undefined') {
        console.error('Swiper library not loaded');
        return;
    }

    try {
      var institutionSwiper = new Swiper('.institution-carousel-swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        watchOverflow: true,
        centeredSlides: false,
        slideToClickedSlide: false,
        navigation: {
          nextEl: '.institution-nav-btn.next',
          prevEl: '.institution-nav-btn.prev',
        },
        breakpoints: {
          744: {
            slidesPerView: 2,
            loop: true,
            loopedSlides: 12,
          },
          768: {
            slidesPerView: 3,
            loop: true,
            loopedSlides: 12,
          },
          1024: {
            slidesPerView: 4,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 40,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          },
          1440: {
            slidesPerView: 6,
            spaceBetween: 64,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          },
          1920: {
            slidesPerView: 6,
            spaceBetween: 64,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          },
        },
      });

      // 초기화 후 위치 조정 (모바일에서 transform 문제 해결)
      if (institutionSwiper) {
        // 모바일에서 슬라이드 너비 재계산
        var isMobile = window.innerWidth <= 767;
        if (isMobile) {
          // 슬라이드 너비를 컨테이너 너비로 강제 설정
          var swiperContainer = document.querySelector('.institution-carousel-swiper');
          if (swiperContainer) {
            var containerWidth = swiperContainer.offsetWidth;
            var slides = swiperContainer.querySelectorAll('.swiper-slide');
            slides.forEach(function (slide) {
              slide.style.width = containerWidth + 'px';
            });
          }
        }
        institutionSwiper.update();
        institutionSwiper.slideTo(0, 0);

        // resize 이벤트에서도 업데이트
        var resizeTimer;
        window.addEventListener('resize', function () {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function () {
            if (window.innerWidth <= 767 && institutionSwiper) {
              var swiperContainer = document.querySelector('.institution-carousel-swiper');
              if (swiperContainer) {
                var containerWidth = swiperContainer.offsetWidth;
                var slides = swiperContainer.querySelectorAll('.swiper-slide');
                slides.forEach(function (slide) {
                  slide.style.width = containerWidth + 'px';
                });
              }
              institutionSwiper.update();
            }
          }, 250);
        });
      }

      // Pause/Play 버튼 기능
      var pauseBtn = document.querySelector('.institution-nav-btn.pause');
      var isPaused = false;

      if (pauseBtn) {
        pauseBtn.addEventListener('click', function () {
          if (isPaused) {
            institutionSwiper.autoplay.start();
            this.innerHTML = '<i class="las la-pause"></i>';
            this.setAttribute('aria-label', '일시정지');
            isPaused = false;
          } else {
            institutionSwiper.autoplay.stop();
            this.innerHTML = '<i class="las la-play"></i>';
            this.setAttribute('aria-label', '재생');
            isPaused = true;
          }
        });
      }

      return institutionSwiper;
    } catch (error) {
        console.error('Failed to initialize institution carousel:', error);
        return null;
    }
}

////패밀리사이트 클릭이벤트
//$(function () {
//	$(".family-list").hide();
//	$(".family").click(function () {
//		$(this).find(".family-list").slideToggle();
//		$(this).find(".family-list").toggleClass("on");
//	});
//});
//툴팁작업 클릭이벤트
$(function () {
	$(".clickon").click(function () {
		$(this).next(".item-share").toggleClass("active");
	});
});
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
// 탭 클릭 이벤트
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

/**
 * Open privacy policy popup
 * 개인정보처리방침 팝업 열기
 * @param {string} type - Popup type (ITEM, OFFER, ENTRUST, ALIAS)
 */
function searchPop(type) {
  const popupUrls = {
    'ITEM': '/html/popup/item.html',        // 처리하는 개인정보 항목
    'OFFER': '/html/popup/offer.html',      // 개인정보의 제3자 제공
    'ENTRUST': '/html/popup/entrust.html',  // 개인정보처리의 위탁 현황
    'ALIAS': '/html/popup/alias.html'       // 가명정보 처리현황
  };

  const url = popupUrls[type];

  if (!url) {
    console.error('Invalid popup type:', type);
    return;
  }

  // 팝업 창 옵션
  const popupWidth = 900;
  const popupHeight = 700;
  const left = (window.screen.width - popupWidth) / 2;
  const top = (window.screen.height - popupHeight) / 2;

  const options = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`;

  // 팝업 열기
  window.open(url, 'privacyPopup', options);
}
$(function() {  
    // Scroll to top functionality
    $('body').append(
      '<button class="scroll-to-top"><img src="/type/www/img/icons/ico_go_top.svg" alt="맨 위로 가기"</button>'
    );

  $(window).on('scroll', function() {
    var scrollPosition = $(window).scrollTop(); // 현재 스크롤 위치 가져오기

    if (scrollPosition > 200) {
        $('.scroll-to-top').addClass('show');
    } else {
        $('.scroll-to-top').removeClass('show');
    }

  }).trigger('scroll');



  $(document).on('click', '.scroll-to-top', function() {
    $('html, body').animate({scrollTop: 0}, 500);
  });
});