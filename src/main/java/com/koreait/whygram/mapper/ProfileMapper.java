package com.koreait.whygram.mapper;

import com.koreait.whygram.model.profile.FollowDTO;
import com.koreait.whygram.model.profile.FollowEntity;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProfileMapper {
    int insFollow(FollowEntity param);
    int updUserImg(UserEntity param);
    UserDomain selUserProfile(FollowDTO param);
    int delFollow(FollowEntity param);
}
