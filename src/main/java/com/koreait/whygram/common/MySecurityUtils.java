package com.koreait.whygram.common;

import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class MySecurityUtils {

    public String getRandomNumber(int len) {

        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < len; i++) {
            int index = rnd.nextInt(3);
            switch (index) {
                case 0:
                    // 영문 소문자
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    // 영문 대문자
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    // 숫자
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }
        return key.toString();
    }
}
