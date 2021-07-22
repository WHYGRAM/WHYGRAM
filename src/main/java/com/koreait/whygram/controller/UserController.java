package com.koreait.whygram.controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;

    @PostMapping("/join")
    public String postJoin(UserEntity userEntity, @RequestParam String pwchk) {
        String path = service.insUsers(userEntity, pwchk);
        return "redirect:" + path;
    }

    @ResponseBody
    @GetMapping("/emailCheck/{users_email}")
    public Map<String, Integer> emailCheck(UserEntity param, @PathVariable String users_email) {
        System.out.println(users_email);

        param.setUsers_email(users_email);
        int result = service.selEmail(param);

        Map<String, Integer> data = new HashMap();
        data.put("result", result);
        return data;
    }

    @ResponseBody
    @GetMapping("/nickNmCheck/{users_nickname}")
    public Map<String, Integer> nickNmCheck(UserEntity param, @PathVariable String users_nickname) {
        System.out.println(users_nickname);

        param.setUsers_nickname(users_nickname);
        int result = service.selNickNm(param);

        Map<String, Integer> data = new HashMap();
        data.put("result", result);
        return data;
    }


    @GetMapping("/auth")
    public String auth(UserEntity param) {
        String msg = service.auth(param);
        return "redirect:/whygram?msg=" + msg;
    }

    @ResponseBody
    @PostMapping("/findPw")
    public Map<String, Integer> findPw(@RequestBody UserEntity param) {
        System.out.println(param.getUsers_email());
        System.out.println(param.getUsers_nickname());

        int result = service.findPw(param);
        Map<String, Integer> data = new HashMap();
        data.put("result", result);
        return data;
    }


}