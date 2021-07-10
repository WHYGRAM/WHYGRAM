package com.koreait.whygram.Controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired private UserService service;


    @GetMapping("/join")
    public void getJoin(UserEntity userEntity, @RequestParam(defaultValue = "") String msg, Model model) {
        String errMsg = "";
        switch (msg) {
            case "wrongAccess" :  errMsg = "잘못된 접근입니다."; break;
            case "joinErr" : errMsg = "회원가입 처리 중 오류가 발생했습니다."; break;
        }
        model.addAttribute("errMsg", errMsg);
    }

    @PostMapping("/join")
    public String postJoin(UserEntity userEntity, @RequestParam String pwchk) {
        String path = service.insUsers(userEntity, pwchk);
        return "redirect:" + path;
    }

    @GetMapping("/login")
    public void getLogin(UserEntity userEntity, @RequestParam(defaultValue = "") String msg, Model model) {
        String errMsg = "";
        switch (msg) {
            case "authCode" : errMsg = "이메일 인증을 해주세요."; break;
            case "authDone" : errMsg = "인증 되었습니다."; break;
            case "authErr" : errMsg = "인증 실패되었습니다."; break;
            case "loginErr" : errMsg = "로그인 실패했습니다."; break;
        }
        model.addAttribute("errMsg", errMsg);
    }

    @GetMapping("/auth")
    public String auth(UserEntity param) {
        String msg = service.auth(param);
        return "redirect:login?msg=" + msg;
    }


}
