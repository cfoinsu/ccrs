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

  // Mobile Menu 로드 함수
  function loadMobileMenu() {
    const isMobile = $(window).width() < 1024;
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
  $('#quickmenu-container').load('includes/quickmenu.html');

  // Mobile QuickMenu 이벤트 초기화
  function initMobileQuickMenu() {
    const toggleBtn = document.querySelector('.mobile-quickmenu-toggle');
    const closeBtn = document.querySelector('.mobile-quickmenu-close');
    const panel = document.querySelector('.mobile-quickmenu-panel');
    const quickMenu = document.querySelector('.mobile-quickmenu');
    const bookItem = document.querySelector('.mobile-quick-item-book');

    if (toggleBtn && panel && quickMenu) {
      // 토글 버튼 클릭
      toggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        quickMenu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        panel.classList.toggle('active');
        document.body.style.overflow = quickMenu.classList.contains('active') ? 'hidden' : '';
      });

      // 닫기 버튼 클릭
      if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          quickMenu.classList.remove('active');
          toggleBtn.classList.remove('active');
          panel.classList.remove('active');
          document.body.style.overflow = '';
        });
      }

      // 오버레이 클릭 시 닫기
      const overlay = document.querySelector('.mobile-quickmenu-overlay');
      if (overlay) {
        overlay.addEventListener('click', function(e) {
          e.stopPropagation();
          quickMenu.classList.remove('active');
          toggleBtn.classList.remove('active');
          panel.classList.remove('active');
          document.body.style.overflow = '';
        });
      }

      // 패널 내부 클릭 시 이벤트 전파 방지
      if (panel) {
        panel.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }

      // 상담 예약신청 메뉴 토글
      if (bookItem) {
        bookItem.addEventListener('click', function(e) {
          if (window.innerWidth <= 1023) {
            e.preventDefault();
            e.stopPropagation();
            const showbox = this.querySelector('.mobile-quick-showbox');
            if (showbox) {
              showbox.classList.toggle('active');
              this.classList.toggle('active');
            }
          }
        });
      }
    }
  }

  // 모바일 퀵메뉴 초기화 (DOM 로드 후)
  setTimeout(function() {
    initMobileQuickMenu();
  }, 500);
});
