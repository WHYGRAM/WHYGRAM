package com.koreait.whygram.security;

import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import javax.xml.ws.Action;

public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired private UserMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setUsers_email(email);
        UserEntity loginUser = mapper.selUsers(param);
        if(loginUser == null) {
            return null; // 아이디가 없음
        }
        return new UserDetailsImpl(loginUser); // 아이디 있음
    }
}
