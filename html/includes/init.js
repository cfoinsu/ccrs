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
      $.getScript('/ccrs/type/www/js/layout.js');
      $.getScript('/ccrs/type/www/js/script.js');
    });
  }

  // Header 로드 (서브 페이지용 - 기존 방식 유지)
  if ($('#header-container').length > 0) {
    $('#header-container').load('includes/header.html', function () {
      // Header가 로드된 후 스크립트 초기화
      $.getScript('/ccrs/type/www/js/layout.js');
      $.getScript('/ccrs/type/www/js/script.js');
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

  // Mobile Menu 로드 함수
  function loadMobileMenu() {
    const isMobile = $(window).width() < 1280;
    const container = $('#mobile-menu-container');
    
    if (isMobile) {
      // 모바일일 때
      if (container.length === 0) {
        // 컨테이너가 없으면 생성
        $('body').append('<div id="mobile-menu-container"></div>');
        $('#mobile-menu-container').load('includes/mobile_menu.html', function() {
          // 모바일 메뉴 로드 후 이벤트 리스너 재연결
          if (window.initMobileMenuEvents) {
            window.initMobileMenuEvents();
          }
        });
      } else if (container.children().length === 0) {
        // 컨테이너는 있지만 내용이 없으면 로드
        container.load('includes/mobile_menu.html', function() {
          if (window.initMobileMenuEvents) {
            window.initMobileMenuEvents();
          }
        });
      }
    } else {
      // 데스크톱일 때 모바일 메뉴 제거
      if (container.length > 0) {
        container.remove();
      }
    }
  }

  // 모바일 메뉴 이벤트 리스너 초기화 함수 (전역 함수로 노출)
  window.initMobileMenuEvents = function() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileAllmenuOverlay');
    
    if (menuBtn && mobileMenu) {
      // 기존 이벤트 리스너 제거를 위해 새로 등록
      menuBtn.onclick = function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
    } else if (menuBtn && !mobileMenu) {
      // 모바일 메뉴가 아직 로드되지 않았으면 잠시 후 재시도
      setTimeout(window.initMobileMenuEvents, 200);
    }
  };

  // 초기 로드
  loadMobileMenu();

  // 화면 크기 변경 시 모바일 메뉴 동적 로드/제거
  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      loadMobileMenu();
    }, 250);
  });

  // Search 로드
  $('#search-container').load('includes/search.html');

  // QuickMenu 로드
  $('#quickmenu-container').load('includes/quickmenu.html', function() {
    // 퀵메뉴 로드 후 모바일 이벤트 초기화
    initQuickMenuMobile();
  });

  // 모바일 퀵메뉴 이벤트 초기화 함수
  function initQuickMenuMobile() {
    const mobileBtn = document.querySelector('.quick-mobile-btn');
    const quickMenu = document.querySelector('.quick-menu');
    const quickmenuContainer = document.querySelector('.quickmenu-container');
    const bookItem = document.querySelector('.quick-item.book');

    if (mobileBtn && quickMenu && quickmenuContainer) {
      // 모바일 버튼 클릭 시 메뉴 토글
      mobileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        quickmenuContainer.classList.toggle('active');
        quickMenu.classList.toggle('active');
        mobileBtn.classList.toggle('active');
        // document.body.style.overflow = quickMenu.classList.contains('active') ? 'hidden' : '';
      });

      // 오버레이 클릭 시 닫기
      const overlay = document.querySelector('.quickmenu-overlay');
      if (overlay) {
        overlay.addEventListener('click', function(e) {
          e.stopPropagation();
          quickmenuContainer.classList.remove('active');
          quickMenu.classList.remove('active');
          mobileBtn.classList.remove('active');
          document.body.style.overflow = '';
        });
      } else {
        // 오버레이가 없으면 생성
        const newOverlay = document.createElement('div');
        newOverlay.className = 'quickmenu-overlay';
        quickmenuContainer.insertBefore(newOverlay, quickMenu);
        
        newOverlay.addEventListener('click', function(e) {
          e.stopPropagation();
          quickmenuContainer.classList.remove('active');
          quickMenu.classList.remove('active');
          mobileBtn.classList.remove('active');
          document.body.style.overflow = '';
        });
      }

      // 메뉴 내부 클릭 시 이벤트 전파 방지
      if (quickMenu) {
        quickMenu.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }

      // 상담 예약신청 메뉴 토글 (모바일에서만)
      if (bookItem) {
        bookItem.addEventListener('click', function(e) {
          if (window.innerWidth <= 1279) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('on');
          }
        });
      }
    }
  }

  // 초기화 (퀵메뉴가 이미 로드되어 있을 수 있으므로)
  setTimeout(function() {
    initQuickMenuMobile();
  }, 500);
});
