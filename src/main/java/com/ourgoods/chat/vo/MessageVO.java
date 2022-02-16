package com.ourgoods.chat.vo;

import org.springframework.stereotype.Component;

import lombok.*;
@Data
@Component
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class MessageVO {
	private String senderName;
    private String receiverName;
    private String content;
    private Status status;
    private int postcode;
    
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	
	
	
	public int getPostcode() {
		return postcode;
	}
	public void setPostcode(int postcode) {
		this.postcode = postcode;
	}
	@Override
	public String toString() {
		return "messageVO " + this.senderName + " " + this.receiverName + " " + this.content
				+ " " + this.status + " " + this.postcode;
	}
    
}