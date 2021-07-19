package com.koreait.whygram.controller;

import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired UserService service;
    @Autowired UserMapper mapper;

    @PostMapping("/mypage")
    public String postMypage(MultipartFile users_img) {
        service.profileImg(users_img);
        return "redirect:mypage";
    }

    @GetMapping("/mypage")
    public void getMypage(Model model, UserEntity param) {
        model.addAttribute("profile", service.selUserImg(param));
    }

}
