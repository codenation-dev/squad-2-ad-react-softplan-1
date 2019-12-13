package com.squad2.lognation.core.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
    public void sendEmail(String to, String subject, String plainText) {
        logger.info("Simple mail message sending...");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setFrom(sender);
        message.setSubject(subject);
        message.setSentDate(new Date(System.currentTimeMillis()));
        message.setText(plainText);
        simpleMailSender.send(message);
        logger.info("Message sent!");
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String htmlText) {
        logger.info("Html mail message sending...");
        MimeMessage message = mimeMailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true);
            messageHelper.setTo(to);
            messageHelper.setFrom(sender);
            messageHelper.setSubject(subject);
            messageHelper.setSentDate(new Date(System.currentTimeMillis()));
            messageHelper.setText(htmlText, true);
            mimeMailSender.send(message);
            logger.info("Message sent!");
        } catch (MessagingException e) {
            logger.info("Failed to send html email: " + e.getMessage());
        }
    }

}
