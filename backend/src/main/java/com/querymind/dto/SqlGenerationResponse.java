package com.querymind.dto;

public class SqlGenerationResponse {
    private String sql;
    private String explanation;

    public SqlGenerationResponse() {}

    public SqlGenerationResponse(String sql, String explanation) {
        this.sql = sql;
        this.explanation = explanation;
    }

    public String getSql() { return sql; }
    public void setSql(String sql) { this.sql = sql; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
}