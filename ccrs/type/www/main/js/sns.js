Kakao.init('708783923166dc0dfef004b6d7c28199');
Kakao.isInitialized();

var SNS = {
	facebook: function (link, title) {
		//link = "http://kcdc.goability.co.kr/health_cfdvis/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoMain.do?lclasSn=0#";
		link = encodeURIComponent(link);
		var url = "http://www.facebook.com/share.php?p[url]=" + link + "&p[title]=" + title;
		window.open(url, '', 'width=600, height=400, left=600');
	}
	,twitter: function (link, title) {
		link = encodeURIComponent(link);
		var url = 'https://twitter.com/intent/tweet?text='+ title +'&url='+ link
		window.open(url, '', 'width=600, height=400, left=600');
	}
	,naver: function (link, title) {
		//link = "http://kcdc.goability.co.kr/health_cfdvis/biz/health/gnrlzHealthInfo/gnrlzHealthInfo/gnrlzHealthInfoMain.do?lclasSn=0#";
		link = encodeURI(encodeURIComponent(link));
		var url = "https://share.naver.com/web/shareView.nhn?url=" + link + "&title=" + title;
		window.open(url, '', 'width=600, height=400, left=600');
	}
	,KakaoTalk: function (link, title) {
		var host = $(location).attr('host');
		var imgUrl = host + '/niid/static/common/images/logo/header_logo.png';
		//var imgUrl = 'https://health.kdca.go.kr/healthinfo/static/images/common/kakao-img.jpg'; //로컬,개발용
		Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: '국립감염병연구원',
				description: title,
				imageUrl: imgUrl,
				link: {
					mobileWebUrl: link,
					webUrl: link,
				},
			},
			buttons: [
				{
					title: '자세히 보기',
					link: {
						mobileWebUrl: link,
						webUrl: link,
					},
				},
			],
		});
	}
}