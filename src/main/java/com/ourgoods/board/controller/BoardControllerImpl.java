package com.ourgoods.board.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ourgoods.board.service.BoardService;
import com.ourgoods.board.vo.AttachVO;
import com.ourgoods.board.vo.BoardVO;

@RestController("boardController")
public class BoardControllerImpl {
	
	@Autowired
	private BoardService boardService;
	
	/* 게시글 목록 */
	@GetMapping(value="/post")
	public List<BoardVO> listBoard() {
		List<BoardVO> boardList = boardService.getBoardList();
		for(BoardVO board : boardList) {
			if(board != null) {
				//System.out.println(board.getPtitle());
			}
		}
		return boardList;
	}
	
	/* 게시글 쓰기 */
	@PostMapping(value="/post")
	public String registerBoard(@RequestBody BoardVO parmas) {
			//, @RequestParam MultipartFile[] files) {		
		try {
			boolean isRegistered = boardService.registerBoard(parmas);
			
			if(isRegistered == false) {
				System.out.println("isRegistered false");
			} else {
				System.out.println("새 게시글 등록");
			}
		} catch (Exception e) {
			
		}
		
		return "ok";
	}
	
	/* 게시글 상세보기 */
	@GetMapping(value="/post/{pcode}")
	public Map<String, Object> openBoardDetail(@PathVariable int pcode) {		
		
		BoardVO board = boardService.getBoardDetail(pcode);
		
		boardService.updatePnumber(pcode);
		
		List<AttachVO> fileList = boardService.getAttachFileList(pcode);
		
		for(AttachVO attach : fileList) {
			System.out.println(attach.getOriginalName());
		}
		
		System.out.println("====================");
		System.out.println(board.getPcode());
		System.out.println(board.getPtitle());
		System.out.println(board.getPcontent());
		System.out.println("====================");
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("board", board);
		//map.put("fileList", fileList);
		
		return map;
	}

	/* 게시글 수정하기 */
	@PutMapping(value="/post/{pcode}")
	public void modifyBoard(@PathVariable int pcode, @RequestBody BoardVO parmas) {
		try {			
			boolean isUpdated = boardService.updateBoard(parmas);			
			if(isUpdated == false) {
				System.out.println("수정 실패");
			}else {
				System.out.println(pcode+"번 게시글 수정");
			}
		} catch(DataAccessException e) {
			
		} catch (Exception e) {
			
		}

	}
	
	/* 게시글 삭제하기 */
	@DeleteMapping(value="post/{pcode}")
	public void deleteBoard(@PathVariable int pcode) {
		try {
			boolean isDel = boardService.deleteBoard(pcode);
			if(isDel == false) {
				System.out.println("삭제 실패");
			} else {
				System.out.println(pcode+"번 게시글 삭제");
			}
		} catch (DataAccessException e) {
			
		} catch (Exception e) {
			
		}

	}
	
	/* 게시글 거래완료 */
	@PostMapping(value="/board/statusChange")
	public void updateStatus(int pcode) {
		try {
			boolean isStat = boardService.updateStatus(pcode);
			if(isStat == false) {
				System.out.println("error");
			} else {
				System.out.println(pcode+"번 게시글 거래완료");
			}
		} catch (Exception e) {
			
		}
	}

}
