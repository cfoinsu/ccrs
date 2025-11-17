// Skip Nav, Header, Footer, AllMenu, Search 로딩 및 스크립트 초기화
$(function() {
    // AOS 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Skip Navigation 로드
    $('#skip-nav-container').load('includes/skip_nav_en.html');

    // Header 로드
    $('#header-container').load('includes/header_en.html', function() {
        // Header가 로드된 후 스크립트 초기화
        $.getScript('/type/www/js/layout.js');
        $.getScript('/type/www/js/script.js');
    });

    // Footer 로드
    $('#footer-container').load('includes/footer_en.html');

    // AllMenu 로드
    $('#allmenu-container').load('includes/allmenu_en.html');

    // Mobile Menu 로드 (모바일 전용)
    if ($('#mobile-menu-container').length > 0 || $(window).width() < 1024) {
        $('body').append('<div id="mobile-menu-container"></div>');
        $('#mobile-menu-container').load('includes/mobile_menu_en.html');
    }

    // Search 로드
    $('#search-container').load('includes/search_en.html');
});
