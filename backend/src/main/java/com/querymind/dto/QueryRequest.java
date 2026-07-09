package com.querymind.dto;

public class QueryRequest {
    private String question;
    private String previousQuestion;
    private String previousSql;

    public QueryRequest() {}

    public QueryRequest(String question) {
        this.question = question;
    }

    public QueryRequest(String question, String previousQuestion, String previousSql) {
        this.question = question;
        this.previousQuestion = previousQuestion;
        this.previousSql = previousSql;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getPreviousQuestion() {
        return previousQuestion;
    }

    public void setPreviousQuestion(String previousQuestion) {
        this.previousQuestion = previousQuestion;
    }

    public String getPreviousSql() {
        return previousSql;
    }

    public void setPreviousSql(String previousSql) {
        this.previousSql = previousSql;
    }
}