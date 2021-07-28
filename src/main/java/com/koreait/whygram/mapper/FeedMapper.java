package com.koreait.whygram.mapper;

import com.koreait.whygram.model.feed.ContentsEntity;
import com.koreait.whygram.model.feed.FeedDomain;
import com.koreait.whygram.model.feed.FeedEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FeedMapper {
    int insFeed(FeedEntity param);
    int insFeedImg(ContentsEntity param);
    List<FeedDomain> selFeedList();
}
