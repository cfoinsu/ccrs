/**
 * Main Page Specific JavaScript
 * 메인 페이지 전용 기능
 */

$(function() {
    // 섹션 앵커 네비게이션 초기화
    initSectionAnchorNavigation();
    // 인트로 팝업 닫기
    initIntroPopup();
});

/**
 * 섹션 앵커 네비게이션
 * 스크롤 위치에 따라 앵커 메뉴 활성화
 */
function initSectionAnchorNavigation() {
    // 페이지에 섹션이 없으면 실행 안 함
    if ($('#section1').length === 0) {
        return;
    }

    // 스크롤 이벤트: 현재 섹션에 따라 앵커 활성화
    $(window).scroll(function () {
        if ($(this).scrollTop() >= $("#section4").offset().top - 1) {
            $(".m-anchor-list>li").removeClass("on");
            $(".fourthpage").addClass("on");
        }
        else if ((($(this).scrollTop()) >= ($("#section3").offset().top - 1)) && (($(this).scrollTop()) < ($("#section4").offset().top - 100))) {
            $(".m-anchor-list>li").removeClass("on");
            $(".thirdpage").addClass("on");
        }
        else if ((($(this).scrollTop()) >= ($("#section2").offset().top - 1)) && (($(this).scrollTop()) < ($("#section3").offset().top - 100))) {
            $(".m-anchor-list>li").removeClass("on");
            $(".secondpage").addClass("on");
        }
        else if ($(this).scrollTop() < $("#section2").offset().top - 1) {
            $(".m-anchor-list>li").removeClass("on");
            $(".firstpage").addClass("on");
        }
        else {
            return false;
        }
    });

    // 스크롤 버튼 클릭: 다음 섹션으로 이동
    $('.btn-scroll').click(function(e) {
        e.preventDefault();

        // 현재 스크롤 위치 기준으로 현재 섹션 확인
        let currentSection;
        let scrollTop = $(window).scrollTop();

        if (scrollTop >= $("#section4").offset().top - 1) {
            currentSection = 4;
        }
        else if (scrollTop >= $("#section3").offset().top - 1) {
            currentSection = 3;
        }
        else if (scrollTop >= $("#section2").offset().top - 1) {
            currentSection = 2;
        }
        else {
            currentSection = 1;
        }

        // 다음 섹션으로 스크롤
        let nextSection = currentSection + 1;
        if (nextSection > 4) nextSection = 4; // 마지막 섹션이면 유지

        // 스무스 스크롤 애니메이션
        $('html, body').animate({
            scrollTop: $("#section" + nextSection).offset().top
        }, 800, 'swing');
    });
}

/**
 * 인트로 팝업 닫기
 */
function initIntroPopup() {
    $(".intro .close").click(function () {
        $(this).parent().removeClass("show");
    });
}
