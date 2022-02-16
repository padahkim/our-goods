<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"   isELIgnored="false"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />

<%
  request.setCharacterEncoding("UTF-8");
%>    

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>메인 페이지</title>
  <script src="http://code.jquery.com/jquery-latest.js"></script>
</head>
<body>
   <h1>메인 페이지입니다!!</h1>
   
   <div>
       <c:choose>
          <c:when test="${isLogOn == true  && member!= null}">
            <h3>환영합니다. ${member.name}님</h3>
            <a href="${contextPath}/member/logout"><h3>로그아웃</h3></a>
          </c:when>
          <c:otherwise>
	        <a href="${contextPath}/member/loginForm"><h3>로그인</h3></a>
	      </c:otherwise>
	   </c:choose>     
     </div>
     
     <div>
     	<a href="${contextPath}/board/list">글게시판</a>
     </div>
     
     <div>
     	<a href="${contextPath}/board/imgList">이미지로 보기</a>
     </div>
     
     <div>
     	<a href="${contextPath}/board/write">글쓰기</a>
     </div>
</body>
</html>