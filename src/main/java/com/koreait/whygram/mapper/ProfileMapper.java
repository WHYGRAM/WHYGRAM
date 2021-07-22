package com.koreait.whygram.mapper;

import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProfileMapper {
    // 마이페이지 업데이트
    int insUserImg(UserEntity param);
    int updUserImg(UserEntity param);
    UserEntity selUserImg(UserEntity param);
    //int updUsers(UserEntity param);
}
