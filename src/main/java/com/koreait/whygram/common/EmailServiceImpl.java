package com.koreait.whygram.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Component
public class EmailServiceImpl implements EmailService {

    @Autowired private JavaMailSender mailSender;

    @Override
    public void sendMimeMessage(String to, String subject, String text) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom("goonturtle4u@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text, true);
            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
