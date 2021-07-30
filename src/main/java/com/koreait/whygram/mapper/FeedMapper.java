package com.koreait.whygram.mapper;

import com.koreait.whygram.model.feed.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedMapper {

    int insFeed(FeedEntity param);
    int insFeedImg(ContentsEntity param);
    List<FeedDomain> selFeedList();
    List<FeedDomain> selFeedHome(FeedDTO param);

    // 좋아요
    int insFeedFav(FeedFavEntity param);
    int delFeedFav(FeedFavEntity param);
}
