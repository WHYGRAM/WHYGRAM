package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedDTO {
    //마이페이지 리스트
    private int mypage_id;
    private int page;
    private int limit;
    private int user4FavCmt;
    //마이페이지 디테일
    private int feed_id;

    //마이페이지 리스트
    public int getStarIdx() {return (page - 1) * limit;}


}
