package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.apache.catalina.User;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private MySecurityUtils mySecurityUtils;
    @Autowired private EmailService email;

    // 중복체크
    public int idChk(UserEntity param, String pwchk) {
        int idChk = mapper.selIdChk(param).getIdChk();

        // 아이디 중복 검사
       if (idChk == 0) {
           // 중복값 없음
           if (param.getUsers_password().equals(pwchk)) {
               // 비밀번호 일치
               return 0;
           }
           // 비밀번호 불일치치
           return 0;
       }
       // 중복값 있음
       return 0;
    }

    // 회원가입
    public int insUsers(UserEntity param) {

        // 인증번호 길이
        String authCd = mySecurityUtils.getRandomNumber(5);

        // 비밀번호 암호화
        String hashedPw = BCrypt.hashpw(param.getUsers_password(), BCrypt.gensalt());
        param.setUsers_password(hashedPw);
        param.setUsers_auth_code(authCd);

        int result = mapper.insUsers(param);

        if(result == 1) {
            // 수정필요!
            String subject = "[WHYGRAM] 인증메일입니다.";
            String txt = String.format("<a href=\"http://localhost:8090/user/auth?email=%s&authCd=%s\">인증하기</a>"
                    , param.getUsers_password(), authCd);
            email.sendMimeMessage(param.getUsers_password(), subject, txt);
        }
        return result;
    }

    //이메일 인증 처리
    public int auth(UserEntity param) {
        return mapper.auth(param);
    }
}
