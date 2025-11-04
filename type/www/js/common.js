//aos init
AOS.init({
    duration: 600,
    easing: "ease",
    offset: 0,
});

/**
 * Common JavaScript functions for Korean pages
 * 국문 페이지 공통 기능
 */
$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();
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
            slidesPerView: 'auto',
            spaceBetween: 64,
            loop: true,
            loopedSlides: 6,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.institution-nav-btn.next',
                prevEl: '.institution-nav-btn.prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 'auto',
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 'auto',
                    spaceBetween: 40,
                },
            },
        });

        console.log('Institution carousel initialized successfully');

        // Pause/Play 버튼 기능
        var pauseBtn = document.querySelector('.institution-nav-btn.pause');
        var isPaused = false;

        if (pauseBtn) {
            pauseBtn.addEventListener('click', function() {
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
