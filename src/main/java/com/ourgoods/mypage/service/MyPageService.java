package com.ourgoods.mypage.service;

import java.util.List;

import org.springframework.dao.DataAccessException;

import com.ourgoods.mypage.vo.ChatRoomVO;
import com.ourgoods.mypage.vo.OrderVO;
import com.ourgoods.mypage.vo.PostVO;
import com.ourgoods.mypage.vo.WishListVO;

public interface MyPageService {
	
	public List wishlist(WishListVO wishlistVO) throws DataAccessException;
	
	public List chatlist(ChatRoomVO chatroomVO) throws DataAccessException;
	
	public List selllist(PostVO postVO) throws DataAccessException;
	
	public List buylist(OrderVO orderVO) throws DataAccessException;
	
	public List searchlist(String keyword) throws DataAccessException;
}
