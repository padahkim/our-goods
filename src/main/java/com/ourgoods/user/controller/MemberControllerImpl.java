package com.ourgoods.user.controller;

import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ourgoods.user.dao.MemberDAO;
import com.ourgoods.user.dao.UserDAO;
import com.ourgoods.user.service.MemberService;
import com.ourgoods.user.service.UserService;
import com.ourgoods.user.vo.UserVO;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/member")
public class MemberControllerImpl {
	
	private static final Logger logger = LoggerFactory.getLogger(MemberControllerImpl.class);
	
	@Autowired
	private JavaMailSender javaMailSender;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public List<UserVO> userList() {
		System.out.println(userDAO.userList());
		System.out.println("USER LIST");
		return userDAO.userList();
	}
	
	@PostMapping("/addMembers")
	void insertUser(@RequestBody UserVO user) throws Exception {
		logger.info("AddMemebers Called");
		logger.info("AddMember : " + user);
		userService.addMember(user);
	}
	
	@PostMapping("/memberIdCheck")
	public String memberIdCheck(String id) throws Exception{
		logger.info("memberIdCheck called");
		
		int result = userDAO.checkById(id);
		
		logger.info("결과값 = " + result);

		// id의 수가 0보다 크다면
		// 하나이상의 id 가 존재하므로 중복된 id이다
		if (result != 0) {

			return "fail";

		} else {

			return "success";

		}
	}
	
	@PostMapping("/mailCheck")
	public String mailCheckByEmail(String email) throws Exception {
		logger.info("이메일 데이터 전송 확인");
		logger.info("인증번호 : " + email);
		
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
		
		/* 인증번호(난수) 생성 */
		Random random = new Random();
		int checkNum = random.nextInt(8888) + 1111;

		logger.info("인증번호 " + checkNum);

		String htmlString = "Our Goods를 방문해주셔서 진심으로 환영합니다" + "<br><br>" + " 인증번호: " + checkNum + " 입니다." + "<br><br>"
				+ "해당 인증번호를 인증번호 확인란에 기입하여 주세요.";
		try {
			helper.setTo(email);
			helper.setSubject("안녕하세요? Our Goods 입니다.");
			helper.setText(htmlString, true);
			javaMailSender.send(mimeMessage);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

		String num = Integer.toString(checkNum);

		return num;
	}
}
