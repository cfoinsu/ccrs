// Header, Footer, AllMenu, Search 로딩 및 스크립트 초기화
$(function() {
    // AOS 초기화
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

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

    // Search 로드
    $('#search-container').load('includes/search_en.html');
});
