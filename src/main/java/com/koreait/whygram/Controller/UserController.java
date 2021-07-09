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
            case 0: return "redirect:login"; // 메일전송
            case 2: return "redirect:join?err=2"; // 아이디 중복
            case 3: return "redirect:join?err=3"; // 아이디 중복 확인, 비밀번호 일치 확인, auth인증 실패
            case 4: return "redirect:join?err=4"; // 아이디 검사o, 비밀번호 일치x
        }
        return null;



    }

    @GetMapping("/login")
    public void getLogin(UserEntity param) {}
}
