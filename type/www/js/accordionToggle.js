// Accordion toggle interactions for pages using support content toggle
// Requires jQuery (loaded globally)
$(function () {
    var $toggleBtn = $('#toggleButton');
    if (!$toggleBtn.length) return; // guard: run only when elements exist

    var $toggleText = $('#toggleText');
    var $arrowIcon = $('#arrowIcon');
    var $separator = $('#separator');
    var $support = $('#supportContent');

    $toggleBtn.on('click', function () {
        var isOpen = $support.toggleClass('open').hasClass('open');

        if (isOpen) {
            $toggleText.text('지원내용 닫기');
            $arrowIcon.removeClass('rotate-90').addClass('rotate-270');
            $separator.show();
        } else {
            $toggleText.text('지원내용 보기');
            $arrowIcon.removeClass('rotate-270').addClass('rotate-90');
            $separator.hide();
        }
    });
});


