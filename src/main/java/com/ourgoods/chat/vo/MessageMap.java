package com.ourgoods.chat.vo;

import java.sql.Timestamp;

import org.springframework.stereotype.Component;

public class MessageMap {
	private int chatroomcode;
	private String username;
	private int buyusercode;
//	private String content;
	private int postcode;
//	private String receivername;
	private String sellername;
	private String filename;
	private Timestamp createdDate;
	
	//in txt file
	private String content;
	private String sendername;
	private String posttitle;
	
	public MessageMap() {

	}

	public MessageMap(int chatroomcode, String username, int buyusercode, int postcode, String sellername,
			String filename, Timestamp createdDate, String content, String sendername, String posttitle) {
		super();
		this.chatroomcode = chatroomcode;
		this.username = username;
		this.buyusercode = buyusercode;
		this.postcode = postcode;
		this.sellername = sellername;
		this.filename = filename;
		this.createdDate = createdDate;
		this.content = content;
		this.sendername = sendername;
		this.posttitle = posttitle;
	}

	public int getChatroomcode() {
		return chatroomcode;
	}

	public void setChatroomcode(int chatroomcode) {
		this.chatroomcode = chatroomcode;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getBuyusercode() {
		return buyusercode;
	}

	public void setBuyusercode(int buyusercode) {
		this.buyusercode = buyusercode;
	}

	public int getPostcode() {
		return postcode;
	}

	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}

	public String getSellername() {
		return sellername;
	}

	public void setSellername(String sellername) {
		this.sellername = sellername;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public Timestamp getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getSendername() {
		return sendername;
	}

	public void setSendername(String sendername) {
		this.sendername = sendername;
	}

	public String getPosttitle() {
		return posttitle;
	}

	public void setPosttitle(String posttitle) {
		this.posttitle = posttitle;
	}

	
	
	
	
	
	
	
	
	
}
