package com.squad2.lognation.model;

import com.squad2.lognation.enums.EnvironmentEnum;
import com.squad2.lognation.enums.LevelEnum;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class Event extends BasicModel {

    private String title;
    private String details;
    private Long amount;
    private String userToken;
    private String application;
    private String ipOrigin;
    private Boolean shelved;
    @Enumerated(EnumType.STRING)
    private EnvironmentEnum environment;
    @Enumerated(EnumType.STRING)
    private LevelEnum level;

}
