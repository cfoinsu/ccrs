// Header, Footer, AllMenu, Search, QuickMenu, Skip Nav 로딩 및 스크립트 초기화
$(function() {
    // AOS 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Skip Navigation 로드
    $('#skip-nav-container').load('includes/skip_nav.html');

    // Header 로드
    $('#header-container').load('includes/header.html', function() {
        // Header가 로드된 후 스크립트 초기화
        $.getScript('/type/www/js/common.js?ver=1.9');
        $.getScript('/type/www/js/layout.js?ver=1.9');
        $.getScript('/type/www/js/script.js?ver=1.9');
        $.getScript('/type/www/js/component/ui-script.js?ver=1.9');
        $.getScript('/type/www/js/common_kr.js?ver=1.9');
    });

    // Footer 로드
    $('#footer-container').load('includes/footer.html');

    // AllMenu 로드
    $('#allmenu-container').load('includes/allmenu.html');

    // Search 로드
    $('#search-container').load('includes/search.html');

    // QuickMenu 로드
    $('#quickmenu-container').load('includes/quickmenu.html');
});
