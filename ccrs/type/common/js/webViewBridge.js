$(function(){
	//공통
	$(document).on('click', ".mBtn_booking", function(){
		if (window.ReactNativeWebView) {
			// 모바일이라면 모바일의 카메라 권한을 물어보는 액션을 전달합니다.
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: "CALL_QRS" })
			);
		} else {
			// 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
			alert({ message: ERROR_TYPES.notMobile });
		}
	});
	$(document).on('click', ".mBtn_Seting", function(){
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: "CALL_BIO" })
			);
		} else {
			// 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
			alert({ message: ERROR_TYPES.notMobile });
		}
	});
	
	$(document).on('click', ".mBtn_Home", function(){
		if (window.ReactNativeWebView) {
			window.ReactNativeWebView.postMessage(
				JSON.stringify({ type: "CALL_RTN" })
			);
		} else {
			// 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
			alert({ message: ERROR_TYPES.notMobile });
		}
	});
	
	window.addEventListener('message', (e) => alert(e.data));
	document.addEventListener('message', (e) => alert(e.data));
});
