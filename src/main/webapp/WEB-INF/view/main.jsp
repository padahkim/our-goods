<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" 
    isELIgnored="false"  %>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"  %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />

<%
  request.setCharacterEncoding("UTF-8");
%> 
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<c:choose>
	<c:when test="${isLogOn == true  && user!= null}">
		<header>
			<ul>
				<li>환영합니다. ${user.name}님!</li>
				<li><a href="${contextPath}/user/logout.do">로그아웃</a></li>
				<li><a href="${contextPath}/accounts/my_page">마이페이지</a></li>
				 <%-- <li><a href="${contextPath}/post">포스트로 이동</a></li> --%>
				<li><a href="${contextPath}/board/list">글게시판</a></li>
				<li><a href="${contextPath}/board/write">글쓰기</a></li>
			
				
			</ul>
		</header>
	</c:when>
	
	<c:otherwise>
			<header>
				<ul class="log">
					<li class="signup"><a
						href="*"> 회원가입 </a></li>
					<li class="singin"><a
						href="${contextPath}/accounts/login"> 로그인 </a></li>
				</ul>
			</header>
		</c:otherwise>
</c:choose>
<p>main page</p>
</body>
</html>