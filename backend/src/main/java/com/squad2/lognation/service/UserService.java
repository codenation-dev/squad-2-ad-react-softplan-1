package com.squad2.lognation.service;

import com.squad2.lognation.core.exception.StandardException;
import com.squad2.lognation.core.mail.EmailService;
import com.squad2.lognation.model.User;
import com.squad2.lognation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
public class UserService extends BaseService<User, UserRepository> {

    private static final String ALPHA_NUMERIC_STRING = "abcdefghijklmnopqrstuvwxyz0123456789";

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private EmailService emailService;

    private String getRandomToken() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "");
    }

    private String getRandomPassword(Integer passwordLength) {
        StringBuilder builder = new StringBuilder();
        while (passwordLength-- != 0) {
            int character = (int)(Math.random()*ALPHA_NUMERIC_STRING.length());
            builder.append(ALPHA_NUMERIC_STRING.charAt(character));
        }
        return builder.toString();
    }

    private void sendForgotPasswordEmail(User user) {
        Context context = new Context();
        context.setVariable("user", user);
        String htmlMessage = templateEngine.process("email/forgotPassword", context);;
        emailService.sendHtmlEmail(
                user.getEmail(),
                "Lognation - Forgot your password?",
                htmlMessage);
    }

    public void checkEmailAvailability(String email) {
        if (existsByEmail(email)) {
            throw new StandardException("M00006")
                    .addParam(email);
        }
    }

    public void forgotPassword(String email) {
        User user = findByEmail(email);
        if (user == null) {
            throw new StandardException("M00016")
                    .addParam(email);
        }
        user.setPassword(getRandomPassword(8));
        sendForgotPasswordEmail(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        update(user);
    }

    @Override
    protected void normalizeInsert(User user) {
        super.normalizeInsert(user);
        user.setToken(getRandomToken());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
    }

    @Override
    protected void validateInsert(User user) {
        super.validateInsert(user);

        if (StringUtils.isEmpty(user.getFirstName())) {
            throw new StandardException("M00007");
        }

        if (StringUtils.isEmpty(user.getPassword())) {
            throw new StandardException("M00004");
        }

        if (StringUtils.isEmpty(user.getEmail())) {
            throw new StandardException("M00005");
        }

        if (!user.getEmail().contains("@")) {
            throw new StandardException("M00005");
        }

        checkEmailAvailability(user.getEmail());
    }

    public Boolean existsByEmail(String email) {
        return repository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return repository.findByEmailIgnoreCase(email);
    }

    public Boolean existsByToken(String token) {
        return repository.existsByToken(token);
    }

    public User findByToken(String token) {
        return repository.findByToken(token);
    }

    public User Signup(User user) {
        validateInsert(user);
        return insert(user);
    }

    public void setUserPhoto(Long id, byte[] photo) {
        User user = findById(id);
        user.setPhoto(photo);
        update(user);
    }

    public byte[] getUserPhoto(Long id) {
        User user = findById(id);
        return user.getPhoto();
    }

}
