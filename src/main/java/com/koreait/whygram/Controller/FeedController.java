package com.koreait.whygram.Controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/feed")
public class FeedController {

    @Autowired private UserService service;

    @GetMapping("/home")
    public void home() {}
}
