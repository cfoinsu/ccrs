 /********************************************************
 파일명 : boardFunc.js
 설 명 : 게시판 공통 js
 ------- -------- ---------- --------------
 2021.03.15 프로젝트명 최초 생성
*********************************************************/
/*
 * copyItem 게시물복사 기능
 * 2021.07.13 dygo 게시물 복사 URL 변경(/admin/boardCon/boardItemCopyPop.do -> /admin/board/boardItemCopyPop.do)
 */
$.fn.copyItem = function(formObj,boardType){
	
	$(this).click(function(){
		if($(formObj).find(".chk_list:checked").length < 1){
			alert('선택된 게시물이 없습니다.');
			return;
		}
		$("body").css("overflow","");
		$("body").css("overflow-y","hidden");
	    $('<iframe id="iframeCopyPop" src="/admin/board/boardItemCopyPop.do?formId='+$(formObj).attr("id")+'&boardType='+boardType+'" frameborder="0" style="left: 0;border: 0px currentColor; border-image: none; top: '+$(document).scrollTop()+'px; width: 100%; height: 100%; position: absolute; z-index: 999999;"/>').appendTo($("body #container"));
	});
}
/*
 * boardUpRecordPop 게시물 수정이력 팝업
 * 2021.07.16 dygo 최초생성
 */
$.fn.boardUpRecordPop = function(formObj){
	$(this).click(function(){
		
		var siteno = $("#sendForm [name='SITE_NO']").val();
		var boardseq = $("#sendForm [name='BOARD_SEQ']").val();
		var bbsseq = $("#sendForm [name='BBS_SEQ']").val();
		
		$("body").css("overflow","");
		$("body").css("overflow-y","hidden");
	    $('<iframe id="iframeCopyPop" src="/admin/board/boardUpRecordPop.do?SITE_NO='+siteno+'&BOARD_SEQ='+boardseq+'&BBS_SEQ='+bbsseq+'" frameborder="0" style="left: 0;border: 0px currentColor; border-image: none; top: '+$(document).scrollTop()+'px; width: 100%; height: 100%; position: absolute; z-index: 999999;"/>').appendTo($("body #container"));
	});
}

function copyPopClose(){
	
	$("#listForm").find(".check_all").prop("checked",false);
	$("body").css("overflow","");
	$("body").css("overflow-y","");
	$("#iframeCopyPop").remove();
	fn_list();
}

/*
 * boardReportPop 게시물 신고 팝업
 * 2021.07.21 dygo 최초생성
 */
$.fn.boardReportPop = function(formObj){
	$(this).click(function(){
		
		var siteno = $("#sendForm [name='SITE_NO']").val();
		var boardseq = $("#sendForm [name='BOARD_SEQ']").val();
		var bbsseq = $("#sendForm [name='BBS_SEQ']").val();
		
		if( $("#sendForm input:hidden[name=REPORT_YN]").val() == 'Y'){
			alert("이미 신고된 게시물 입니다.");
			return false;
		}
		
		$("body").css("overflow","");
		$("body").css("overflow-y","hidden");
		$('<iframe id="iframeCopyPop" src="/admin/board/boardReportPop.do?SITE_NO='+siteno+'&BOARD_SEQ='+boardseq+'&BBS_SEQ='+bbsseq+'" frameborder="0" style="left: 0;border: 0px currentColor; border-image: none; top: '+$(document).scrollTop()+'px; width: 100%; height: 100%; position: absolute; z-index: 999999;"/>').appendTo($("body #container"));
	});
}
/*
 * 게시물삭제 기능
 */
$.fn.deleteItem = function(formObj){
	
	$(this).click(function(){
		if($(formObj).find(".chk_list:checked").length < 1){
			alert('선택된 게시물이 없습니다.');
			return;
		}
		
		if (confirm('게시물을 삭제하시겠습니까?')) {
			$.ajax({
				url : "/ajax/board/boardItemDelete.do",
		        data : $(formObj).serialize(),
		        dataType : "json",
				success: function(resp) {
					if(resp != null){
						alert("게시물이 삭제되었습니다.");
						fn_list();
		        	}else{
		        		alert("삭제에 실패했습니다. 관리자에 문의하세요.");
		        	}
				}
			});
		}
	});
}

/*
 * 파일업로드 기능
 */

$.fn.boardFileUpload = function(siteNo, boardSeq){
	
    $(this).click(function(){
    	$("body").css("overflow","");
		$("body").css("overflow-y","hidden");
	    $('<iframe id="iframeUploadPop" src="/admin/board/boardUploadPop.do?btnId='+$(this).attr("id")+'&ftype='+$(this).data("ftype")+'&SITE_NO='+siteNo+'&BOARD_SEQ='+boardSeq+'" frameborder="0"  style="left: 0;border: 0px currentColor; border-image: none; top: '+$(document).scrollTop()+'px; width: 100%; height: 100%; position: absolute; z-index: 999999;"/>').appendTo($("body #container"));
	    
	});
}
$.fn.boardFileUpload2 = function(siteNo, boardSeq){
	
    $(this).click(function(){
    	$("body").css("overflow","");
		$("body").css("overflow-y","hidden");
	    $('<iframe id="iframeUploadPop" src="/admin/board/boardUploadPop.do?btnId='+$(this).attr("id")+'&ftype='+$(this).data("ftype")+'&fnum='+$(this).data("fnum")+'&SITE_NO='+siteNo+'&BOARD_SEQ='+boardSeq+'" frameborder="0"  style="left: 0;border: 0px currentColor; border-image: none; top: '+$(document).scrollTop()+'px; width: 100%; height: 100%; position: absolute; z-index: 999999;"/>').appendTo($("body #container"));
	    
	});
}

/*
 * 파일업로드 팝업 닫기
 */
function fn_uploadPopClose(){
	$("body").css("overflow","");
	$("body").css("overflow-y","");
	$("#iframeUploadPop").remove();
}

/*
 * 파일업로드 영역 생성
 */
var fileIdx = 0;
function fn_setPageFunc0(name,size,response,btnId){
	eval("var data0 = "+response+";");
    
    var ext = ".bmp .doc .gif .hwp .hwpx .jpg .mp4 .pdf .png .ppt .swf .txt .xls .zip";
    var _fileLen = name.length;
    var _lastDot = name.lastIndexOf('.');
    var _fileExt = name.substring(_lastDot+1, _fileLen).toLowerCase();
    
    if(ext.indexOf(_fileExt) == -1) _fileExt = 'etc';
    
    var hiddenTag = '<input type="hidden" name="FILE_SEQ-NEW'+fileIdx+'" />';
    hiddenTag += '<input type="hidden" name="FILE_ORG_NM-NEW'+fileIdx+'" value="'+data0.data.FILE_NM+'" />';
    hiddenTag += '<input type="hidden" name="FILE_NM-NEW'+fileIdx+'" value="'+data0.data.FILE_NM_SAVED+'" />';
    hiddenTag += '<input type="hidden" name="FILE_SIZE-NEW'+fileIdx+'" value="'+data0.data.FILE_SIZE+'" />';
    hiddenTag += '<input type="hidden" name="TYPE_CODE-NEW'+fileIdx+'" value="'+btnId+'" />';
    var imgTag = '<img alt="'+_fileExt+'" src="/img/icon/'+_fileExt+'.png" />';
    var fileDiv = "<div><a class='file-download' href='#;' data-filename='"+name+"' data-encname='"+name+"' data-part='"+_fileExt+"'>"; 
    fileDiv += imgTag;
    fileDiv += "&nbsp;"+name+"&nbsp;("+size+" KB)";
    fileDiv += "</a><a title='파일을 삭제합니다.' class='btn_file_delete' href='#;' onclick='boardFileUploadDel(this)'>x</a>";
    fileDiv += hiddenTag;
    fileDiv += "</div>";
    fileIdx++;
    $(fileDiv).appendTo($("#"+btnId).next());
    
}


/*
 * 첨부파일 삭제
 */
function fn_boardFileUploadDel(obj){
	if(!confirm("첨부파일을 삭제하시겠습니까?")) {
        return;
    }
    
    if($(obj).parent().find("[name^=FILE_SEQ]").val() != ""){
        //ajax
        var $fileDiv = $(obj).parent();
        fn_comm_ajax({
            url : "/ajax/board/boardFileDel.do",
            data : $("#sendForm").serialize()+"&FILE_SEQ="+$(obj).parent().find("[name^=FILE_SEQ]").val(),
            dataType : "json",
            success : function(data) {
                $fileDiv.remove(); 
            }
        });
    }else{
        $(obj).parent().remove();
    }
}

//게시물 선택복원
function fn_restoreItem(){
	
	if($("#listForm").find(".chk_list:checked").length < 1){
		alert('선택된 게시물이 없습니다.');
		return;
	}
	
	if (confirm('게시물을 복원하시겠습니까?')) {
		$.ajax({
			url : "/ajax/board/boardItemRestore.do",
	        data : $("#listForm").serialize(),
	        dataType : "json",
			success: function(resp) {
				if(resp != null){
					alert("게시물이 복원되었습니다.");
					fn_list();
	        	}else{
	        		alert("복원에 실패했습니다. 관리자에 문의하세요.");
	        	}
			}
		});
	}
}

//게시물 영구삭제 
function fn_completeDelItem(){
	
	if($("#listForm").find(".chk_list:checked").length < 1){
		alert('선택된 게시물이 없습니다.');
		return;
	}
	
	if (confirm('게시물을 영구삭제하시겠습니까?\n영구 삭제 시 복구가 불가능합니다.')) {
		$.ajax({
			url : "/ajax/board/boardItemCompleteDel.do",
	        data : $("#listForm").serialize(),
	        dataType : "json",
			success: function(resp) {
				if(resp != null){
					alert("게시물이 영구삭제되었습니다.");
					fn_list();
	        	}else{
	        		alert("영구삭제에 실패했습니다. 관리자에 문의하세요.");
	        	}
			}
		});
	}
}


/************************************************************************
 * 함수명 : fn_saveScrap
 * 설 명 : 게시물 스크랩
 * 인 자 :
 * 작성자 : bvs
 * 수정일 수정자 수정내용
 * ------ ------ -------------------
 * 2021.03.15 이승현 최초생성
 ************************************************************************/
function fn_saveScrap(){

    var msg = "";
    if($(".act_scrap").hasClass('on')){
        msg = "스크랩을 취소하시겠습니까?";
    } else {
        msg = "게시물을 스크랩하시겠습니까?";
    }
    if (confirm(msg)) {
        fn_comm_ajax({
            url : "/ajaxf/frCom/saveScrap.do",
            data : $("#scrapForm").serialize(),
            dataType : "json",
            success: function(data) {
                if(data != null ){
                	alert(data.MSG);
					if(data.RESULT == "SUCCESS"){
						if($(".btn_scrap").hasClass('on')){
							$(".btn_scrap").removeClass('on');
						}else{
							$(".btn_scrap").addClass('on');
						}
					}
                }
            }
        });
    }
    return false;
}

/************************************************************************
* 함수명 : fn_boardLikeUpdate
* 설 명 : 게시물 공감 구분값 변경
* 인 자 : 
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2021.07.14 dygo 최초작성
************************************************************************/
function fn_boardSympathyUpdate(){
	fn_comm_ajax({
	       url : "/ajax/board/boardSympathyUpdate.do",
	       data : "SITE_NO=" + $("#sendForm input:hidden[name=SITE_NO]").val() + "&BOARD_SEQ=" + $("#sendForm input:hidden[name=BOARD_SEQ]").val() + "&BBS_SEQ=" + $("#sendForm input:hidden[name=BBS_SEQ]").val(),
	       dataType : "json",
	       success : function(data) {
	    	   if(data != null ){
				   //alert(data.MSG);
	    		   fn_boardSympathyCnt();
			   }  
	       }
	    });
}

/************************************************************************
* 함수명 : fn_boardSympathyCnt
* 설 명 : 게시물 공감 별 카운트 
* 인 자 : 
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2021.07.14 dygo 최초작성
************************************************************************/
function fn_boardSympathyCnt(){
	fn_comm_ajax({
	       url : "/ajax/board/boardSympathyCnt.do",
	       data : "SITE_NO=" + $("#sendForm input:hidden[name=SITE_NO]").val() + "&BOARD_SEQ=" + $("#sendForm input:hidden[name=BOARD_SEQ]").val() + "&BBS_SEQ=" + $("#sendForm input:hidden[name=BBS_SEQ]").val(),
	       dataType : "json",
	       success : function(data) {
	    	   if(data != null ){
	    		   $('#boardSympathyCnt').text(data.boardSympathyCnt.CNT);
			   }  
	       }
	    });
}

/************************************************************************
* 함수명 : fn_setGongGongNuriVal
* 설 명 :  공공누리 값 세팅
* 인 자 : 
* 작성자 : bvs
* 수정일 수정자 수정내용
* ------ ------ -------------------
* 2021.07.14 dygo 최초작성
************************************************************************/
function fn_setGongGongNuriVal(){
	fn_comm_ajax({
	       url : "/ajax/board/getGongGongNuriTypeValue.do",
	       data : "SITE_NO=" + $("#sendForm input:hidden[name=SITE_NO]").val() + "&BOARD_SEQ=" + $("#sendForm input:hidden[name=BOARD_SEQ]").val() + "&BBS_SEQ=" + $("#sendForm input:hidden[name=BBS_SEQ]").val(),
	       dataType : "json",
	       success : function(data) {
	    	   if(data != null && data.gongGongNuriVal != null ){
	    		   $("#GONGGONGNURI_VAL").text(data.gongGongNuriVal.CMN_VALUE);
			   }  
	       }
	    });
}
/************************************************************************
 * 함수명 : fn_showBoardReportPop
 * 설 명 : 게시물 신고 팝업 출력 여부 
 * 인 자 : 
 * 작성자 : bvs
 * 수정일 수정자 수정내용
 * ------ ------ -------------------
 * 2021.07.14 dygo 최초작성
 ************************************************************************/
function fn_showBoardReportPop(){
	fn_comm_ajax({
	       url : "/ajax/board/boardReportExist.do",
	       data : "SITE_NO=" + $("#sendForm input:hidden[name=SITE_NO]").val() + "&BOARD_SEQ=" + $("#sendForm input:hidden[name=BOARD_SEQ]").val() + "&BBS_SEQ=" + $("#sendForm input:hidden[name=BBS_SEQ]").val(),
	       dataType : "json",
	       success : function(data) {
	    	   if(data == null || data == ""){
	    		   
	    	   }else{
	    		   $("#sendForm input:hidden[name=REPORT_YN]").val(data.REPORT_YN);
	    	   }
	       }
 });
}

/************************************************************************
 * 함수명 : fn_makeAttachFileIcon
 * 설 명 :  첨부파일이 존재하면 첨부파일 컬럼에 아이콘 생성
 * 인 자 :  data(boardFileList)
 * 작성자 : dygo
 * 수정일 수정자 수정내용
 * ------ ------ -------------------
 * 2021.07.28 dygo 최초생성
 * 2021.08.08 dygo 아이콘 디자인 추가(첨부파일,이미지 아이콘 추가 작업 필요)
 ************************************************************************/
 function fn_makeAttachFileIcon(data){
 	if(data.list.length > 0){
 		
 	    $(".openY").each(function(i){
 	    	
			var id = $(this).data('idno');
				
			var seq = data.list[i].BBS_SEQ;
			if(data.list[i].boardFileList.length > 0){
				var boardFileList = data.list[i].boardFileList;
				for(j=0; j<boardFileList.length; j++){
					var fileNm = boardFileList[j].FILE_NM;
					var typeCode = boardFileList[j].TYPE_CODE;
					var fileExt = boardFileList[j].EXT.toLowerCase();
					
	 				if(seq == id && typeCode=="C0501"){
	 					var extIcon = '<img src="/type/common/img/ico/'+fileExt+'.png" class="file_type_icon">';
		        		$(this).find(".attachFile").append(extIcon);
	 				}
				}
			}
 	    });
 	}
 }

/************************************************************************
 * 함수명 : fn_makeKwrdTd
 * 설 명 :  게시물 키워드 td 생성
 * 인 자 :  data(boardFileList)
 * 작성자 : dygo
 * 수정일 수정자 수정내용
 * ------ ------ -------------------
 * 2021.07.28 dygo 최초생성
 ************************************************************************/
function fn_makeKwrdTd(data){
	if(data.keywordList != null && data.keywordList.length > 0){
   		var keyword = "";
   		for(kwrd in data.keywordList){
       		var metaKwrd = "#"+data.keywordList[kwrd].META_KWRD_NAME+" ";
       		keyword += metaKwrd;
   		}
   		$("[name=KWRD]").append(keyword);
   	}
}

