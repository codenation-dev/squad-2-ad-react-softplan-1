package com.squad2.lognation.core.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StandardExceptionResponse {

    private LocalDateTime timestamp;
    private Integer status;
    private String code;
    private String message;
    private String details;
    private String path;

}
