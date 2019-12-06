package com.squad2.lognation.endpoint.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserProfileDto {

    private String firstName;
    private String lastName;

}
