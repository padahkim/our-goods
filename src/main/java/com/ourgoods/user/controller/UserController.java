package com.ourgoods.user.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ourgoods.user.vo.UserVO;



public interface UserController {
public Map<String,Object> login(@RequestBody Map<String,Object> paramMap,
			RedirectAttributes redirectAttributes,
			HttpServletRequest request, HttpServletResponse response) throws Exception;
public Map<String,Object> logout(@RequestBody Map<String,Object> paramMap,HttpServletRequest request, HttpServletResponse response) throws Exception;

public Map<String,Object> removeUser(@RequestBody Map<String,Object> paramMap, HttpServletRequest request, HttpServletResponse response) throws Exception;

public Map<String,Object> modInfo(@RequestBody Map<String,Object> paramMap,@ModelAttribute("user") UserVO userVO,HttpServletRequest request, HttpServletResponse response) throws Exception;


}
