package com.ourgoods.mypage.vo;

import org.springframework.stereotype.Component;

@Component("postVO")
public class PostVO {

	private int pcode;
	private String ptitle;
	private int scode;
	private int stcode;
	private int cacode;
	
	public PostVO() {
		// TODO Auto-generated constructor stub
	}

	public int getPcode() {
		return pcode;
	}

	public void setPcode(int pcode) {
		this.pcode = pcode;
	}

	public String getPtitle() {
		return ptitle;
	}

	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
	}

	public int getScode() {
		return scode;
	}

	public void setScode(int scode) {
		this.scode = scode;
	}

	public int getStcode() {
		return stcode;
	}

	public void setStcode(int stcode) {
		this.stcode = stcode;
	}

	public int getCacode() {
		return cacode;
	}

	public void setCacode(int cacode) {
		this.cacode = cacode;
	}
	
	
}
