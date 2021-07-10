package com.koreait.whygram.Controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;


    @GetMapping("/join")
    public void getJoin(UserEntity userEntity, @RequestParam(defaultValue = "") String err, Model model) {
        switch (err) {
            case "wrongAccess" : model.addAttribute("errMsg", "잘못된 접근입니다."); break;
            case "joinErr" : model.addAttribute("errMsg", "회원가입 처리 중 오류가 발생했습니다."); break;
        }
    }

    @PostMapping("/join")
    public String postJoin(UserEntity userEntity, @RequestParam String pwchk) {
        String path = service.insUsers(userEntity, pwchk);
        return "redirect:" + path;
    }

    @GetMapping("/login")
    public void getLogin() {}

    @GetMapping("/auth")
    public String auth(UserEntity param) {
        int result = service.auth(param);
        return "redirect:login?auth=" + result;
    }


}
