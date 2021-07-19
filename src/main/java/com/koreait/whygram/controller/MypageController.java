package com.koreait.whygram.controller;

import com.koreait.whygram.model.user.UserEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/mypage")
public class MypageController {
    @GetMapping("/mypage")
    public void mypage() { }
}
