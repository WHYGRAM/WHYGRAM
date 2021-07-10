package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired private UserMapper mapper;
    @Autowired private MySecurityUtils mySecurityUtils;
    @Autowired private EmailService email;
    @Autowired private PasswordEncoder passwordEncoder;

    // 아이디 중복 검사 & 비밀번호 확인 검사
    public String idPwChk(UserEntity param, String pwchk) {
        int idChk = mapper.selIdChk(param).getIdChk();

       if (idChk == 0) { // 아이디 중복값 없음
           if (param.getUsers_password().equals(pwchk)) { // 비밀번호 서로 일치
               return "done"; // 아이디 비밀번호 모두 통과
           }
           // 비밀번호 불일치
           return "pw";
       }
       // 아이디 중복값 있음
       return "id";
    }

    // 회원가입
    public String insUsers(UserEntity param, String pwchk) {

        // 아이디 중복 검사 & 비밀번호 확인 검사
        String idPwChk = this.idPwChk(param, pwchk);
        if (idPwChk.equals("pw") || idPwChk.equals("id")) {
            return "join?msg=wrongAccess";
        }

        // 인증번호
        String authCd = mySecurityUtils.getRandomCode(5);

        // 비밀번호 암호화
        String hashedPw = passwordEncoder.encode(param.getUsers_password());

        // UserEntity 설정
        param.setUsers_password(hashedPw);
        param.setUsers_auth_code(authCd);

        //회원가입 처리
        int result = mapper.insUsers(param);

        if(result == 1) {
            String subject = "[WHYGRAM] 인증메일입니다.";
            String txt = String.format("<a href=\"http://localhost:8090/user/auth?users_email=%s&users_auth_code=%s\">인증하기</a>"
                    , param.getUsers_email(), authCd);
            email.sendMimeMessage(param.getUsers_email(), subject, txt);
            return "login?msg=authCode";
        }

        //회원가입 처리 중 에러 발생
        return "join?msg=joinErr";
    }

    //이메일 인증 처리
    public String auth(UserEntity param) {
        int result = mapper.auth(param);
        if (result == 1) {
            return "authDone";
        }
        return "authErr";
    }
}
