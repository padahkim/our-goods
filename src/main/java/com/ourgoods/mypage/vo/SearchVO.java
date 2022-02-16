package com.ourgoods.mypage.vo;

import org.springframework.stereotype.Component;

@Component("searchVO")
public class SearchVO {

	private String stitle;
	
	public SearchVO() {
		// TODO Auto-generated constructor stub
	}

	public String getStitle() {
		return stitle;
	}

	public void setStitle(String stitle) {
		this.stitle = stitle;
	}
	
	
}
