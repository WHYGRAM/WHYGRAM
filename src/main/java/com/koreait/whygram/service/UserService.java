package com.koreait.whygram.service;

import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired UserMapper mapper;

    public int insUsers(UserEntity param, String pwchk) {


        // 아이디 중복 검사
        if(mapper.selIdChk(param).equals(0)) {

            // 비밀번호와 비밀번호 확인 일치한지 확인
            if(param.getUsers_password() == pwchk) {

                // 비밀번호 암호화

                return mapper.insUsers(param);
            }
        } else {

        }
            return 0;
    }
}
