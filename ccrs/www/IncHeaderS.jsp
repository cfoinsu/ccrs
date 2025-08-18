<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
 Class Name : IncHeaderS.jsp
 Description : 서브페이지 헤더
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="format-detection" content="telephone=no" />
<meta property="og:url" content="${DOMAIN }${BASE_PATH }/index.do" />
<meta property="og:title" content="${META_TITLE }" />
<meta property="og:description" content="${META_DESC }" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${SITE_TITLE }"/>
<meta property="og:image" content="${DOMAIN }/type/www/img/layout/logo_color.png" />
<title><c:out value="${SITE_TITLE }"/> <c:out value="${META_SUB_DESC }" /></title>

<link rel="shortcut icon" href="/type/common/img/common/ico_favicon.png" />

<%--<link rel="stylesheet" type="text/css" href="/type/common/css/common.css" /><!-- reset -->--%>
<link rel="stylesheet" type="text/css" href="/type/common/css/board.css" /><!-- board -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/layout.css" /><!-- 개별 -->
<link rel="stylesheet" type="text/css" href="/type/common/css/kor.css" /><!-- contents -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/main.css"><!-- main -->


<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/styles.css" /><!-- 신규 -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/common.css" /><!-- 신규 -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/main.css" /><!-- 신규 -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/sub.css" /><!-- 신규 -->
<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/cdn/krds.min.css" />

<%--커스텀--%>
<%--<link rel="stylesheet" type="text/css" href="/type/${TEMP_CD}/css/styles_custom.css" />--%>

<!--[if lt IE 9]>
<script src="../js/html5shiv.js"></script>
<![endif]-->

<script src="/type/common/js/jquery-2.2.1.min.js"></script>
<!-- <script src="/type/common/js/jquery-3.5.1.min.js"></script> -->
<script src="/type/common/js/jquery.easing.1.3.js"></script>

<link rel="stylesheet" href="/type/common/css/jquery-ui.css" />
<link rel="stylesheet" href="/type/common/css/jquery-ui.theme.css" />

<link rel="stylesheet" type="text/css" href="/type/common/js/slick/slick.css"/><!-- 슬라이더 -->
<script src="/type/common/js/slick/slick.min.js"></script><!-- 슬라이더 -->
<script src="/type/common/js/slick/slick.acc.js"></script><!-- 슬라이더 -->
<script src="/type/common/js/sly-master/sly.min.js"></script>

<link rel="stylesheet" type="text/css" href="/type/common/js/mCustomScrollbar/jquery.mCustomScrollbar.css" /><!-- 커스텀스크롤 -->
<script src="/type/common/js/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js"></script><!-- 커스텀스크롤 -->

<script src="/type/common/js/board.js"></script><!-- board -->

<script src="/type/common/js/jquery.form.js"></script>
<script src="/type/common/js/jquery-ui.min.js"></script>
<script src="/type/common/js/comm_fr.js"></script>
<script src="/type/common/js/util.js"></script>
<script src="/type/common/js/jquery.tmpl.js"></script>

<script src="/type/common/js/clipboard.min.js"></script>
<script src="/type/admin/js/printThis.js"></script>