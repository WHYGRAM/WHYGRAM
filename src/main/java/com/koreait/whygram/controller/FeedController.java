package com.koreait.whygram.controller;

import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("/feed")
public class FeedController {

    @Autowired private UserService service;

    @GetMapping("/home")
    public void home() {}

    @GetMapping("/profile")
    public void profile() { }

    @PostMapping("/profile")
    public String profile(MultipartFile[] imgArr) {
        return "";
    }
}
