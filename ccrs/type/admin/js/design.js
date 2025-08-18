$(function(){
	
	//gnb & lnb
	var gnbCrt1 = $("#gnb>li:nth-child(" + (gnbDep1) + ")>a");
	var lnbCrt1 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>a");
	var lnbCrt2 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ")>a");
	var lnbCrt3 = $("#lnb>li:nth-child(" + (lnbDep1) + ")>ul>li:nth-child(" + (lnbDep2) + ") ul li:nth-child(" + (lnbDep3) + ") a");
	if(gnbCrt1) gnbCrt1.addClass("on");
	if(lnbCrt1) lnbCrt1.addClass("on").siblings("ul").slideDown(0);
	if(lnbCrt2) lnbCrt2.addClass("on").siblings("ul").slideDown(0);
	if(lnbCrt3) lnbCrt3.addClass("on");

	$("#lnb ul").siblings("a").addClass("child");
	$("#lnb>li>ul").siblings("a").click(function(){
		$(this).toggleClass("on").siblings("ul").slideToggle(200);
		$($("#lnb>li>ul").siblings("a")).not(this).removeClass("on").siblings("ul").slideUp(200);
		return false;
	});
	$("#lnb>li>ul ul").siblings("a").click(function(){
		$(this).toggleClass("on").siblings("ul").slideToggle(200);
		$("#lnb>li>ul ul").siblings("a").not(this).removeClass("on").siblings("ul").slideUp(200);
		return false;
	});
	$("#contents nav").mouseleave(function(){
		if(lnbCrt1) lnbCrt1.addClass("on").siblings("ul").slideDown(200);
		$($("#lnb>li>ul").siblings("a")).not(lnbCrt1).removeClass("on").siblings("ul").slideUp(200);
		if(lnbCrt2) lnbCrt2.addClass("on").siblings("ul").slideDown(200);
		$("#lnb>li>ul ul").siblings("a").not(lnbCrt2).removeClass("on").siblings("ul").slideUp(200);
	});

	//tab
	$(".tab_menu a").click(function(){
		$($(this).attr("href")).fadeIn(300);
		$(this).addClass("active");
		$($(this).parents(".tab_area").find("div")).not($(this).attr("href")).fadeOut(0);
		$($(this).parents(".tab_menu").find("a")).not(this).removeClass("active");
		return false;
	});

	//faq
	$("#faq .faq_q").click(function(){
		$(this).toggleClass("on").next(".faq_a").slideToggle(0);
		$("#faq .faq_q").not(this).removeClass("on").next(".faq_a").slideUp(0);
	});

	//pop
	$(".pop_ct .btn_close").click(function(){
		$(this).parents(".pop_wrap").fadeOut(200);
	});
	$(".pop_admin .btn_close").click(function(){
		$(this).parents(".pop_admin").fadeOut(200);
	});

});