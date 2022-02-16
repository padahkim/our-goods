package com.ourgoods.mypage.vo;

import org.springframework.stereotype.Component;

@Component("chatroomVO")
public class ChatRoomVO {

	private int cpcode;
	private int bucode;
	private int crcode;
	
	public ChatRoomVO() {
		// TODO Auto-generated constructor stub
	}

	public int getCpcode() {
		return cpcode;
	}

	public void setCpcode(int cpcode) {
		this.cpcode = cpcode;
	}

	public int getBucode() {
		return bucode;
	}

	public void setBucode(int bucode) {
		this.bucode = bucode;
	}

	public int getCrcode() {
		return crcode;
	}

	public void setCrcode(int crcode) {
		this.crcode = crcode;
	}
	
	
}
