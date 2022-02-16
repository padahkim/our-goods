package com.example.test.board.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.test.board.service.BoardService;
import com.example.test.board.vo.AttachVO;
import com.example.test.board.vo.BoardVO;

@Controller("boardController")
public class BoardController {
	
	@Autowired
	private BoardService boardService;
	
	@GetMapping(value= {"/", "/main"})
	public String main(Model model) {
		return "main";
	}
	
	@RequestMapping(value="/board/list", method={ RequestMethod.GET, RequestMethod.POST })
	public String listBoard(Model model) {
		List<BoardVO> boardList = boardService.getBoardList();
		model.addAttribute("boardList", boardList);
		//for(BoardDTO board : boardList) {
		//	if(board != null)
		//		System.out.println(board.getPostTitle());
		//}
		return "board/listArticles";
	}
	
	@RequestMapping(value="/board/imgList", method={ RequestMethod.GET, RequestMethod.POST })
	public String imgBoard(Model model) {
		List<BoardVO> boardList = boardService.getBoardList();
		model.addAttribute("boardList", boardList);
		return "board/listImages";
	}
	
	@GetMapping(value="/board/write")
	public String openBoardWrite(Model model) {
		return "board/articleForm";
	}
	
	@PostMapping(value="/board/register")
	public String registerBoard(final BoardVO parmas, final MultipartFile[] files, Model model) {		
		try {
			boolean isRegistered = boardService.registerBoard(parmas, files);
			if(isRegistered == false) {
				
			}	
		} catch(DataAccessException e) {
			
		} catch (Exception e) {
			
		}
		
		return "redirect:/board/list";
	}
	
	@GetMapping(value="/board/view")
	public String openBoardDetail(@RequestParam(value="pcode", required=false) int pcode, Model model) {		
		BoardVO board = boardService.getBoardDetail(pcode);
		if(board == null) {
			return "redirect:/board/list";
		}
		
		model.addAttribute("board", board);
		
		List<AttachVO> fileList = boardService.getAttachFileList(pcode);
		System.out.println(fileList);
		
		model.addAttribute("fileList", fileList);
		
		return "board/viewArticle";
	}

	@PostMapping(value="/board/modify")
	public String modifyBoard(final BoardVO parmas) {
		try {			
			boolean isUpdated = boardService.updateBoard(parmas);
			
			//System.out.println(parmas.getPcode());
			//System.out.println("==================");
			//System.out.println(parmas.getPtitle());
			//System.out.println(parmas.getPcontent());
			//System.out.println(parmas.getPrice());
			//System.out.println("==================");
			
			if(isUpdated == false) {
				
			}
		} catch(DataAccessException e) {
			
		} catch (Exception e) {
			
		}

		return "redirect:/board/list";
	}
	
	@PostMapping(value="board/delete")
	public String deleteBoard(int pcode) {
		try {
			boolean isDel = boardService.deleteBoard(pcode);
			if(isDel == false) {
				
			} else {
				System.out.println("삭제");
			}
		} catch (DataAccessException e) {
			
		} catch (Exception e) {
			
		}
		
		return "redirect:/board/list";
	}

}
