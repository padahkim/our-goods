<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<header>
		<ul>
			<li>환영합니다. ${user.name}님!</li>
			<li><a href="${contextPath}/user/logout.do">로그아웃</a></li>
			<li><a href="${contextPath}/accounts/my_page">마이페이지</a></li> 
		</ul>
		
		<ul>
			<li><a href="${contextPath}/accounts/my_page/wish_list">위시리스트</a></li>
			<li><a href="${contextPath}/accounts/my_page/order_list">거래내역</a></li>
			<li><a href="${contextPath}/chat_list">채팅리스트</a></li> 
		</ul>
</header>

	<form method="post"   action="${contextPath}/user/modInfo.do">
	<h1  class="text_center">회원 정보 수정창</h1>
	<table  align="center">
		<tr>
	      <td width="200"><p align="right">아이디</td>
	      <td width="400"><input type="text" name="id" value="${user.id}" readonly></td>
	    </tr>
	   <tr>
	      <td width="200"><p align="right">비밀번호</td>
	      <td width="400"><input type="password" name="pw"></td>
	    </tr>
	    <tr>
	       <td width="200"><p align="right">이름</td>
	       <td width="400"><p><input type="text" name="name"></td>
	    </tr>
	    <tr>
	       <td width="200"><p align="right">이메일</td>
	       <td width="400"><p><input type="text" name="email1"></td>
	    </tr>
	    <tr>
	       <td width="200"><p align="right">이메일</td>
	       <td width="400"><p><input type="text" name="email2"></td>
	    </tr>
	    <tr>
	       <td width="200"><p align="right">번호</td>
	       <td width="400"><p><input type="text" name="phone"></td>
	    </tr>
	    <tr>
	       <td width="200"><p align="right">주소</td>
	       <td width="400"><p><input type="text" name="tcode"></td>
	    </tr>
	    <tr>
	       <td width="200"><p>&nbsp;</p></td>
	       <td width="400"><input type="submit" value="수정하기"><input type="reset" value="다시입력"></td>
	       <td><a href="${contextPath}/user/removeUser.do?id=${user.id}">탈퇴하기</a></td>
	    </tr>
	</table>
	</form>

</body>
</html>