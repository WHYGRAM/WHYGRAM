package com.koreait.whygram.Controller;

import com.koreait.whygram.model.user.UserEntity;
import com.koreait.whygram.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
@RequestMapping("/")
public class HomeController {
    @GetMapping("/whygram")
    public String home(UserEntity userEntity, @RequestParam(defaultValue = "") String msg, Model model) {
        String errMsg = "";
        switch (msg) {
            case "wrongAccess" :  errMsg = "잘못된 접근입니다."; break;   //회원가입
            case "joinErr" : errMsg = "회원가입 처리 중 오류가 발생했습니다."; break; //회원가입
            case "authCode" : errMsg = "이메일 인증을 해주세요."; break; //로그인
            case "authDone" : errMsg = "인증 되었습니다."; break; //로그인
            case "authErr" : errMsg = "인증 실패되었습니다."; break; //로그인
        }
        model.addAttribute("errMsg", errMsg);
        return "startPage";
    }
}
