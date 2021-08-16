package com.koreait.whygram.mapper;

import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {

    // 회원가입
    int insUsers(UserEntity param);
    UserDomain selEmail(UserEntity param);
    UserDomain selNickNm(UserEntity param);
    int auth(UserEntity param);

    //비밀번호 찾기
    int updPw(UserEntity param);

    //로그인
    UserEntity selUsers(UserEntity param);

    // 프로필 수정
    int updProfile(UserEntity param);
    UserEntity selProfileUpd(UserEntity param);
}
