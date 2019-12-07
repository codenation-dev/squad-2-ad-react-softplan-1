package com.squad2.lognation.core.security;

import com.squad2.lognation.model.User;
import com.squad2.lognation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserSecurityService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmailIgnoreCase(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }

        return new UserSecurity(user);
    }

}
