package com.koreait.whygram.service;

import com.koreait.whygram.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired UserMapper mapper;
}
