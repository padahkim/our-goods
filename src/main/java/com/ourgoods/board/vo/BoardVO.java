package com.ourgoods.board.vo;

import java.sql.Date;
import java.util.List;

import org.springframework.stereotype.Component;

@Component("boardVO")
public class BoardVO {
	private int pcode;
	private String ptitle;
	private String pcontent;
	private int price;
	private int pnumber;		//조회수
	private int scode;			//seller_code
	private int cacode;		//category_code
	private int stcode;			//status_code
	private int tcode;		//town_code
	private Date insertTime;	//시간
	private String imageUrl;
	private String imageName;
	
	private List<AttachVO> list;
		
	public BoardVO() {
		
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

	public String getPcontent() {
		return pcontent;
	}

	public void setPcontent(String pcontent) {
		this.pcontent = pcontent;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getPnumber() {
		return pnumber;
	}

	public void setPnumber(int pnumber) {
		this.pnumber = pnumber;
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

	public int getTcode() {
		return tcode;
	}

	public void setTcode(int tcode) {
		this.tcode = tcode;
	}

	public Date getInsertTime() {
		return insertTime;
	}

	public void setInsertTime(Date insertTime) {
		this.insertTime = insertTime;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
}
