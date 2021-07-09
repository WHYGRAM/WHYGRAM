package com.koreait.whygram.common;

public interface EmailService {
    void sendMimeMessage(String to, String subject, String text);
}
