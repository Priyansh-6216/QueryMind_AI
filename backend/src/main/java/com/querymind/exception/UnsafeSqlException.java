package com.querymind.exception;

public class UnsafeSqlException extends RuntimeException {
    public UnsafeSqlException(String message) {
        super(message);
    }

    public UnsafeSqlException(String message, Throwable cause) {
        super(message, cause);
    }
}