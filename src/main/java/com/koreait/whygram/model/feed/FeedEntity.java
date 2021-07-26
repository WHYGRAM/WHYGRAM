package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedEntity {
    private int feed_id;
    private int users_id;
    private String feed_ctnt;
    private String feed_regdt;
}
