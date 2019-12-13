package com.squad2.lognation.core.mail;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MockEmailServiceImpl implements EmailService {

    private static final Logger logger = LoggerFactory.getLogger(MockEmailServiceImpl.class);

    @Override
    public void sendEmail(String to, String subject, String plainText) {
        logger.info("Simulating simple mail message sending...");
        logger.info("To: " + to);
        logger.info("Subject: " + subject);
        logger.info("Plain text: " + plainText);
        logger.info("Simulating done!");
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String htmlText) {
        logger.info("Simulating html mail message sending...");
        logger.info("To: " + to);
        logger.info("Subject: " + subject);
        logger.info("Html text: " + htmlText);
        logger.info("Simulating done!");
    }

}
