package com.ourgoods.mypage.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.ModelAndView;

public interface MyPageController {
	
    public List wishlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	public Map<String,Object> orderlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	public List chatlist(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	public Map<String,Object> mypage(@RequestBody Map<String,Object> paramMap,HttpServletRequest request, HttpServletResponse response) throws Exception;
	
	public List search(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception;

}

