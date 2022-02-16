package com.ourgoods.board.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartResolver;

import com.ourgoods.board.dao.AttachDAO;
import com.ourgoods.board.dao.BoardDAO;
import com.ourgoods.board.vo.AttachVO;
import com.ourgoods.board.vo.BoardVO;


@Service("boardService")
@Transactional(propagation = Propagation.REQUIRED)
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	BoardDAO boardDAO;
	
	@Autowired
	AttachDAO attachDAO;

	private final String getRandomString() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	@Override
	public boolean registerBoard(BoardVO parmas) {
		int queryResult = 0;
		
		queryResult = boardDAO.insertPost(parmas);
		System.out.println(queryResult);
		
		System.out.println(parmas.getImageUrl());
		System.out.println(parmas.getImageName());
		
		if(parmas.getImageName() != null) {
			List<AttachVO> list = new ArrayList<AttachVO>();
			
			final String extension = FilenameUtils.getExtension(parmas.getImageName());
			final String saveName = getRandomString() + "." + extension;
			
			AttachVO attach = new AttachVO();
			attach.setPostCode(parmas.getPcode());
			attach.setFilePath(parmas.getImageUrl());
			attach.setOriginalName(parmas.getImageName());
			attach.setSaveName(saveName);
			attach.setSize(1);
			
			list.add(attach);
			
			if(CollectionUtils.isEmpty(list) == false) {
				queryResult = attachDAO.insertFile(list);
				if(queryResult < 1) {
					queryResult = 0;
				}
			}
		}
		System.out.println(queryResult);
		
		return (queryResult > 0) ? true : false;
	}

	@Override
	public BoardVO getBoardDetail(int postCode) {
		return boardDAO.selectPostOne(postCode);
	}

	@Override
	public boolean deleteBoard(int postCode) {
		int queryResult = 0;
		
		BoardVO board = boardDAO.selectPostOne(postCode);
		attachDAO.deleteFile(postCode);
		
		if(board != null)
			queryResult = boardDAO.deletePost(postCode);
		
		return (queryResult == 1) ? true : false;
	}

	@Override
	public List<BoardVO> getBoardList() {
		List<BoardVO> boardList = Collections.emptyList();
		
		int boardTotalCount = boardDAO.selectTotalCount();
		
		if(boardTotalCount > 0) {
			boardList = boardDAO.selectPostList();
		}
		
		return boardList;
	}

	@Override
	public boolean updateBoard(@RequestBody BoardVO params) {
		int queryResult = 0;

		queryResult = boardDAO.updatePost(params);
		
		return (queryResult == 1) ? true : false;
	}
	
	@Override
	public List<AttachVO> getAttachFileList(int postCode) {
		int fileTotalCount = attachDAO.selectFileTotalCount(postCode);
		if(fileTotalCount < 1) {
			return Collections.emptyList();
		}
		return attachDAO.selectFileList(postCode);
	}
	
	@Override
	public int updatePnumber(int pcode) {
		return boardDAO.updatePnumber(pcode);
	}
	
	@Override
	public String getMemberName(int scode) {
		return boardDAO.selectMemberName(scode);
	}
	
	@Override
	public boolean updateStatus(int pcode) {
		int queryResult = 0;

		queryResult = boardDAO.updateStcode(pcode);
		
		return (queryResult == 1) ? true : false;
	}
	
}
