package com.squad2.lognation.repository;

import com.squad2.lognation.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailIgnoreCase(String email);

    Boolean existsByEmail(String email);

    User findByToken(String token);

    Boolean existsByToken(String token);

}