package com.koreait.whygram.model.feed;

import lombok.Data;

@Data
public class FeedDomain extends FeedEntity{
    //마이페이지 리스트
    private int isFav;
    private int isCmt;
    private int favCnt;
    private int cmtCnt;
    private ContentsEntity contents; //resultMap, 첫번째 이미지와 id
}
