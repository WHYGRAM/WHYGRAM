package com.koreait.whygram.model.feed;

import lombok.Data;

import java.util.List;

@Data
public class FeedDomain extends FeedEntity{
    //마이페이지 리스트
    private int isFav;
    private int isCmt;
    private int favCnt;
    private int cmtCnt;
    private ContentsEntity contents; //resultMap, 첫번째 이미지와 id

    //마이페이지 디테일
    private String users_nickname;
    private String users_img;
    private List<ContentsEntity> contentsList; //resultMap
        // [feed_id, users_id, feed_ctnt, feed_regdt], favCnt , cmtCnt

    //홈 리스트
        //isFav, isCmt, favCnt, cmtCnt
        //contentsList
        //users_nickname, users_img
}
