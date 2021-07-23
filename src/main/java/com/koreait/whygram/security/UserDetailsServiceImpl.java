package com.koreait.whygram.security;

import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.model.CustomUserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired private UserMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return new CustomUserPrincipal(loadUserByUsernameAndProvider(email, "local"));
    }

    public UserEntity loadUserByUsernameAndProvider(String id, String provider) throws UsernameNotFoundException {
        UserEntity param = new UserEntity();
        param.setProvider(provider);
        param.setUsers_email(id);
        return mapper.selUsers(param);
    }

    public int insUsers(UserEntity param) {
        if(param == null) { return 0; }
        return mapper.insUsers(param);
    }
}
