package com.ourgoods.mypage.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ourgoods.mypage.service.MyPageService;
import com.ourgoods.mypage.vo.ChatRoomVO;
import com.ourgoods.mypage.vo.OrderVO;
import com.ourgoods.mypage.vo.PostVO;
import com.ourgoods.mypage.vo.WishListVO;
import com.ourgoods.user.service.UserService;
import com.ourgoods.user.vo.UserVO;

@RestController
@SessionAttributes("sessionId")
public class MyPageControllerImpl implements MyPageController {

	@Autowired
	private MyPageService mypageService;

	@Autowired
	private UserService userService;

	@Autowired
	private UserVO userVO;

	@Autowired
	private OrderVO orderVO;

	@Autowired
	private PostVO postVO;

	@Autowired
	private WishListVO wishlistVO;

	@Autowired
	private ChatRoomVO chatroomVO;

	@Override
	@RequestMapping(value="member/my_page/wish_list", method = RequestMethod.POST)
	public List wishlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		System.out.println(paramMap);
		HttpSession session = request.getSession();
		UserVO userVO = (UserVO)session.getAttribute("user");
		
		System.out.println(paramMap.get("id").equals(userVO.getId()));
		if(paramMap.get("id").equals(userVO.getId())) {
			wishlistVO.setWucode(userVO.getCode());
			List wishlist = mypageService.wishlist(wishlistVO);
			System.out.println(wishlist);
			return wishlist;
		}else {
			
			return null;
		}
	}

	@Override
	@RequestMapping(value="member/my_page/order_list", method = RequestMethod.POST)
	public Map<String,Object> orderlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request,HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		System.out.println(paramMap);
		HttpSession session = request.getSession();
		UserVO userVO = (UserVO)session.getAttribute("user");
		
		System.out.println(paramMap.get("id").equals(userVO.getId()));
		if(paramMap.get("id").equals(userVO.getId())) {
			orderVO.setBcode(userVO.getCode());
			postVO.setScode(userVO.getCode());
			List buylist = mypageService.buylist(orderVO);
			List selllist = mypageService.selllist(postVO);
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("buylist", buylist);
			resultMap.put("selllist",selllist);
			System.out.println(buylist);
			System.out.println(selllist);
			return resultMap;
		}else {
			
			return null;
		}

	}

	@Override
	@RequestMapping(value="member/my_page/chat_list", method = RequestMethod.POST)
	public List chatlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		HttpSession session = request.getSession();
		UserVO userVO = (UserVO)session.getAttribute("user");
		
		if(paramMap.get("id").equals(userVO.getId())) {
			chatroomVO.setBucode(userVO.getCode());
			List chatlist = mypageService.chatlist(chatroomVO);
			
			return chatlist;
		}else {
			
			return null;
		}
	}

	@Override
	@RequestMapping(value="/member/my_page", method = RequestMethod.POST)
	public Map<String, Object> mypage(Map<String, Object> paramMap, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		System.out.println(paramMap);

		HttpSession session = request.getSession();
		
		UserVO userVO = (UserVO)session.getAttribute("user");
		String id = userVO.getId();
		String name = userVO.getName();
		String pw = userVO.getPw();
		String email = userVO.getEmail();
		String phone = userVO.getPhone();
		String address = userVO.getAddress();
		System.out.println(userVO);
		System.out.println(address);

		System.out.println(paramMap.get("id").equals(id));
		if(paramMap.get("id").equals(id)) {
			Map<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("id",id);
			resultMap.put("name",name);
			resultMap.put("pw", pw);
			resultMap.put("email", email);
			resultMap.put("phone", phone);
			resultMap.put("address", address);
			
			System.out.println(resultMap);
			return resultMap;
			
		}else {
			return null;
		}
	}
	@Override
	@RequestMapping(value="/search.do", method = RequestMethod.POST)
	public List search(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		System.out.println(paramMap);
		List searchlist = mypageService.searchlist((String)paramMap.get("keyword"));
		System.out.println("searchlist" + searchlist);
		
		return searchlist;
	}

}
	



