package com.querymind.dto;

import java.util.List;

public class QueryResponse {
    private String question;
    private String sql;
    private String explanation;
    private List<String> columns;
    private List<List<Object>> rows;
    private int rowCount;
    private long executionTimeMs;
    private String status;

    public QueryResponse() {}

    public QueryResponse(String question, String sql, String explanation,
                        List<String> columns, List<List<Object>> rows,
                        int rowCount, long executionTimeMs, String status) {
        this.question = question;
        this.sql = sql;
        this.explanation = explanation;
        this.columns = columns;
        this.rows = rows;
        this.rowCount = rowCount;
        this.executionTimeMs = executionTimeMs;
        this.status = status;
    }

    // Getters and setters
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getSql() { return sql; }
    public void setSql(String sql) { this.sql = sql; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public List<String> getColumns() { return columns; }
    public void setColumns(List<String> columns) { this.columns = columns; }

    public List<List<Object>> getRows() { return rows; }
    public void setRows(List<List<Object>> rows) { this.rows = rows; }

    public int getRowCount() { return rowCount; }
    public void setRowCount(int rowCount) { this.rowCount = rowCount; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}