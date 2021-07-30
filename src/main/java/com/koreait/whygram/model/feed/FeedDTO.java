package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedDTO {
    private int page;
    private int limit;
    private int userIdForMyFeed; // 내 게시글
    private int userIdForFav; // 내가 좋아요한 사람 게시글

    public int getStartIdx() {
        return (page - 1) * limit;
    }
}
