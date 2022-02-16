package com.ourgoods.board.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;

import com.ourgoods.board.vo.AttachVO;
import com.ourgoods.board.vo.BoardVO;

public interface BoardService {
	public boolean registerBoard(BoardVO parmas);
	//public boolean registerBoard(BoardVO parmas, MultipartFile[] files);
	public BoardVO getBoardDetail(int pcode);
	public boolean deleteBoard(int pcode);
	public boolean updateBoard(BoardVO params);
	public List<BoardVO> getBoardList();
	public List<AttachVO> getAttachFileList(int pcode);
	public int updatePnumber(int pcode);
	public String getMemberName(int scode);
	public boolean updateStatus(int pcode);
}
