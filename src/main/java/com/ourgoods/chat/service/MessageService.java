package  com.ourgoods.chat.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ourgoods.chat.dao.MessageDAO;
import com.ourgoods.chat.vo.MessageMap;
import com.ourgoods.chat.vo.MessageVO;


@Service("messageService")
public class MessageService {
	@Autowired
	private MessageDAO messageDAO;
	
	@Autowired
	private MessageVO messageVO;
	
	@Value("${file.upload.path.txt}")
	String fileUploadPath; 
	
	public void addChatRoom(MessageMap messageMap) throws IOException {
		
		Timestamp createdDate = Timestamp.valueOf(LocalDateTime.now());
        
        messageMap.setCreatedDate(createdDate);
		
		messageDAO.addChatRoom(messageMap);
		
	}
	
	
	public void addMessage(MessageMap paramMap) throws Exception {
		messageDAO.addChatMessage(paramMap);
	}
	
	public MessageMap selectChatList(String username) throws Exception {
		return messageDAO.selectChatList(username);
	}
	
	public void appendMessage(MessageVO content) throws FileNotFoundException, IOException {
		int postcode = content.getPostcode();
		//사는 사람을 구별해주는 코드가 추가되어야 함
		String buyusername = content.getSenderName();
		System.out.println("postcode : " + postcode + "  buyusercode : " + buyusername);
		
		MessageMap chatRoomAppend = messageDAO.findByChatId(postcode, buyusername);
		
		String pathName = fileUploadPath + chatRoomAppend.getFilename();
		System.out.println(pathName);
		
		FileOutputStream fos = new FileOutputStream(pathName, true);
		String chatcont = content.getContent();
		String sendername = content.getSenderName();
//		int senderId = chatRoom.getSenderId();
		System.out.println("print : " + chatcont);
		
		String writeContent = sendername + "\n" + chatcont + "\n";
		
		byte[] b = writeContent.getBytes();
		
		fos.write(b);
		fos.close();
		
	}
	
	public int countByChatId(int postcode, String buyusername) {
		return messageDAO.countByChatId(postcode, buyusername);
	}
	
	public MessageMap findByChatId(int postcode, String buyusername) {
		return messageDAO.findByChatId(postcode, buyusername);
	
	}
	
	//no connection with DB
	public List<String> readChatHistory(MessageMap messageMap) throws IOException {
		
		String pathName = fileUploadPath + messageMap.getFilename();
		
		//DB에 저장된 chat.txt 파일을 읽어옴 
		BufferedReader br = new BufferedReader(new FileReader(pathName));
		//View에 ChatRoom 객체로 전달
//		MessageMap chatRoomLines = new MessageMap();
		List<String> chatHistory = new ArrayList<String>();

		String chatLine;
		int idx = 1;
		String temp = "";
		while ((chatLine = br.readLine()) != null) {
			//1개 메시지는 3줄(보낸사람,메시지내용,보낸시간)로 구성돼있음
			int answer = idx % 2;
			if (answer == 1) {
				//보낸사람
				temp += chatLine + " ";
				idx++;
			} else {
				//메시지내용
				temp += chatLine;
				chatHistory.add(temp);
				System.out.println("chatHistory " + chatHistory);
				temp = "";
				idx = 1;
			} 
		}
		System.out.println("chatHistory " + chatHistory);
		return chatHistory;
	}
	
	public int getId(int postcode, String username) {
		// TODO Auto-generated method stub
		return messageDAO.getId(postcode, username);
	}
	
	public void createFile(int postcode, int chatroomcode) throws IOException {
		
		String fileName = postcode + "_" + chatroomcode + ".txt";
		String pathName = fileUploadPath + fileName;
		//File 클래스에 pathName 할당
		File txtFile = new File(pathName);
		//로컬경로에 파일 생성
		txtFile.createNewFile();
		
		messageDAO.updateFileName(chatroomcode, fileName);
	}
	
}
