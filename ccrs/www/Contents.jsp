<%@ page contentType="text/html;charset=utf-8" pageEncoding="UTF-8"%>

<%--
 Class Name : Contents.jsp
 Description : 프로그램 본문 내용
 Modification Information
 수정일 수정자 수정내용
 ------- -------- ---------------------------
 2021.03.15 bvs 최초 생성
 --%>
 
<%
String jspPath = (String) request.getAttribute("jspPath");
if(jspPath == null) response.sendError(HttpServletResponse.SC_NOT_FOUND);
else request.getRequestDispatcher(jspPath+".jsp").include(request, response);
%>