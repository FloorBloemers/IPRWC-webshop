package com.example.models;

import org.springframework.http.HttpStatus;

public class ApiResponseModel<Type> {
    private HttpStatus code;
    private Type payload;
    private String message;

    public ApiResponseModel(HttpStatus code, Type payload) {
        this.code = code;
        this.payload = payload;
    }

    public ApiResponseModel(HttpStatus code, String message) {
        this.code = code;
        this.message = message;
    }

    public HttpStatus getCode() {
        return code;
    }

    public void setCode(HttpStatus code) {
        this.code = code;
    }

    public Type getPayload() {
        return payload;
    }

    public void setPayload(Type payload) {
        this.payload = payload;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}