$(function(){

    //옵션선택
    $(".sortSelect>.sortBtn").on("click", function(e){
        $(this).next(".sortOpt").slideToggle(200);
    });
    
    //옵션선택
    $(".sortSelect>.sortOpt button").on("click", function(e){
        var selectOpt = $(this).text();
        $(this).parents(".sortSelect").find(".sortBtn").text(selectOpt);
        $(this).parents(".sortOpt").hide();
    });
});