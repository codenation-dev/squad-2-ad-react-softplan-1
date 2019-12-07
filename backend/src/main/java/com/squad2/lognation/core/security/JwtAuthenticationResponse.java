package com.squad2.lognation.core.security;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class JwtAuthenticationResponse {

    private String accessToken;
    private String tokenType;

    public JwtAuthenticationResponse(String accessToken) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
    }

}
