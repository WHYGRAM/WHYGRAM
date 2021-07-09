package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserDomain;
import com.koreait.whygram.model.user.UserEntity;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private MySecurityUtils authCode;
    @Autowired private EmailService email;

    public int insUsers(UserEntity param, String pwchk) {
/*
        // 아이디 중복 검사 + 비밀번호 검사
        if (mapper.selIdChk(param).getIdChk() == 0 || param.getUsers_password() == pwchk) {

            // 통과하면
            String hashedPw = BCrypt.hashpw(param.getUsers_password(), BCrypt.gensalt());
            param.setUsers_password(hashedPw);

            int result = mapper.insUsers(param);

            if (result < 1) {
                return 1; // 아이디 중복 검사, 비밀번호 검사 통과 했지만 가입은 안됏음(auth인증 x)
            }
            return 0; //   아이디 중복 검사 , 비밀번호 검사 통과 한 후 가입도 완료됨
        }
        return 2; // 아이디 중복이 되거나 비밀번호가 서로 틀림


 */
        // 아이디 중복검사
        if(mapper.selIdChk(param).getIdChk() == 0) {

            // 비밀번호 일치 확인
            if(param.getUsers_password().equals(pwchk)) {
                // 비밀번호 일치 확인 성공

                // 문자를 포함한 인증코드
                String authCd = authCode.getRandomNumber(5);

                // 비밀번호 암호화
                String hashedPw = BCrypt.hashpw(param.getUsers_password(), BCrypt.gensalt());
                param.setUsers_auth_code(authCd);
                param.setUsers_password(hashedPw);
                int result = mapper.insUsers(param);
                if(result == 1) {
                    // 이메일 인증 보내기
                    String subject = "[얼굴책] 인증메일입니다.";
                    String txt = String.format("<a href=\"http://localhost:8090/user/auth?email=%s&authCd=%s\">인증하기</a>"
                            , param.getUsers_email(), authCd);
                    email.sendMimeMessage(param.getUsers_email(), subject, txt);
                    return result; // 성공시 메일 전송
                }
                return 2; // 아이디 중복 확인, 비밀번호 일치 확인, auth인증 대기 및 실패
            }
            return 3; // 아이디 검사o, 비밀번호 일치x
        }
        return 1; // 아이디 중복
    }
}
