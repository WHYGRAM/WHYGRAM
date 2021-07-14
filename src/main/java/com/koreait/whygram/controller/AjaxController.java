package com.koreait.whygram.controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ajax")
public class AjaxController {

    @Autowired
    private UserService service;

    @GetMapping("/emailCheck/{users_email}")
    public int emailCheck(UserEntity param, @PathVariable String users_email) {
        param.setUsers_email(users_email);
        return service.;
    }



}
