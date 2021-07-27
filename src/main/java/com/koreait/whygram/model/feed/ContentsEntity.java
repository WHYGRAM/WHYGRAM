package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class ContentsEntity {
    private int contents_id;
    private int feed_id;
    private String contents_img;
    private String contents_video;
}
