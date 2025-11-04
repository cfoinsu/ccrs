/**
 * Common JavaScript functions for English pages
 * English version of common UI interactions
 */

$(function() {
    // Initialize toggle buttons for support content
    initSupportContentToggle();
});

/**
 * Initialize support content toggle functionality
 * Used in debt relief program pages to show/hide support details
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
            $toggleText.text('Hide Support Details');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show(); // display:block
        } else {
            $toggleText.text('Show Support Details');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide(); // display:none
        }
    });
}
