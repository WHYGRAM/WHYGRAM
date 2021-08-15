package com.koreait.whygram.mapper;

import com.koreait.whygram.model.feed.FeedDTO;
import com.koreait.whygram.model.feed.FeedDomain;
import com.koreait.whygram.model.profile.FollowDTO;
import com.koreait.whygram.model.profile.FollowEntity;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    int insFollow(FollowEntity param);
    int updUserImg(UserEntity param);
    UserDomain selUserProfile(FollowDTO param);
    List<UserDomain> selFollowerList(FollowEntity param);
    List<UserDomain> selFollowList(FollowEntity param);
    List<FeedDomain> selMypageList(FeedDTO param);
    int delFollow(FollowEntity param);
    FeedDomain selMypageDetail(FeedDTO param);
}
