package com.querymind.dto;

import java.time.LocalDateTime;

public class QueryHistoryDto {
    private Long id;
    private String question;
    private String generatedSql;
    private String status;
    private Integer executionTimeMs;
    private LocalDateTime createdAt;

    public QueryHistoryDto() {}

    public QueryHistoryDto(Long id, String question, String generatedSql,
                          String status, Integer executionTimeMs, LocalDateTime createdAt) {
        this.id = id;
        this.question = question;
        this.generatedSql = generatedSql;
        this.status = status;
        this.executionTimeMs = executionTimeMs;
        this.createdAt = createdAt;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getGeneratedSql() { return generatedSql; }
    public void setGeneratedSql(String generatedSql) { this.generatedSql = generatedSql; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(Integer executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}