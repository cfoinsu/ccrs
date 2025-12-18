(function() {
    // 1. 설정: PC와 모바일용 측정 ID 정의
    var pcId = 'G-1S63PNKJRF';
    var mobileId = 'G-GV7L3EB5KS';
    var targetId = pcId; // 기본값은 PC로 설정

    // 2. 모바일 감지 로직 (User Agent 확인)
    var userAgent = navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    if (isMobile) {
        targetId = mobileId;
    }

    // 3. 동적으로 gtag.js 스크립트 로드
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + targetId;
    document.head.appendChild(script);

    // 4. gtag 초기화 및 config 설정
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    // 선택된 ID로 설정 시작
    gtag('config', targetId);

    // 디버깅용: 콘솔에서 어떤 ID가 로드되었는지 확인하려면 아래 주석을 해제하세요.
    // console.log('Loaded GA4 ID:', targetId, '| Device:', isMobile ? 'Mobile' : 'PC');
})();