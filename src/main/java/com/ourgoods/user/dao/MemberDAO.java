package com.ourgoods.user.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;

import com.ourgoods.user.vo.UserVO;


@Mapper
public interface MemberDAO {
	public List<UserVO> userList();
	
	public UserVO fetchUserById(int id);
	
	public void insertUser(UserVO user) throws DataAccessException;
	
	public int checkById(String id) throws DataAccessException;
	
	public UserVO loginById(UserVO userVO) throws DataAccessException;
	
	public int removeUser(String id) throws DataAccessException;
	
	public void modInfo(UserVO userVO) throws DataAccessException;
	
	public UserVO selectInfo(String id) throws DataAccessException;
	

}
