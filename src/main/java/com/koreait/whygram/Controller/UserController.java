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

    @Autowired
    private UserService service;

    @GetMapping("/join")
    public void getJoin(UserEntity param, @RequestParam(value = "err", defaultValue = "0") int err, Model model) {

        switch(err) {
            case 1:
                model.addAttribute("errMsg", "가입 실패 했습니다.");
                break;
            case 2:
                model.addAttribute("errMsg", "잘못된 접근 입니다.");
                break;
        }

    }

    @PostMapping("/join")
    public String postJoin(UserEntity param, @RequestParam String pwchk) {

        int result = service.insUsers(param, pwchk);
        switch (result) {
            case 0: return "redirect:user/login"; // 완료
            case 1: return "redirect:user/join?err=1"; // 가입 실패
            case 2: return "redirect:user/join?err=2"; // 검사 실패
        }
        return null;



    }

    @GetMapping("/login")
    public void getLogin(UserEntity param) {}
}
