package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class CmtEntity {
    private int cmt_id;
    private int feed_id;
    private int users_id;
    private String cmt_cmt;
    private String cmt_regdt;
}
