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

    // Mobile Menu 로드 함수
    function loadMobileMenu() {
        const isMobile = $(window).width() < 1024;
        const container = $('#mobile-menu-container');
        
        if (isMobile) {
            // 모바일일 때
            if (container.length === 0) {
                // 컨테이너가 없으면 생성
                $('body').append('<div id="mobile-menu-container"></div>');
                $('#mobile-menu-container').load('includes/mobile_menu_en.html', function() {
                    // 모바일 메뉴 로드 후 이벤트 리스너 재연결
                    if (window.initMobileMenuEvents) {
                        window.initMobileMenuEvents();
                    }
                });
            } else if (container.children().length === 0) {
                // 컨테이너는 있지만 내용이 없으면 로드
                container.load('includes/mobile_menu_en.html', function() {
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
    $('#search-container').load('includes/search_en.html');
});
