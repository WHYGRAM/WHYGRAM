package com.koreait.whygram.security;

import com.koreait.whygram.model.user.UserEntity;

public interface IAuthenticationFacade {
    UserEntity getLoginUser();
    int getLoginUserPk();
}
