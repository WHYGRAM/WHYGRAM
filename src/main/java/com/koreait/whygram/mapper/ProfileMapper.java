package com.koreait.whygram.mapper;

import com.koreait.whygram.model.profile.FollowDTO;
import com.koreait.whygram.model.profile.FollowEntity;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProfileMapper {
    int insUserImg(UserEntity param);
    int insFollow(FollowEntity param);
    int updUserImg(UserEntity param);
    //UserEntity selUserImg(UserEntity param);
    //int updUsers(UserEntity param);
    UserDomain selUserProfile(FollowDTO param);
    List<UserDomain> selFollowerList(FollowEntity param);
    List<UserDomain> selFollowList(FollowEntity param);
    int delFollow(FollowEntity param);
}
