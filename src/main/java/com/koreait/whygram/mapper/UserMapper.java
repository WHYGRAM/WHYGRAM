package com.koreait.whygram.mapper;

import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    // 회원가입
    int insUsers(UserEntity param);
    UserDomain selIdChk(UserEntity param);
    UserEntity selUsers(UserEntity param);
    int auth(UserEntity param);

    // 마이페이지 업데이트
    int updUsers(UserEntity param);

}
