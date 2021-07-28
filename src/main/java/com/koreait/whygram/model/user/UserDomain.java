package com.koreait.whygram.model.user;

import lombok.Data;

@Data
public class UserDomain extends UserEntity{
    private int emailCheck;
    private int nickNmCheck;
    private int isYourFollower;
    private int isMyFollower;
}
