package com.ourgoods.board.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import com.ourgoods.board.vo.BoardVO;

@Mapper
@Repository("boardDAO")
public interface BoardDAO {
	
	public List<BoardVO> selectPostList();
	public int insertPost(@RequestBody BoardVO params);
	public BoardVO selectPostOne(int pcode);
	public int updatePost(@RequestBody BoardVO params);
	public int deletePost(int pcode);
	public int selectTotalCount();
	public int updatePnumber(int pcode);
	public String selectMemberName(int scode);
	public int updateStcode(int pcode);
	
}
