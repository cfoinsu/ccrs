/**
 * Main Page Specific JavaScript
 * 메인 페이지 전용 기능
 */

// $(function() {
//     // 섹션 앵커 네비게이션 초기화
//     initSectionAnchorNavigation();
//     // 인트로 팝업 닫기
//     initIntroPopup();
//     // Swiper 슬라이더 초기화
//     initSwiperSliders();
//     // 뉴스 탭 초기화
//     initNewsTabs();
//     // 스오이퍼 포커스
//     initSwiperFocus()
// });

// /**
//  * 섹션 앵커 네비게이션
//  * 스크롤 위치에 따라 앵커 메뉴 활성화
//  */
// function initSectionAnchorNavigation() {
//     // 페이지에 섹션이 없으면 실행 안 함
//     if ($('#section1').length === 0) {
//         return;
//     }

//     // 스크롤 이벤트: 현재 섹션에 따라 앵커 활성화
//     $(window).scroll(function () {
//         if ($(this).scrollTop() >= $("#section4").offset().top - 1) {
//             $(".m-anchor-list>li").removeClass("on");
//             $(".fourthpage").addClass("on");
//         }
//         else if ((($(this).scrollTop()) >= ($("#section3").offset().top - 1)) && (($(this).scrollTop()) < ($("#section4").offset().top - 100))) {
//             $(".m-anchor-list>li").removeClass("on");
//             $(".thirdpage").addClass("on");
//         }
//         else if ((($(this).scrollTop()) >= ($("#section2").offset().top - 1)) && (($(this).scrollTop()) < ($("#section3").offset().top - 100))) {
//             $(".m-anchor-list>li").removeClass("on");
//             $(".secondpage").addClass("on");
//         }
//         else if ($(this).scrollTop() < $("#section2").offset().top - 1) {
//             $(".m-anchor-list>li").removeClass("on");
//             $(".firstpage").addClass("on");
//         }
//         else {
//             return false;
//         }
//     });

//     // 스크롤 버튼 클릭: 다음 섹션으로 이동
//     $('.btn-scroll').click(function(e) {
//         e.preventDefault();

//         // 현재 스크롤 위치 기준으로 현재 섹션 확인
//         let currentSection;
//         let scrollTop = $(window).scrollTop();

//         if (scrollTop >= $("#section4").offset().top - 1) {
//             currentSection = 4;
//         }
//         else if (scrollTop >= $("#section3").offset().top - 1) {
//             currentSection = 3;
//         }
//         else if (scrollTop >= $("#section2").offset().top - 1) {
//             currentSection = 2;
//         }
//         else {
//             currentSection = 1;
//         }

//         // 다음 섹션으로 스크롤
//         let nextSection = currentSection + 1;
//         if (nextSection > 4) nextSection = 4; // 마지막 섹션이면 유지

//         // 스무스 스크롤 애니메이션
//         $('html, body').animate({
//             scrollTop: $("#section" + nextSection).offset().top
//         }, 800, 'swing');
//     });
// }

// /**
//  * 인트로 팝업 닫기
//  */
// function initIntroPopup() {
//     $(".intro .close").click(function () {
//         $(".intro").removeClass("show");
//     });
// }

// /**
//  * Swiper 슬라이더 초기화
//  * 메인 배너와 하단 배너 슬라이더 설정
//  */
// var introSwiper = null;

// function initIntroSwiper() {
//   // 인트로 배너 슬라이더 - mobile에서만 작동
//   if ($('#introSwiper').length > 0) {
//     var isMobile = window.innerWidth <= 767;

//     if (isMobile && !introSwiper) {
//       // mobile일 때만 swiper 초기화
//       introSwiper = new Swiper('#introSwiper', {
//         slidesPerView: 1,
//         spaceBetween: 12,
//         centeredSlides: true,
//         pagination: {
//           el: '.introSwiper-pagination',
//           clickable: true,
//           bulletClass: 'swiper-pagination-bullet',
//           bulletActiveClass: 'swiper-pagination-bullet-active',
//           renderBullet: function (index, className) {
//             return '<span class="' + className + '" role="button" aria-label="인트로 ' + (index + 1) + '번 슬라이드로 이동" tabindex="0"></span>';
//           },
//         },
//       });
//     } else if (!isMobile && introSwiper) {
//       // tablet 이상일 때 swiper 해제
//       introSwiper.destroy(true, true);
//       introSwiper = null;
//     }
//   }
// }

// function disableDuplicateFocus(swiper) {
//   if (!swiper || !swiper.el) return;

//   const duplicates = swiper.el.querySelectorAll('.swiper-slide-duplicate');

//   duplicates.forEach((slide) => {
//     slide.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((el) => {
//       el.setAttribute('tabindex', '-1');
//       el.setAttribute('aria-hidden', 'true');
//     });
//   });
// }

// let swiperList = [];

// function initSwiperSliders() {
//   // 인트로 배너 슬라이더 초기화

//   if (typeof initIntroSwiper === 'function') {
//     initIntroSwiper();
//   }
//   //initIntroSwiper();

//   // 화면 크기 변경 시 인트로 swiper만 재초기화
//   var resizeTimer;
//   $(window).on('resize', function () {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(function () {
//       initIntroSwiper();
//     }, 250);
//   });
//   // 메인 배너 슬라이더
//   if ($('#mainSlider').length > 0) {
//     var mainSwiper = new Swiper('#mainSlider', {
//       slidesPerView: 1,
//       spaceBetween: 1,
//       centeredSlides: true,
//       autoplay: {
//         delay: 4000,
//         pauseOnMouseEnter: false,
//         disableOnInteraction: false,
//       },
//       //loop: true,
//       loopedSlides: 3,
//       pagination: {
//         el: '#mainSlider-pagination',
//         clickable: true,
//         bulletClass: 'swiper-pagination-bullet',
//         bulletActiveClass: 'swiper-pagination-bullet-active',
//         renderBullet: function (index, className) {
//           return '<span class="' + className + '" role="button" aria-label="메인 배너 ' + (index + 1) + '번 슬라이드로 이동" tabindex="0"></span>';
//         },
//       },
//       a11y: { 
//         enabled: true,  // 접근성 기능 활성화
//         paginationBulletMessage: '메인 배너 {{index}}번 슬라이드로 이동',
//       }
//     });
//     //initSwiperFocus();
//     swiperList.push(mainSwiper);
//     disableDuplicateFocus(mainSwiper);
//   }

//   // 하단 배너 슬라이더
//   if ($('#bnrSlider').length > 0) {
//     var bottomSwiper = new Swiper('#bnrSlider', {
//       slidesPerView: 1,
//       spaceBetween: 0,
//       centeredSlides: true,
//       autoplay: {
//         delay: 4000,
//         pauseOnMouseEnter: false,
//         disableOnInteraction: false,
//       },
//       loop: true,
//       loopedSlides: 3,
//       pagination: {
//         el: '#bnrSlider-pagination',
//         clickable: true,
//         bulletClass: 'swiper-pagination-bullet',
//         bulletActiveClass: 'swiper-pagination-bullet-active',
//         renderBullet: function (index, className) {
//           return '<span class="' + className + '" role="button" aria-label="하단 배너 ' + (index + 1) + '번 슬라이드로 이동" tabindex="0"></span>';
//         },
//       },
//       a11y: { 
//         enabled: true,  // 접근성 기능 활성화
//         paginationBulletMessage: '하단 배너 {{index}}번 슬라이드로 이동'
//       },
//     });
//     //initSwiperFocus();
//     swiperList.push(bottomSwiper);
//     disableDuplicateFocus(bottomSwiper);
//   }

//   // 상환 배너 슬라이더
//   if ($('#debtSlider').length > 0) {
//     var debtSwiper = new Swiper('#debtSlider', {
//       slidesPerView: 1,
//       spaceBetween: 0,
//       centeredSlides: true,
//       autoplay: {
//         delay: 3000,
//         pauseOnMouseEnter: false,
//         disableOnInteraction: false,
//       },
//       loop: true,
//       loopedSlides: 3,
//       pagination: {
//         el: '#debtSlider-pagination',
//         clickable: true,
//         bulletClass: 'swiper-pagination-bullet',
//         bulletActiveClass: 'swiper-pagination-bullet-active',
//         renderBullet: function (index, className) {
//           return '<span class="' + className + '" role="button" aria-label="상환 배너 ' + (index + 1) + '번 슬라이드로 이동" tabindex="0"></span>';
//         },
//       },
//       a11y: { 
//         enabled: true,  // 접근성 기능 활성화
//         paginationBulletMessage: '상환 배너 {{index}}번 슬라이드로 이동'
//       },
//     });
//     //initSwiperFocus();
//     swiperList.push(debtSwiper);
//     disableDuplicateFocus(debtSwiper);
//   }

//   // 금융 배너 슬라이더
//   if ($('#financeSlider').length > 0) {
//     var financeSwiper = new Swiper('#financeSlider', {
//       slidesPerView: 1,
//       spaceBetween: 0,
//       centeredSlides: true,
//       autoplay: {
//         delay: 3000,
//         pauseOnMouseEnter: false,
//         disableOnInteraction: false,
//       },
//       loop: true,
//       loopedSlides: 3,
//       pagination: {
//         el: '#financeSlider-pagination',
//         clickable: true,
//         bulletClass: 'swiper-pagination-bullet',
//         bulletActiveClass: 'swiper-pagination-bullet-active',
//         renderBullet: function (index, className) {
//           return '<span class="' + className + '" role="button" aria-label="금융 배너 ' + (index + 1) + '번 슬라이드로 이동" tabindex="0"></span>';
//         },
//       },
//       a11y: { 
//         enabled: true,  // 접근성 기능 활성화
//         paginationBulletMessage: '금융 배너 {{index}}번 슬라이드로 이동'
//       },
//     });
//     //initSwiperFocus();
//     swiperList.push(financeSwiper);
//     disableDuplicateFocus(financeSwiper);
//   }

//   initSwiperFocus();
// }

// /**
//  * 뉴스 탭 전환
//  * 탭 버튼 클릭 시 해당하는 콘텐츠 표시
//  */
// function initNewsTabs() {
//     // 오른쪽 보도자료/유투브/블로그/카페 탭
//     // $('.news-right .tab-button').click(function() {
//     //     var index = $(this).index();

//     //     $('.news-right .tab-button').removeClass('active');
//     //     $(this).addClass('active');

//     //     $('.press-grid').removeClass('active');
//     //     $('.press-grid').eq(index).addClass('active');
//     // });

//     // 왼쪽 공지사항/입찰공고/채용공고 탭
//     $('.news-left .tab-button').click(function() {
//         var index = $(this).index();

//         $('.news-left .tab-button').removeClass('active');
//         $(this).addClass('active');

//         $('.news-list').removeClass('active');
//         $('.news-list').eq(index).addClass('active');
//     });
// }
// /**
//  * 스와이퍼 포커스
//  */
// function initSwiperFocus() {
//   $('.swiper-container').on(
//     'focus',
//     'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
//     function () {

//       if ($(this).hasClass('swiper-pagination-bullet')) {
//         return;
//       }

//       var $slide = $(this).closest('.swiper-slide');
//       if (!$slide.length) return;

//       if ($slide.hasClass('swiper-slide-duplicate')) return;

//       let container = $slide.closest('.swiper-container')[0];
//       let swiper = swiperList.find(s => s.el === container);
//       if (!swiper) return;

//       if (swiper.autoplay) {
//         try { swiper.autoplay.stop(); } catch (e) {}
//       }

//       let index = $slide.data('swiper-slide-index');
//       if (typeof index === 'undefined') index = $slide.index();

//       if (swiper.params.loop && typeof swiper.slideToLoop === 'function') {
//         swiper.slideToLoop(index, 0);
//       } else {
//         swiper.slideTo(index, 0);
//       }

//       const el = this;
//       swiper.once('transitionEnd', () => {
//         try { el.focus(); } catch (e) {}
//       });
//     }
//   );
// }

