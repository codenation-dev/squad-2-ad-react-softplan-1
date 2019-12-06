package com.squad2.lognation.core.exception;

import com.squad2.lognation.core.localization.LocalizationTranslator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class StandardExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String UNKNOWN_ERROR_MSG_CODE = "M10000";
    private static final String UNAUTHORIZED_MSG_CODE = "M10002";

    @ExceptionHandler(StandardException.class)
    public ResponseEntity<StandardExceptionResponse> handleStandardException(StandardException e, HttpServletRequest request) {

        StandardExceptionResponse response = StandardExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(e.getHttpStatus().value())
                .code(e.getCode())
                .message(LocalizationTranslator.toLocale(e.getCode(), e.getParams()))
                .details(e.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(e.getHttpStatus())
                .body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<StandardExceptionResponse> handleException(BadCredentialsException e, HttpServletRequest request) {

        StandardExceptionResponse response = StandardExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .code(UNAUTHORIZED_MSG_CODE)
                .message(LocalizationTranslator.toLocale(UNAUTHORIZED_MSG_CODE))
                .details(e.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(response);
    }

    @ExceptionHandler({Exception.class, RuntimeException.class})
    public ResponseEntity<StandardExceptionResponse> handleException(Exception e, HttpServletRequest request) {

        StandardExceptionResponse response = StandardExceptionResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .code(UNKNOWN_ERROR_MSG_CODE)
                .message(LocalizationTranslator.toLocale(UNKNOWN_ERROR_MSG_CODE))
                .details(e.getClass().toString() + ": " + e.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}
