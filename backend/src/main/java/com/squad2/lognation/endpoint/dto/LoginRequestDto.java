package com.squad2.lognation.endpoint.dto;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class LoginRequestDto implements Serializable {

    private String email;
    private String password;

    public UsernamePasswordAuthenticationToken toCredentials() {
        return new UsernamePasswordAuthenticationToken(email, password);
    };

}
