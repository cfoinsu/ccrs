/**
 * Common JavaScript functions for Korean pages
 * 국문 페이지 공통 기능
 */

$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();
});

/**
 * Initialize support content toggle functionality
 * 지원내용 토글 버튼 초기화
 */
function initSupportContentToggle() {
    const $toggleBtn = $('#toggleButton');
    const $toggleText = $('#toggleText');
    const $arrowIcon = $('#arrowIcon');
    const $separator = $('#separator');
    const $support = $('#supportContent');

    // Only initialize if toggle button exists on the page
    if ($toggleBtn.length === 0) {
        return;
    }

    // Click event handler
    $toggleBtn.on('click', function() {
        // Toggle class and check current state
        const isOpen = $support.toggleClass('open').hasClass('open');

        // Update UI based on open/closed state
        if (isOpen) {
            $toggleText.text('지원내용 닫기');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show(); // display:block
        } else {
            $toggleText.text('지원내용 보기');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide(); // display:none
        }
    });
}
