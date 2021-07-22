package com.koreait.whygram.service;

import com.koreait.whygram.common.EmailService;
import com.koreait.whygram.common.FileUtils;
import com.koreait.whygram.common.MySecurityUtils;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.IAuthenticationFacade;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserMapper mapper;
    @Autowired
    private MySecurityUtils mySecurityUtils;
    @Autowired
    private EmailService email;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IAuthenticationFacade auth;
    @Autowired
    private FileUtils fileUtils;

    // 이메일 중복확인
    public int selEmail(UserEntity param) {
        int result = mapper.selEmail(param).getEmailCheck();
        return result;
    }

    // 닉네임 중복확인
    public int selNickNm(UserEntity param) {
        int result = mapper.selNickNm(param).getNickNmCheck();
        return result;
    }

    // 이메일 중복 검사 & 닉네임 중복 검사 & 비밀번호 확인 검사
    public boolean isEmNickPwChk(UserEntity param, String pwchk) {
        int emChk = mapper.selEmail(param).getEmailCheck();
        int nickChk = mapper.selNickNm(param).getNickNmCheck();
        boolean pwChk = param.getUsers_password().equals(pwchk);
        if(emChk == 0 && nickChk == 0 && pwChk) {
            return true;
        }
        return false;
    }

    // 회원가입
    public String insUsers(UserEntity param, String pwchk) {

        // 이메일, 닉네임, 비밀번호 검사
        if (!this.isEmNickPwChk(param, pwchk)) {
            return "/whygram?msg=wrongAccess";
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
        param.setUsers_password("");

        //회원가입 인증 이메일
        if (result == 1) {
            String subject = "[WHYGRAM] 인증메일입니다.";
            String txt = String.format("<a href=\"http://localhost:8090/user/auth?users_email=%s&users_auth_code=%s\">인증하기</a>"
                    , param.getUsers_email(), authCd);
            email.sendMimeMessage(param.getUsers_email(), subject, txt);
            return "/whygram?msg=authCode";
        }

        //회원가입 처리 중 에러 발생
        return "/whygram?msg=joinErr";
    }

    //이메일 인증 처리
    public String auth(UserEntity param) {
        int result = mapper.auth(param);
        if (result == 1) {
            return "authDone";
        }
        return "authErr";
    }

    //비밀번호 찾기
    public int findPw(UserEntity param) {
        // 인증번호
        String authCd = mySecurityUtils.getRandomCode(5);

        //임시비밀번호 설정
        String hashedPw = passwordEncoder.encode(authCd);
        param.setUsers_password(hashedPw);
        //임시비밀번호 설정 성공 && 입력된 정보와 일치하는 사용자
        if (mapper.updPw(param) == 1 && mapper.selEmail(param).getEmailCheck() == 1 && mapper.selNickNm(param).getNickNmCheck() == 1) {
            String subject = "[WHYGRAM] 임시비밀번호 입니다.";
            String txt = String.format("<p>%s님의 임시비밀번호 : %s<p><a href=\"http://localhost:8090/whygram\">다시 로그인하러 가기</a>",
                    param.getUsers_nickname(), authCd);
            email.sendMimeMessage(param.getUsers_email(), subject, txt);
            return 1;
        }

        //임시비밀번호 설정 실패 또는 이메일과 닉네임이 없다
        return 0;
    }

    // 프로필 이미지 변경
    public int profileImg(MultipartFile users_img) {
        UserEntity loginUser = auth.getLoginUser();
        int iuser = loginUser.getUsers_id();
        String target = "profile/" + iuser;
        UserEntity param = new UserEntity();
        String saveFileNm = fileUtils.transferTo(users_img, target);

        param.setUsers_id(iuser);
        param.setUsers_img(saveFileNm);
        if (saveFileNm != null) {
            int result = mapper.updUserImg(param);
            if (result == 1) {
                loginUser.setUsers_img(saveFileNm);
                return result;
            }
        }
        return 0;
    }



    public UserEntity selUserImg(UserEntity param) {
        return mapper.selUserImg(param);
    }
}
