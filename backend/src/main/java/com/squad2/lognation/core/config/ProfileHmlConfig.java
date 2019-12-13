package com.squad2.lognation.core.config;

import com.squad2.lognation.core.mail.EmailService;
import com.squad2.lognation.core.mail.SmtpEmailServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("hml")
public class ProfileHmlConfig {

    @Bean
    public EmailService emailService() {
        return new SmtpEmailServiceImpl();
    }

}
