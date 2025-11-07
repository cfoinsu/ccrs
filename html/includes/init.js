// Header, Footer, AllMenu, Search, QuickMenu, Skip Nav 로딩 및 스크립트 초기화
$(function () {
  // Skip Navigation 로드
  $('#skip-nav-container').load('includes/skip_nav.html');

  // Topbanner 로드 (main.html만 해당)
  if ($('#topbanner-container').length > 0) {
    $('#topbanner-container').load('includes/topbanner.html');
  }

  // Header Content 로드 (데스크톱 + 모바일 헤더 통합)
  if ($('#header-content-container').length > 0) {
    $('#header-content-container').load('includes/header.html', function () {
      // Header가 로드된 후 스크립트 초기화
      $.getScript('/type/www/js/layout.js');
      $.getScript('/type/www/js/script.js');
    });
  }

  // Header 로드 (서브 페이지용 - 기존 방식 유지)
  if ($('#header-container').length > 0) {
    $('#header-container').load('includes/header.html', function () {
      // Header가 로드된 후 스크립트 초기화
      $.getScript('/type/www/js/layout.js');
      $.getScript('/type/www/js/script.js');
    });
  }

  // Footer 로드 후 Institution Carousel 초기화
  $('#footer-container').load('includes/footer.html', function () {
    // DOM이 완전히 준비된 후 초기화
    setTimeout(function () {
      if (typeof initInstitutionCarousel === 'function') {
        initInstitutionCarousel();
      }
    }, 300);
  });

  // AllMenu 로드
  $('#allmenu-container').load('includes/allmenu.html');

  // Mobile Menu 로드 (모바일 전용)
  if ($('#mobile-menu-container').length > 0 || $(window).width() < 1024) {
    $('body').append('<div id="mobile-menu-container"></div>');
    $('#mobile-menu-container').load('includes/mobile_menu.html');
  }

  // Search 로드
  $('#search-container').load('includes/search.html');

  // QuickMenu 로드
  $('#quickmenu-container').load('includes/quickmenu.html');
});
