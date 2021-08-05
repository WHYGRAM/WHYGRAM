package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedDTO {
    private int mypage_id;
    private int page;
    private int limit;
    private int user4FavCmt;

    public int getStarIdx() {return (page - 1) * limit;}
}
