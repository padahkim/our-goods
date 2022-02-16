package com.ourgoods.mypage.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

import com.ourgoods.mypage.vo.ChatRoomVO;
import com.ourgoods.mypage.vo.OrderVO;
import com.ourgoods.mypage.vo.PostVO;
import com.ourgoods.mypage.vo.WishListVO;

@Mapper
@Repository("mypageDAO")
public interface MyPageDAO {
	
	public List selectwishlist(WishListVO wishlistVO) throws DataAccessException;
	
	public List selectselllist(PostVO postVO) throws DataAccessException;
	
	public List chatroomlist(ChatRoomVO chatroomVO) throws DataAccessException;
	
	public List selectbuylist(OrderVO orderVO) throws DataAccessException;
	
	public List searchlist(String keyword) throws DataAccessException;


}
