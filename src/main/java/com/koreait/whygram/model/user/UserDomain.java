package com.koreait.whygram.model.user;

import lombok.Data;

@Data
public class UserDomain extends UserEntity{
    //회원가입
    private int emailCheck;
    private int nickNmCheck;
    //프로필
    private int isYourFollower;
    private int isMyFollower;
    private String datasetFollow;
    private String followIcon;
}
