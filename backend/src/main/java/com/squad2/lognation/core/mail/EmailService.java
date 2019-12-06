package com.squad2.lognation.core.mail;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMailMessage;

public interface EmailService {

    void sendEmail(SimpleMailMessage message);

    void sendHtmlEmail(MimeMailMessage message);
}
