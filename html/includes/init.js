// Header, Footer, AllMenu, Search, QuickMenu, Skip Nav 로딩 및 스크립트 초기화
$(function() {
    // Skip Navigation 로드
    $('#skip-nav-container').load('includes/skip_nav.html');

    // Topbanner 로드 (main.html만 해당)
    if ($('#topbanner-container').length > 0) {
        $('#topbanner-container').load('includes/topbanner.html');
    }

    // Header Content 로드 (topbanner 제외한 header 부분)
    if ($('#header-content-container').length > 0) {
        $('#header-content-container').load('includes/header_content.html', function() {
            // Header가 로드된 후 스크립트 초기화
            $.getScript('/type/www/js/common.js?ver=2.0');
            $.getScript('/type/www/js/layout.js?ver=2.0');
            $.getScript('/type/www/js/script.js?ver=2.0');
            $.getScript('/type/www/js/component/ui-script.js?ver=2.0');
        });
    }

    // Header 로드 (서브 페이지용 - 기존 방식 유지)
    if ($('#header-container').length > 0) {
        $('#header-container').load('includes/header.html', function() {
            // Header가 로드된 후 스크립트 초기화
            $.getScript('/type/www/js/common.js?ver=2.0');
            $.getScript('/type/www/js/layout.js?ver=2.0');
            $.getScript('/type/www/js/script.js?ver=2.0');
            $.getScript('/type/www/js/component/ui-script.js?ver=2.0');
        });
    }

    // Footer 로드 후 Institution Carousel 초기화
    $('#footer-container').load('includes/footer.html', function() {
        // DOM이 완전히 준비된 후 초기화 (약간의 지연)
        setTimeout(function() {
            if (typeof initInstitutionCarousel === 'function') {
                initInstitutionCarousel();
            } else {
                console.error('initInstitutionCarousel function not found');
            }
        }, 100);
    });

    // AllMenu 로드
    $('#allmenu-container').load('includes/allmenu.html');

    // Search 로드
    $('#search-container').load('includes/search.html');

    // QuickMenu 로드
    $('#quickmenu-container').load('includes/quickmenu.html');
});
