package com.squad2.lognation.core.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.http.HttpStatus;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper=false)
public class StandardException extends RuntimeException {

    private String code;
    private HttpStatus httpStatus;
    private List<String> params = new ArrayList<String>();

    public StandardException(String code) {
        this.code = code;
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }

    public StandardException(String code, String details) {
        super(details);
        this.code = code;
        this.httpStatus = HttpStatus.BAD_REQUEST;
    }

    public StandardException(String code, HttpStatus httpStatus) {
        this.code = code;
        this.httpStatus = httpStatus;
    }

    public StandardException setHttpStatus(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
        return this;
    }

    public StandardException addParam(String param) {
        params.add(param);
        return this;
    }

    public StandardException addParam(Integer param) {
        return addParam(param.toString());
    }

    public StandardException addParam(Long param) {
        return addParam(param.toString());
    }
}
