package com.ourgoods.mypage.vo;

import org.springframework.stereotype.Component;

@Component("orderVO")
public class OrderVO {
	
	private int bcode; //buy_user code
	private int opcode; //post code
	private String ptitle;//
	
	public OrderVO() {
		// TODO Auto-generated constructor stub
	}

	public int getBcode() {
		return bcode;
	}

	public void setBcode(int bcode) {
		this.bcode = bcode;
	}

	public int getOpcode() {
		return opcode;
	}

	public void setOpcode(int opcode) {
		this.opcode = opcode;
	}
	public String getPtitle() {
		return ptitle;
	}

	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
	}
	

}
