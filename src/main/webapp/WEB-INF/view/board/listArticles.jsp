<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    isELIgnored="false" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>    
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath"  value="${pageContext.request.contextPath}"  />
<%
  request.setCharacterEncoding("UTF-8");
%>  
<!DOCTYPE html>
<html>
<head>
 <style>
   .cls1 {text-decoration:none;}
   .cls2 {text-align:center; font-size:30px;}
   ul, li{ list-style-type: none; padding:0; }
   ul{ width:100px; margin : 25px auto; }
   li{ display:inline-block; }
   a{ text-decoration: none; color: inherit; }
   a:hover{ color:blue; }
  </style>
  <meta charset="UTF-8">
  <title>글목록창</title>
</head>
<script>
	function fn_articleForm(isLogOn,articleForm,loginForm){
	  if(isLogOn != '' && isLogOn != 'false'){
	    location.href=articleForm;
	  }else{
	    alert("로그인 후 글쓰기가 가능합니다.")
	    location.href=loginForm+'?action=/board/write';
	  }
	}
</script>
<body>
<table align="center" border="1"  width="80%"  >
  <tr height="10" align="center"  bgcolor="lightgreen">
     <td >글번호</td>
     <td >작성자</td>              
     <td >제목</td>
     <td >작성일</td>
     <td >조회수</td>
  </tr>
<c:choose>
  <c:when test="${boardList ==null }" >
    <tr  height="10">
      <td colspan="4">
         <p align="center">
            <b><span style="font-size:9pt;">등록된 글이 없습니다.</span></b>
        </p>
      </td>  
    </tr>
  </c:when>
  <c:when test="${boardList !=null }" >
    <c:forEach  var="board" items="${boardList }" varStatus="articleNum" >
     <tr align="center">
	<td width="5%">${articleNum.count}</td>
	<td width="5%">${board.scode}</td>
	<td align='left'  width="35%">
			<span style="padding-right:30px"></span>
	       	<a class='cls1' href="${contextPath}/board/view?pcode=${board.pcode}">${board.ptitle}</a>
	  </td>
	  <td  width="10%">${board.insertTime}</td> 
	  <td  width="10%">${board.pnumber}</td> 
	</tr>
    </c:forEach>
     </c:when>
    </c:choose>
</table>

<nav>
	<ul>
		<li><a href="#"><span>&laquo;</span></a></li>
		<li><a href="#">1</a></li>
		<li><a href="#">2</a></li>
		<li><a href="#">3</a></li>
		<li><a href="#">4</a></li>
		<li><a href="#">5</a></li>
		<li><a href="#"><span>&raquo;</span></a></li>
	</ul>
</nav>

<!-- <a  class="cls1"  href="#"><p class="cls2">글쓰기</p></a> -->
<a  class="cls1"  href="javascript:fn_articleForm('${isLogOn}','${contextPath}/board/write', 
                                                    '${contextPath}/member/loginForm')"><p class="cls2">글쓰기</p></a>
</body>
</html>