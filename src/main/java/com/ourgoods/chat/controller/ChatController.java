package com.ourgoods.chat.controller;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ourgoods.chat.service.MessageService;
import com.ourgoods.chat.vo.MessageMap;
import com.ourgoods.chat.vo.MessageVO;

@RestController
public class ChatController {
	
	@Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
	
	@Autowired
	private MessageService messageService;
	

	// 채팅을 입력 했을떄 보낸 채팅 내용, 아이디 값 받아오기
	@RequestMapping(value="postlist", method=RequestMethod.POST)
	public MessageMap receiveMessage(@RequestBody MessageMap paramMap) throws SQLException, Exception {
		System.out.println("postlist" + paramMap);
		
		return paramMap;
	}
	
	@MessageMapping("/content")
    @SendTo("/chatroom/public")
    public MessageVO receiveContent(@Payload MessageVO content){
        return content;
    }

    @MessageMapping("/private-content")
    public MessageVO recContent(@Payload MessageVO content) throws FileNotFoundException, IOException{
        simpMessagingTemplate.convertAndSendToUser(content.getReceiverName(),"/private",content);
        System.out.println("private-content" + content.toString());
        Map <String, Object> resultMap = new HashMap<String, Object>();
        
        if(messageService.countByChatId(content.getPostcode(), content.getSenderName()) > 0) {
			//채팅방이 이미 존재하면 전의 채팅기록 가져오기
			MessageMap chatRoomTemp = messageService.findByChatId(content.getPostcode(), content.getSenderName());
			//load existing chat history
			List<String> chatHistory = messageService.readChatHistory(chatRoomTemp);
			
			//map value로 String list
			resultMap.put("chatMessages", chatHistory);
			System.out.println(resultMap);
		} else {
			MessageMap paramMap = new MessageMap();
			
			paramMap.setUsername(content.getSenderName());
			paramMap.setContent(content.getContent());
			paramMap.setSellername(content.getReceiverName());
			paramMap.setPostcode(content.getPostcode());
			
			
			//채팅방이 없으면 새로운 채팅방 생성
			System.out.println("채팅방 생성");
			//chatRoom 생성
			messageService.addChatRoom(paramMap);
			System.out.println("chatroom add end");
			//text file 생성
			messageService.createFile(paramMap.getPostcode(), messageService.getId(paramMap.getPostcode(), paramMap.getUsername()));
		}
		
        messageService.appendMessage(content);
        return content;
    }
    
    @RequestMapping("/chatlist")
    public MessageMap openChatList(String usercode) throws Exception  {
    	String user_code = "park";
    	MessageMap resultMap = messageService.selectChatList(user_code);
    	System.out.println(resultMap);
    	
    	return resultMap;
    }
}


