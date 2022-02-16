package com.ourgoods.board.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.ourgoods.board.vo.AttachVO;

@Mapper
@Repository("attachDAO")
public interface AttachDAO {
	public int insertFile(List<AttachVO> list);
	//public AttachVO selectFileOne(int fileCode);
	public int deleteFile(int postCode);
	public List<AttachVO> selectFileList(int pcode);
	public int selectFileTotalCount(int pcode);
}
