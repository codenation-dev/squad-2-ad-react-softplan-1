package com.squad2.lognation.core.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;

import java.util.Date;

public class SmtpEmailServiceImpl implements EmailService {

    @Value("${mail.default.sender}")
    private String sender;

    @Autowired
    private MailSender simpleMailSender;

    @Autowired
    private JavaMailSender mimeMailSender;

    private static final Logger logger = LoggerFactory.getLogger(SmtpEmailServiceImpl.class);

    @Override
    public void sendEmail(SimpleMailMessage message) {
        logger.info("Simple mail message sending...");
        message.setFrom(sender);
        message.setSentDate(new Date(System.currentTimeMillis()));
        simpleMailSender.send(message);
        logger.info("Message sent!");
    }

    @Override
    public void sendHtmlEmail(MimeMailMessage message) {
        logger.info("Html mail message sending...");
        message.setFrom(sender);
        message.setSentDate(new Date(System.currentTimeMillis()));
        mimeMailSender.send(message.getMimeMessage());
        logger.info("Message sent!");
    }

}
