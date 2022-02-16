package com.ourgoods.user.service;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;

import com.ourgoods.user.vo.UserVO;

public interface UserService {
	
	public UserVO login(@RequestBody Map<String,Object> paramMap) throws Exception;
	
	//public UserVO login(UserVO userVO) throws Exception;
	
	public boolean validationLogin(String email, String password) throws Exception;
	
	public int removeUser(@RequestBody Map<String,Object> paramMap) throws Exception;
	
	public UserVO modInfo(@RequestBody Map<String,Object> paramMap) throws Exception;
	
	public void addMember(UserVO userVO) throws Exception;

}
