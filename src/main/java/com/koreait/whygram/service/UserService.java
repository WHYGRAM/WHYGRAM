package com.koreait.whygram.service;

import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired UserMapper mapper;

    public int insUsers(UserEntity param, String pwchk) {

        // 아이디 중복 검사 + 비밀번호 검사
        if(mapper.selIdChk(param).getIdChk() == 0 || param.getUsers_password() == pwchk) {
            // 통과하면
            String hashedPw = BCrypt.hashpw(param.getUsers_password(), BCrypt.gensalt());
            param.setUsers_password(hashedPw);

            int result = mapper.insUsers(param);

            if (result < 1) {
                return 1; // 아이디 중복 검사, 비밀번호 검사 통과 했지만 가입은 안됏음
            }
            return 0; //   아이디 중복 검사 , 비밀번호 검사 통과 한 후 가입도 완료됨
        }
        return 2; // 아이디 중복이 되거나 비밀번호가 서로 틀림



    }

}
