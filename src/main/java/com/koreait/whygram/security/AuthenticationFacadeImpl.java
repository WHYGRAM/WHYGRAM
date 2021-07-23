package com.koreait.whygram.security;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.model.CustomUserPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFacadeImpl implements IAuthenticationFacade {

    @Override
    public UserEntity getLoginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserPrincipal userDetails = (CustomUserPrincipal)auth.getPrincipal();
        return userDetails.getUser();
    }

    @Override
    public int getLoginUserPk() {
        return getLoginUser().getUsers_id();
    }
}
