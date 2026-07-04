package com.querymind.dto;

public class SqlGenerationResponse {
    private String sql;
    private String explanation;
    private String suggestedChartType;

    public SqlGenerationResponse() {}

    public SqlGenerationResponse(String sql, String explanation, String suggestedChartType) {
        this.sql = sql;
        this.explanation = explanation;
        this.suggestedChartType = suggestedChartType;
    }

    public String getSql() { return sql; }
    public void setSql(String sql) { this.sql = sql; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getSuggestedChartType() { return suggestedChartType; }
    public void setSuggestedChartType(String suggestedChartType) { this.suggestedChartType = suggestedChartType; }
}