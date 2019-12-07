package com.squad2.lognation.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Lob;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class User extends BasicModel {

    private String email;
    private String firstName;
    private String lastName;
    private String token;
    @JsonIgnore
    private String password;
    @Lob
    @JsonIgnore
    @Basic(fetch=FetchType.LAZY)
    private byte[] photo;
}