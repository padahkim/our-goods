package com.ourgoods.chat.dao;

import java.io.IOException;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ourgoods.chat.vo.MessageMap;

@Mapper
public interface MessageDAO {
	public void addChatMessage (MessageMap paramMap) throws IOException;
	public MessageMap selectChatList (String username) throws IOException;
	public MessageMap findByChatId(@Param("postcode") int postcode, @Param("username") String username);
	public int countByChatId(@Param("postcode") int postcode, @Param("username") String username);
	public void addChatRoom(MessageMap messageMap) throws IOException;
	public int getId(@Param("postcode") int postcode, @Param("username") String username);
	public void updateFileName(@Param("chatroomcode") int chatroomcode, @Param("filename") String filename);
}
