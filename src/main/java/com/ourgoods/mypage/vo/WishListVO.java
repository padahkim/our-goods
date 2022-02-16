package com.ourgoods.mypage.vo;

import org.springframework.stereotype.Component;

@Component("wishlistVO")
public class WishListVO {
	private int wucode;
	private int wpcode;
	private String ptitle;
	
	public WishListVO() {
		// TODO Auto-generated constructor stub
	}

	public int getWucode() {
		return wucode;
	}

	public void setWucode(int wucode) {
		this.wucode = wucode;
	}

	public int getWpcode() {
		return wpcode;
	}

	public void setWpcode(int wpcode) {
		this.wpcode = wpcode;
	}

	public String getPtitle() {
		return ptitle;
	}

	public void setPtitle(String ptitle) {
		this.ptitle = ptitle;
	}
	
	
	
}
