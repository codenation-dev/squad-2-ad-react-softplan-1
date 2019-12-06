package com.squad2.lognation.endpoint.dto;

import com.squad2.lognation.enums.EnvironmentEnum;
import com.squad2.lognation.enums.FilterKeyEnum;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class SearchCriteriaDto {

    private EnvironmentEnum environment;
    private FilterKeyEnum filterKey;
    private String filterValue;

    public SearchCriteriaDto () {
        environment = EnvironmentEnum.PRODUCTION;
        filterKey = FilterKeyEnum.NONE;
        filterValue = "";
    }

}
