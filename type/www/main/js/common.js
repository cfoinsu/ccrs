//aos init
AOS.init({
    duration: 1000,
    easing: "ease",
    offset: 0,
  });

/* 메인 컨텐츠 스크립트:s */
//팝업 슬라이드
$(window).load(function(){
	$('#popslider').slick({
        slide: 'div#pop-box',
        infinite : true, 
        slidesToShow : 1, 
        slidesToScroll : 1,
        autoplay : true,
        arrows : true, 
        vertical : false,
        pauseOnHover : true,
        arrows : true,
        draggable: true,
        breakpoint: 640,
        prevArrow : "<button type='button' class='slick-prev'>Previous</button>",
        nextArrow : "<button type='button' class='slick-next'>Next</button>",
    });
});
//secsion1 동영상 슬라이드 
$(function(){
    
});
//secsion1 재생, 일시정지 버튼 click 이벤트 
$(function () {
    var video = $('.swiper-slide').find('video');
    $(".controller").click(function () {
        $(this).toggleClass("play");
        if($(this).hasClass("play")) {
            video.trigger('play');
        } else {
            video.trigger('pause');
        }
    });
});
//secsion1 이전 슬라이드, 다음 슬라이드 아이콘 hover 이벤트
$(function () {
    $(".prev").hover(function () {
        $(this).toggleClass("move-left");
    });
    $(".next").hover(function () {
        $(this).toggleClass("move-right");
    });
});

/* 메인 컨텐츠 스크립트:e */

/* 서브 컨텐츠 스크립트:s */
//서브 컨텐츠 상단 탭 영역
$(document).ready(function () {
    $(".c-tab > li").click(function () {
        $(".c-tab > li").removeClass("active");
        $(this).addClass("active");
    });

    $('.anchor-list > li').click(function(){
        $('.anchor-list > li').removeClass("active");
        $(this).addClass("active");
    });

    $('.c-tab-label').click(function(){
        $(this).toggleClass("active");
        $(".c-tab").stop().slideToggle(300);
    });
});

//서브 컨텐츠 본문 탭 영역
$('.d-tab').each(function(){
    var loadTarget = $(this).find('li.active a').attr('href');
    $(loadTarget).addClass('active');

    $(this).find('> li > a').on('click', function(){
        var targetId = $(this).attr('href'), thisTxt = $(this).text();
        
        $(this).parents('.d-tab').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $(this).parents('.d-tab').find('li > a').attr('title','');
        $(this).attr('title','선택됨');
        $(targetId).parents('.d-targetbox').find('.d-target').removeClass('active');
        $(targetId).addClass('active');

        // trigger txt replace
        if ($(this).parents('.d-tabs').lenght != 0) {
            $(this).parents('.d-tabs').removeClass('active');
            $(this).parents('.d-tabs').find('.d-tab_trigger').text(thisTxt);
        }
        return false;
    });

    var now = $(this).find('> li.active > a').text();
    $(this).parents('.d-tabs').find('.d-tab_trigger').text(now);

    $(this).parents('.d-tabs').find('.d-tab_trigger').on('click', function(){
        if ($(this).parents('.d-tabs').lenght != 0) {
            $(this).parents('.d-tabs').toggleClass('active');
            return false;
        }
    });
});
//탭영역 컨텐츠 드롭다운 메뉴
$(function () {
    $(".board-dropdown > .d1").click(function () {
        $(".d1").toggleClass("active");
        $(".d2").stop().slideToggle(300);
    });
});
//게시판 컨텐츠 드롭다운 메뉴
$(function () {
    $(".list-dropdown > .d1").click(function () {
        $(".d1").toggleClass("active");
        $(".d2").stop().slideToggle(300);
    });
});
//서브 컨텐츠 게시판 페이지네이션
$(function () {
    $(".pagenation li").hover(function () {
        $(".pagenation li").removeClass("on");
        $(this).addClass("on");
    });
});
//서브 컨텐츠 게시판 북마크 클릭이벤트
//$(function () {
//    $(".mark").click(function () {
//        $(this).toggleClass("active");
//    });
//});
//sns버튼 클릭이벤트
$(function () {
    $(".btn-sns").click(function () {
        $(this).toggleClass("focus");
    });

    $(".btn-print").click(function () {
        $(this).toggleClass("focus");
    });
});

//본문 영역 인쇄 버튼
$(function () {
	$(document).ready(function () {
		$('.c-main-wrap').attr('id', 'content-wrap');
	});
	
	$(".share").click(function (){
		var url = '';    // <a>태그에서 호출한 함수인 clip 생성
        var textarea = document.createElement("textarea");  
        //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성
        
        document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
        url = window.document.location.href;  //url에는 현재 주소값을 넣어줌
        textarea.value = url;  // textarea 값에 url를 넣어줌
        textarea.select();  //textarea를 설정
        document.execCommand("copy");   // 복사
        document.body.removeChild(textarea); //extarea 요소를 없애줌
        
        alert("URL이 복사되었습니다.")  // 알림창
	});
	$(".print").click(function (){
		var initBody;
		window.onbeforeprint = function(){
		 initBody = document.body.innerHTML;
		 document.body.innerHTML =  document.getElementById('content-wrap').innerHTML;
		};
		window.onafterprint = function(){
		 document.body.innerHTML = initBody;
		};
		window.print();
		return false;
	});
	
	//상세페이지 프린트-본문영역만 인쇄
	$(".print-Detail").click(function (){
		var initBody;
		window.onbeforeprint = function(){
		 initBody = document.body.innerHTML;
		 document.body.innerHTML =  document.getElementById('content-wrap').innerHTML;
		};
		window.onafterprint = function(){
		 document.body.innerHTML = initBody;
		};
		window.print();
		return false;
	});
});
/* 서브 컨텐츠 스크립트:e */

/* 탭링크 */
//연구행정부서 탭링크
$(function(){
    if (location.hash == "#target1-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target1-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target1-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target1-2').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#target2-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target2-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target2-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target2-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#target2-3').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-4"){         
        $('.d-tab').find('li').eq(3).addClass('active').siblings().removeClass();         
        $('#target2-4').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-5"){         
        $('.d-tab').find('li').eq(4).addClass('active').siblings().removeClass();         
        $('#target2-5').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-6"){         
        $('.d-tab').find('li').eq(5).addClass('active').siblings().removeClass();         
        $('#target2-6').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-7"){         
        $('.d-tab').find('li').eq(6).addClass('active').siblings().removeClass();         
        $('#target2-7').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-8"){         
        $('.d-tab').find('li').eq(7).addClass('active').siblings().removeClass();         
        $('#target2-8').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target2-9"){         
        $('.d-tab').find('li').eq(8).addClass('active').siblings().removeClass();         
        $('#target2-9').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#section25"){         
        $('.d-tab').find('li').eq(8).addClass('active').siblings().removeClass();         
        $('#target2-9').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#target3-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target3-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target3-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target3-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target3-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#target3-3').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target3-4"){         
        $('.d-tab').find('li').eq(3).addClass('active').siblings().removeClass();         
        $('#target3-4').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target3-5"){         
        $('.d-tab').find('li').eq(4).addClass('active').siblings().removeClass();         
        $('#target3-5').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target3-6"){         
        $('.d-tab').find('li').eq(5).addClass('active').siblings().removeClass();         
        $('#target3-6').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#target4-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target4-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target4-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target4-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#target4-3').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-4"){         
        $('.d-tab').find('li').eq(3).addClass('active').siblings().removeClass();         
        $('#target4-4').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-5"){         
        $('.d-tab').find('li').eq(4).addClass('active').siblings().removeClass();         
        $('#target4-5').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-6"){         
        $('.d-tab').find('li').eq(5).addClass('active').siblings().removeClass();         
        $('#target4-6').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-7"){         
        $('.d-tab').find('li').eq(6).addClass('active').siblings().removeClass();         
        $('#target4-7').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-8"){         
        $('.d-tab').find('li').eq(7).addClass('active').siblings().removeClass();         
        $('#target4-8').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-9"){         
        $('.d-tab').find('li').eq(8).addClass('active').siblings().removeClass();         
        $('#target4-9').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#target4-10"){         
        $('.d-tab').find('li').eq(9).addClass('active').siblings().removeClass();         
        $('#target4-10').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#section45"){         
        $('.d-tab').find('li').eq(9).addClass('active').siblings().removeClass();         
        $('#target4-10').addClass('active').siblings().removeClass('active');     
    } 
});
//위원회 탭링크
$(function(){
    if (location.hash == "#target5-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target5-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target5-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target5-2').addClass('active').siblings().removeClass('active');     
    } 
});
//연구자원지원 탭링크
$(function(){
    if (location.hash == "#target7-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#target7-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#target7-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#target7-2').addClass('active').siblings().removeClass('active');     
    } 
});
//연구성과 탭링크
$(function(){
    if (location.hash == "#targetA1-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetA1-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetA1-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetA1-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetA1-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#targetA1-3').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#targetA2-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetA2-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetA2-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetA2-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetA2-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#targetA2-3').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#targetA3-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetA3-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetA3-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetA3-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetA3-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#targetA3-3').addClass('active').siblings().removeClass('active');     
    } 
});
//홍보자료 탭링크
$(function(){
    if (location.hash == "#targetP1-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetP1-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetP1-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetP1-2').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#targetP2-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetP2-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetP2-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetP2-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetP2-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#targetP2-3').addClass('active').siblings().removeClass('active');     
    } 
});
$(function(){
    if (location.hash == "#targetP3-1"){        
        $('.d-tab').find('li').eq(0).addClass('active').siblings().removeClass();         
        $('#targetP3-1').addClass('active').siblings().removeClass('active');    
    } else if(location.hash == "#targetP3-2"){         
        $('.d-tab').find('li').eq(1).addClass('active').siblings().removeClass();         
        $('#targetP3-2').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetP3-3"){         
        $('.d-tab').find('li').eq(2).addClass('active').siblings().removeClass();         
        $('#targetP3-3').addClass('active').siblings().removeClass('active');     
    } else if(location.hash == "#targetP3-4"){         
        $('.d-tab').find('li').eq(3).addClass('active').siblings().removeClass();         
        $('#targetP3-4').addClass('active').siblings().removeClass('active');     
    } 
});
//sns 버튼
function fn_snsOpen(type, paramNm1, param1, paramNm2, param2) {
    var cryptFlag = false;
    var currentUrl = $(location).attr("href");
    var encryptParam = "";
    if(paramNm1 != undefined) {
        if(paramNm1 == "searchWrd") {
            var encrypt = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(param1), CryptoJS.enc.Utf8.parse(passPhase), {
                mode: CryptoJS.mode.ECB
              , padding: CryptoJS.pad.Pkcs7
            });

            param1 = encodeURIComponent(encrypt.ciphertext.toString(CryptoJS.enc.Base64));
        }
        currentUrl = $(location).attr("href") + "?"+ paramNm1 +"="+ param1;
    }

    if(paramNm2 != undefined) {
        currentUrl = $(location).attr("href") + "?"+ paramNm1 +"="+ param1 + "&"+ paramNm2 +"="+ param2;
    }

    var title = $("#subContentSj").text();

    if(type == "facebook") {
        SNS.facebook(currentUrl, title);
    } else if (type == "twitter") {
        SNS.twitter(currentUrl, title);
    } else if (type == "naver") {
        SNS.naver(currentUrl,  title);
    }else if (type == "kakaoTalk") {
        SNS.kakaoTalk(currentUrl, title);
    }
    fn_insertCnrsHist(type, param1, title);
}

//슬라이드
function fn_slide(id,time) {
    var submenu = $("#"+id);
    submenu.slideToggle(time);
}
//URL카피 (버튼 입력 시 해당URL 복사)
function copyUrl(param, cryptParam) {
	var currentUrl = $(location).attr("href");
	if(param){
	    // 건강정보 상세화면에서 URL 복사한 경우
        currentUrl = currentUrl.split('?')[0]; // 파라미터 안 붙은 기본 URL
	    if(cryptParam) {
            var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(cryptParam), CryptoJS.enc.Utf8.parse(passPhase), {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
            currentUrl = currentUrl + param + encodeURIComponent(encrypted.ciphertext.toString(CryptoJS.enc.Base64));
	    } else {
            currentUrl = currentUrl + param;
        }
    }

    var textarea = document.createElement('textarea');
    textarea.textContent = currentUrl;
    document.body.appendChild(textarea);

    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(textarea);
    selection.removeAllRanges();
    selection.addRange(range);

    document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(textarea);

    alert("URL이 클립보드에 복사되었습니다");
}
//pdf 버튼
function fn_pdfDownload() {
debugger;
    var video = document.getElementsByTagName("video");
    var videoCnt = video.length;

    for(var i=0; i<videoCnt; i++) {
        var poster = video[i].getAttribute("poster");
        var videoParent = video[i].parentNode;

        var img = document.createElement("img");
        //TODO : 동적으로 변경 필요
        img.id = "pdfVideoImg"+[i];
        img.style.width="600px";
        img.style.display="block";
        img.style.margin="0px auto";
        img.style.objectFit="cover";
        img.style.maxWidth="100%";
        img.style.height="auto";

        if(poster != null && poster != undefined) {
            img.src = poster;
        } else {
            var cv = document.createElement("canvas");
            cv.width = video[i].videoWidth;
            cv.height = video[i].videoHeight;
            cv.getContext('2d').drawImage(video[i], 0, 0, cv.width, cv.height);
            var dataURL = cv.toDataURL();
            img.src = dataURL;
        }
        videoParent.appendChild(img);
        video[i].style.display = "none";
    }

	// 현재 document.id의 html을 A4 크기에 맞춰 PDF로 변환
    html2canvas($('.sub-content')[0], {
    	useCORS: true,
    	/*proxy:'../html2canvasproxy.php',*/
        onrendered: function (canvas) {
            // 캔버스를 이미지로 변환
            var imgData = canvas.toDataURL('image/png');

          //var imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
            var imgWidth = 190; // 이미지 가로 길이(mm) A4 기준
            //var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            var pageHeight = imgWidth * 1.562;  // 출력 페이지 세로 길이 계산 A4 기준
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            var doc = new jsPDF('p', 'mm');
            var position = 0;
            var marginLeft = 10;

            // 첫 페이지 출력
            doc.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // 한 페이지 이상일 경우 루프 돌면서 출력
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // 파일 저장
            doc.save($("#subContentSj").text() + '.pdf');

            //이미지로 표현
            //document.write('<img src="'+imgData+'" />');
        }

    });

	//pdf_wrap을 canvas객체로 변환
   /*  html2canvas($('#sub-content')[0]).then(function(canvas) {
        var doc = new jsPDF('p', 'mm', 'a4'); //jspdf객체 생성
	    var imgData = canvas.toDataURL('image/png'); //캔버스를 이미지로 변환
	    doc.addImage(imgData, 'PNG', 0, 0); //이미지를 기반으로 pdf생성
	    doc.save('sample-file.pdf'); //pdf저장
	  }); */

	/* html2canvas($("#sub-content"), {
        onrendered: function(canvas) {
            // canvas is the final rendered <canvas> element
            var myImage = canvas.toDataURL("image/png");
            window.open(myImage);
        }
    }); */

    for(var i=0; i<videoCnt; i++) {
        var videoParent = video[i].parentNode;
        video[i].style.display = "block";
        videoParent.removeChild(document.getElementById("pdfVideoImg"+[i]));
    }
}
function fn_print(div){
	var initBody = document.body.innerHTML; //body영역 저장
	window.onbeforeprint = function () { //프린터 출력 전 이벤트
		document.body.innerHTML = document.getElementById(div).innerHTML; //원하는 영역 지정 'div_print'
	}
	window.onafterprint = function () { //프린터 출력 후 이벤트
		document.body.innerHTML = initBody;
	}
	window.print();
}
