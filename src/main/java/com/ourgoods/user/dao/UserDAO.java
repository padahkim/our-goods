package com.ourgoods.user.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.ourgoods.user.vo.UserVO;



@Mapper
@Repository("userDAO")
public interface UserDAO {

	public UserVO loginById(@RequestBody Map<String,Object> paramMap) throws DataAccessException;
	
	//public UserVO loginById(UserVO userVO) throws DataAccessException;

	public int removeUser(@RequestBody Map<String,Object> paramMap) throws DataAccessException;
	
	public void modInfo(@RequestBody Map<String,Object> paramMap) throws DataAccessException;
	
	public UserVO selectInfo(@RequestBody Map<String,Object> paramMap) throws DataAccessException;
	
	public List<UserVO> userList();
	
	public UserVO fetchUserById(int id);
	
	public void insertUser(UserVO user) throws DataAccessException;
	
	public int checkById(String id) throws DataAccessException;
	
}