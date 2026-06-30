package com.querymind.exception;

import com.querymind.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnsafeSqlException.class)
    public ResponseEntity<ErrorResponse> handleUnsafeSql(UnsafeSqlException e, WebRequest request) {
        ErrorResponse error = new ErrorResponse("ERROR", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LlmResponseException.class)
    public ResponseEntity<ErrorResponse> handleLlmError(LlmResponseException e, WebRequest request) {
        ErrorResponse error = new ErrorResponse("ERROR", "AI service unavailable: " + e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.SERVICE_UNAVAILABLE);
    }

    @ExceptionHandler(QueryExecutionException.class)
    public ResponseEntity<ErrorResponse> handleQueryExecution(QueryExecutionException e, WebRequest request) {
        ErrorResponse error = new ErrorResponse("ERROR", "Query execution failed: " + e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRequest(IllegalArgumentException e, WebRequest request) {
        ErrorResponse error = new ErrorResponse("ERROR", e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception e, WebRequest request) {
        ErrorResponse error = new ErrorResponse("ERROR", "An unexpected error occurred");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}