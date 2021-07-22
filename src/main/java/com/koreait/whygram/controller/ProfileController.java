package com.koreait.whygram.controller;

import com.koreait.whygram.mapper.ProfileMapper;
import com.koreait.whygram.mapper.UserMapper;
import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.ProfileService;
import com.koreait.whygram.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    ProfileService service;

    @ResponseBody
    @PostMapping("/mypage")
    public Map<String, Integer> postMypage(MultipartFile users_img) {
        Map<String, Integer> res = new HashMap();
        res.put("result", service.profileImg(users_img));
        return res;
    }


    @GetMapping("/mypage")
    public void getMypage(Model model, UserEntity param) {
        model.addAttribute("profile", service.selUserImg(param));
    }

}
