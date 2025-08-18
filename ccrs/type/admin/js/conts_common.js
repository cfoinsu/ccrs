$(function(){
	/*** 입력 ***/
//	$(".inp_r").on('change', function(){
//		//$(this).siblings('.inp_r+label').removeClass('on');
//		//$(this).prev('.inp_r').siblings('.inp_r').removeAttr('checked');
//		$(this).children('label').addClass('on');
//		$(this).children('input[type=radio]').attr('checked', 'checked');
//	});

	$(".inp_r").on('keydown', function(e){
		if(e.keyCode == 32){
			//$(this).siblings('.inp_r+label').removeClass('on');
			//$(this).siblings('.inp_r').removeAttr('checked');
			$(this).children('label').addClass('on');
			$(this).children('input[type=radio]').attr('checked', 'checked');
		}
	});

	/*$(".inp_c").on('change', function(){
		if($(this).children('label').attr('class') == 'on'){
			$(this).children('label').removeClass('on');
			$(this).children('input[type=checkbox]').removeAttr('checked');
		}else{
			$(this).children('label').addClass('on');
			$(this).children('input[type=checkbox]').attr('checked', 'checked');
		}
	});*/
	$(".inp_c input").on('change', function(){
		if($(this).attr('checked') == 'checked'){
			$(this).siblings('label').removeClass('on');
			$(this).removeAttr('checked');
		}else{
			$(this).siblings('label').addClass('on');
			$(this).attr('checked', 'checked');
		}
	});
	$(".inp_c>input[type=checkbox]").on('focus', function(){
		$(this).parent('::before').css("display","block");
	});

	/*$(".inp_c").on('keydown', function(e){
		if(e.keyCode == 32){
			if($(this).children('label').attr('class') == 'on'){
				$(this).children('label').removeClass('on');
				$(this).children('input[type=checkbox]').removeAttr('checked');
			}else{
				$(this).children('label').addClass('on');
				$(this).children('input[type=checkbox]').attr('checked', 'checked');
			}
		}
	});*/

	/*** 팝업 ***/
	$("#typePop .popClose").click(function(){
		$(this).parent('#typePop').hide();
	});

	$(window).bind('load resize', function(){
		var contH = $("#typePop.typeDefault.pop_apply_status .tit_sub").height() + $("#typePop.typeDefault.pop_apply_status .lineTop_tbArea").height() + $("#typePop.typeDefault.pop_apply_status .btn_group").height();
		var winH = window.innerHeight - 243;

		if(winH > contH){
			$("#typePop.typeDefault.pop_apply_status #popConts .limit").css('height', 'auto');
		}else{
			$("#typePop.typeDefault.pop_apply_status #popConts .limit").css('height', winH);
		}
	});
});
