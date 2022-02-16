package com.ourgoods.mypage.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ourgoods.mypage.dao.MyPageDAO;
import com.ourgoods.mypage.vo.ChatRoomVO;
import com.ourgoods.mypage.vo.OrderVO;
import com.ourgoods.mypage.vo.PostVO;
import com.ourgoods.mypage.vo.WishListVO;

@Service("mypageService")
@Transactional(propagation = Propagation.REQUIRED)
public class MypageServiceImpl implements MyPageService{
	
	@Autowired
	private MyPageDAO mypageDAO;

	@Override
	public List wishlist(WishListVO wishlistVO) throws DataAccessException {
		List wishlist = null;
		wishlist = mypageDAO.selectwishlist(wishlistVO);
		return mypageDAO.selectwishlist(wishlistVO);
	}

	@Override
	public List chatlist(ChatRoomVO chatroomVO) throws DataAccessException {
		List chatlist = null;
		chatlist = mypageDAO.chatroomlist(chatroomVO);
		return chatlist;
	}

	@Override
	public List selllist(PostVO postVO) throws DataAccessException {
		List selllist = null;
		selllist = mypageDAO.selectselllist(postVO);
		return selllist;
	}

	@Override
	public List buylist(OrderVO orderVO) throws DataAccessException {
		List buylist = null;
		buylist = mypageDAO.selectbuylist(orderVO);
		return buylist;
	}

	@Override
	public List searchlist(String keyword) throws DataAccessException {
		System.out.println(keyword);
		List searchlist = null;
		searchlist = mypageDAO.searchlist(keyword);
		System.out.println(searchlist);
		return searchlist;
	}

}
