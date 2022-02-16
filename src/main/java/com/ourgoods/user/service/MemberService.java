package com.ourgoods.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ourgoods.user.dao.MemberDAO;
import com.ourgoods.user.vo.UserVO;

@Service("memberService")
@Transactional(propagation = Propagation.REQUIRED)
public class MemberService {
	
	@Autowired
	private MemberDAO memberDAO;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserVO userVO;
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	public void addMember(UserVO userVO) throws Exception {
		String encodePassword = passwordEncoder.encode(userVO.getPw());
		userVO.setPw(encodePassword);
		memberDAO.insertUser(userVO);
	} 
	
}
