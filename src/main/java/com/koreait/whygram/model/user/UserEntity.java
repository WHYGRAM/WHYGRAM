package com.koreait.whygram.model.user;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class UserEntity {

    // 로그인에 사용
    private int users_id;

    private String users_email;
    private String users_password;
    private String users_name;
    private int users_gender;
    private String users_date_birth;
    private String users_nickname;
    private String pwchk;

    // 프로필, 인증 관련
    private String users_regdt;
    private String users_img;
    private String users_ctnt;
    private String users_auth_code;
    private int users_is_quit;
}
