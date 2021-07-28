package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedDomain extends FeedEntity{
    private String writer;
    private String users_img;
    private int feed_id;
    private String contents_img;
    private String contents_video;
}
