package com.squad2.lognation.core.mail;

public interface EmailService {

    void sendEmail(String to, String subject, String plainText);

    void sendHtmlEmail(String to, String subject, String htmlText);
}
