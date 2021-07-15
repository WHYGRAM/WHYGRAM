package com.koreait.whygram.controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.security.UserDetailsImpl;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;


    @PostMapping("/join")
    public String postJoin(UserEntity userEntity, @RequestParam String pwchk) {
        String path = service.insUsers(userEntity, pwchk);
        return "redirect:" + path;
    }


    @GetMapping("/auth")
    public String auth(UserEntity param) {
        String msg = service.auth(param);
        return "redirect:/whygram?msg=" + msg;
    }

    @PostMapping("/mypage")
    public String postMypage(MultipartFile[] imgArr) {
        service.profileImg(imgArr);
        return "redirect:mypage";
    }

    @GetMapping("/mypage")
    public void getMypage(Model model, UserEntity param, @AuthenticationPrincipal UserDetailsImpl userDetails) {

    }

}