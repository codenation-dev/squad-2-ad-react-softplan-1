package com.squad2.lognation.endpoint.dto;

import com.squad2.lognation.model.User;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class SignupRequestDto {

    private String email;
    private String firstName;
    private String lastName;
    private String password;

    public User toUser() {
        return User.builder()
                .email(this.email)
                .firstName(this.firstName)
                .lastName(this.lastName)
                .password(this.password)
                .build();
    }

}
