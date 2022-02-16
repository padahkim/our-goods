package com.ourgoods.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ourgoods.user.service.UserService;
import com.ourgoods.user.service.UserServiceImpl;
import com.ourgoods.user.vo.UserVO;

@RestController("userController")
@SessionAttributes("sessionId")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class UserControllerImpl implements UserController {
	
	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserVO userVO;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@RequestMapping(value="/")
	public ModelAndView main() {
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping(value="/manage")
	public ModelAndView manage() {
		ModelAndView mav = new ModelAndView("manage");
		return mav;
	}
	
	@RequestMapping(value="/postpage")
	public ModelAndView postpage() {
		ModelAndView mav = new ModelAndView("postpage");
		return mav;
	}
		
	@Override
	@RequestMapping(value = "/member/login", method = RequestMethod.POST)
	public Map<String,Object> login(@RequestBody Map<String,Object> paramMap, 
			RedirectAttributes rAttr, 
			HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		userVO = userService.login(paramMap);
		
		System.out.println("UserGetID = " + userVO.getId());
		System.out.println("UserGetPWD = " + userVO.getPw());
		String userid = userVO.getId();
		
		boolean memberCheck = checkLogin(paramMap, userVO);
		System.out.println("Checking log in");
		System.out.println(memberCheck);
		userVO.setPw(userVO.getPw());
		userVO.setId(userVO.getId());
		if (memberCheck != false) {
			System.out.println("userVO = " + userVO);
			HttpSession session = request.getSession();
			session.setAttribute("user", userVO);
			session.setAttribute("isLogOn", true);
			
			resultMap.put("userid", userid);
			resultMap.put("isLogon", true);
		}
		
		return resultMap;
	}
	
	private boolean checkLogin(@RequestBody Map<String,Object> paramMap, UserVO member) throws Exception {
		
		userVO = userService.login(paramMap);
		System.out.println("userService.login(paramMap) = " + userService.login(paramMap));

		if (userVO == null) {
			System.out.println("memVO is NULL");
			return false;
		}

		if (!passwordEncoder.matches((String)paramMap.get("pw"), userVO.getPw())) {
			System.out.println("PW does not match");
			System.out.println(member.getPw());
			System.out.println();
			return false;
		}	
		System.out.println("TRUE");
		return true;
	}

	@Override
	@RequestMapping(value = "/member/logout", method =  RequestMethod.POST)
	public Map<String,Object> logout(@RequestBody Map<String,Object> paramMap,HttpServletRequest request, HttpServletResponse response) throws Exception {
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		session.setAttribute("isLogOn",false);

		System.out.println(paramMap);
		
		Map<String,Object> resultMap = new HashMap<String, Object>();
		resultMap.put("isLogon", false);
		
		
		return resultMap;
	}
	

	@Override
	@RequestMapping(value="/member/my_page/removeUser.do", method = RequestMethod.POST)
	public Map<String,Object> removeUser(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		
		System.out.println(paramMap);
		
		userService.removeUser(paramMap);
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		session.setAttribute("isLogOn",false);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("removeStatus", true);
		//resultMap.put("isLogon", false);
		return resultMap;
	}

	
	@Override
	@RequestMapping(value="/member/my_page/modInfo.do", method = RequestMethod.POST)
	public Map<String,Object> modInfo(@RequestBody Map<String,Object> paramMap,@ModelAttribute("user") UserVO user,
			 HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		request.setCharacterEncoding("utf-8");
		System.out.println(paramMap);
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		String encodePassword = passwordEncoder.encode((String)paramMap.get("pw"));
		paramMap.put("pw", encodePassword);
		UserVO user1 = userService.modInfo(paramMap);
		System.out.println(user1);
		session.setAttribute("user",user1);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("modStatus", true);

		return resultMap;
	}

}

	


