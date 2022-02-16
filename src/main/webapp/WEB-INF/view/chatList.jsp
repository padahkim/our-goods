<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>ChatList</title>
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<!-- <link rel="stylesheet" href="/resources/css/chatList.css"> -->
</head>
<body>

<%-- <%@include file="home.jsp" %> --%>

	<div class="wrapper">
		<input type="hidden" value="${user.getCode() }" id="buyuser_code"/>
	</div>
	 
	
	 <script type="text/javascript">
	 
	 //home.jsp에 있는 email 정보를 받아줌
	 	var user_code = $('#buyuser_code').val();
	 	console.log(user_code)
	 //html(JSP)파일이 로드되면 바로 initialize() 메서드를 실행시킴
		$(document).ready(initialize());
		
		function initialize() {
			getChatList();
			getUnreadMessageInfo();
			unreadAlertInfinite();
		}
		 
		//async(비동기)로 일정간격 업뎃되지 않아도 되는 img 파일을 불러옴
		function getChatList() {
			console.log("getChatList inprocess");
			$.ajax({
				url: "${contextPath}/chatList/ajax",
				type: "POST",
				data: JSON.stringify({
					user_code: user_code
				}),
				contentType: "application/json",
				//전달을 성공했을때 Controller로부터 data를 return 받아 처리해주는 메서드	
				success: function(data) {
					 
					 var parsed = JSON.parse(data);
					 var length = parsed.chatList.length;
					 for (var i = 0; i < length; i++) {
						 //채팅방 갯수만큼 반복문을 돌면서 채팅방 틀(div, img 태그)를 만들어줌 
						 addChatDivImg(i, parsed.chatList[i].pr_img_1);
					 }
				}
			});
			
		}
		
		 //async(비동기) 방식으로 일정간격 업데이트 되어야 하는 정보들(메세지 알림기능) 
		 function getUnreadMessageInfo() {
			 console.log("getUnreadMessageInfo inprocess");
				 $.ajax({
					 url:"${contextPath}/chatUnreadMessageInfo/ajax",
					 type: "POST",
					 data: JSON.stringify({
						 user_code: user_code
					 }),
					 contentType: "application/json",
					 success: function(data) {
						 var parsed = JSON.parse(data);
						 var length = parsed.chatList.length;
						 
						 for (var i = 0; i < length; i++) {
							$('.wrapSellerTitle' + i).html('');
							console.log(parsed.chatList[i]);
						 	addChatList(parsed.chatList[i].post_code, parsed.chatList[i].buyuser_code, parsed.chatList[i].post_title, parsed.chatList[i].post_code, parsed.chatList[i].messageUnread, i);
						 }
					 }
			 });
		 }
	 	
		 
		 //1000milliseconds(==1초) 간격으로 getUnreadMessageInfo()를 실행시키는 반복 메서드
	 	function unreadAlertInfinite() {
	 		setInterval(() => {
	 			getUnreadMessageInfo();				
			}, 1000);
	 	}
	 	
	 	//일정 간격으로 업데이트된 데이터를 화면에 출력하는 메서드 됨
	 	function addChatList(post_code, buyuser_code, senderName, post_title, messageUnread, idx) {
	 		var str =
	 		'<a href="${contextPath}/chatRoom/' + 
	 		post_code +
	 		'/' + 
	 		buyuser_code + 
	 		'">' +
	 		'<h3><span id="sellerName">' + 
	 		senderName +
	 		'&nbsp;</span>' +
	 		'<span id="title">' + 
	 		post_title + 
	 		'</span><span id="message">' + 
	 		messageUnread+'</span></h3></div></a>';
	 		
	 		//HTML화면의 <div class="wrapSellerTitle0,1,...etc"> 하위에 str 변수를 추가해준다.		 		 
	 		 $('.wrapSellerTitle' + idx).append(str);
	 	} 
	 	
	 	//페이지가 로드되는 시점 한 번만 출력하면 되는 div, img를 출력하는 메서드
	 	function addChatDivImg(idx, img) {
	 			console.log("여기는?")
	 			$(document.body).append('<div class= chatMessageInfo' + idx + '><div class="wrapPr_img"><img class="pr_img" src="' + img + '"></div><div class="wrapSellerTitle' +
	 					idx +
	 					'"></div></div>');
	 	}
	 	
	 	
	 </script>
</body>
</html>
