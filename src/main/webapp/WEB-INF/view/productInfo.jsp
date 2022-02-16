<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
</head>

<script type="text/javascript">
	function formSubmit() {
		document.getElementById('nickName_form').submit();
	}		 	
	
 	function chatSubmit() {
 		document.getElementById('chatSubmit_form').submit();
 	} 
</script>
	
<body>
	<div class="buy_chat">
		<form:form id="chatSubmit_form" action="/ourgoods/chatMessage" method="GET" modelAttribute="chatRoom">
			<form:input path="post_code" placeholder="게시글코드"/>
			<form:input path="pr_title"  placeholder="게시글 제목"/>
			<a href="javascript:{}" onclick="chatSubmit()">
			

				<form:input type="hidden" path="seller_name" value="gildong"/>
				
				<form:input type="hidden" path="seller_code" value="1"/>
				
				<button id="btn_chat">
					채팅으로 거래하기
				</button>
			</a>
		</form:form>
	</div>
</body>
</html>