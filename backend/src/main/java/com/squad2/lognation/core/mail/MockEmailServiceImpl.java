package com.squad2.lognation.core.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMailMessage;

public class MockEmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(MockEmailServiceImpl.class);

    @Override
    public void sendEmail(SimpleMailMessage message) {
        logger.info("Simulating simple mail message sending...");
        logger.info(message.toString());
        logger.info("Simulating done!");
    }

    @Override
    public void sendHtmlEmail(MimeMailMessage message) {
        logger.info("Simulating html mail message sending...");
        logger.info(message.toString());
        logger.info("Simulating done!");
    }

}
