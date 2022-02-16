package com.ourgoods.user.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import com.ourgoods.user.dao.UserDAO;
import com.ourgoods.user.vo.UserVO;


@Service("userService")
@Transactional(propagation = Propagation.REQUIRED)
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDAO userDAO;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserVO userVO;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public void addMember(UserVO userVO) throws Exception {
		String encodePassword = passwordEncoder.encode(userVO.getPw());
		userVO.setPw(encodePassword);
		userDAO.insertUser(userVO);
	} 

	@Override
	public UserVO login(@RequestBody Map<String,Object> paramMap) throws Exception {
		System.out.println("This paramMap: " + paramMap);
		
		return userDAO.loginById(paramMap);
	}

//	@Override
//	public UserVO login(UserVO userVO) throws Exception {
//		String encodePassword = passwordEncoder.encode(userVO.getPw());
//		userVO.setPw(encodePassword);
//		return userDAO.loginById(encodePassword);
//	}

//	@Override
//	public boolean validationLogin(String email, String password) {
//		   UserVO loginUser = userDAO.loginById(password);
//		   
//		   System.out.println("loginUser: " + loginUser);
//		   
//		   if(loginUser==null) {
//		      System.out.println("해당 이메일의 유저가 존재하지 않습니다.");
//		      return false;
//		   }
//
//		   if(!passwordEncoder.matches(password, loginUser.getPw())) {
//		      System.out.println("비밀번호가 일치하지 않습니다.");
//		      return false;
//		   }
//
//		   return true;
//		}
	
	@Override
	public int removeUser(@RequestBody Map<String,Object> paramMap) throws Exception {
		//프론트에서 아이디만 보냄
		return userDAO.removeUser(paramMap);
	}

	@Override
	public UserVO modInfo(@RequestBody Map<String,Object> paramMap) throws Exception {
		//프론트에서 id 및 수정정보 보냄

		userDAO.modInfo(paramMap);

		
		return userDAO.selectInfo(paramMap);
	}

	@Override
	public boolean validationLogin(String email, String password) throws Exception {
		// TODO Auto-generated method stub
		return false;
	}
	
	

}






