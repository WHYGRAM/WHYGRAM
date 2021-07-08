package com.koreait.whygram.mapper;

import com.koreait.whygram.model.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insUsers(UserEntity param);
}
