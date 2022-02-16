package com.ourgoods.common.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FilenameUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ourgoods.board.vo.AttachVO;
import com.ourgoods.common.exception.AttachFileException;

@Component
public class FileUtils {
	/* 오늘 날짜 */
	private final String today = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMMdd"));
	/* 업로드 경로 */
	private final String uploadPath = Paths.get("C:", "board", "upload", today).toString();
	
	/* save_name 랜덤 문자열 */
	private final String getRandomString() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
	
	public List<AttachVO> uploadFiles(MultipartFile[] files, int postCode) {
		
		List<AttachVO> list = new ArrayList<AttachVO>();
		
		File dir = new File(uploadPath);
		if(dir.exists() == false) {
			dir.mkdirs();
		}
		
		for(MultipartFile file : files) {
			if(file.getSize() < 1) {
				continue;
			}
			try {
				/* 파일 확장자 */
				final String extension = FilenameUtils.getExtension(file.getOriginalFilename());
				/* save_name (랜덤 문자열 + 확장자) */
				final String saveName = getRandomString() + "." + extension;
				/* 업로드 경로에 saveName과 동일한 이름의 파일 생성 */
				File target = new File(uploadPath, saveName);
				file.transferTo(target);
				
				AttachVO attach = new AttachVO();
				System.out.println(postCode);
				attach.setPostCode(postCode);
				System.out.println(file.getOriginalFilename());
				attach.setOriginalName(file.getOriginalFilename());
				System.out.println(saveName);
				attach.setSaveName(saveName);
				System.out.println(file.getSize());
				attach.setSize((int)file.getSize());
				
				attach.setFilePath(uploadPath);
				
				list.add(attach);
				//System.out.println(list);
			} catch (IOException e) {
				throw new AttachFileException("["+file.getOriginalFilename()+"] failed to save file...");
			} catch (Exception e) {
				throw new AttachFileException("["+file.getOriginalFilename()+"] failed to save file...");
			}
		}
		
		return list;
	}
}
