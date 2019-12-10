package com.squad2.lognation.core.security;

import com.squad2.lognation.model.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class JwtAuthenticationResponse {

    private String accessToken;
    private String tokenType;
    private String email;
    private String firstName;
    private String lastName;
    private String token;

    public JwtAuthenticationResponse(String accessToken, User user) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.email = user.getEmail();
        this.token = user.getToken();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
    }

}
