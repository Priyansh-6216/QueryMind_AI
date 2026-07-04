package com.querymind.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class QueryExecutorService {

    @Autowired
    private DatabaseConnectionManager databaseConnectionManager;

    public QueryResult executeQuery(String sql) {
        long startTime = System.currentTimeMillis();

        try {
            List<Map<String, Object>> result = databaseConnectionManager.getTargetJdbcTemplate().queryForList(sql);
            long executionTime = System.currentTimeMillis() - startTime;

            return new QueryResult(result, executionTime);
        } catch (Exception e) {
            long executionTime = System.currentTimeMillis() - startTime;
            throw new RuntimeException("Query execution failed: " + e.getMessage(), e);
        }
    }

    public static class QueryResult {
        private final List<Map<String, Object>> rows;
        private final long executionTimeMs;

        public QueryResult(List<Map<String, Object>> rows, long executionTimeMs) {
            this.rows = rows;
            this.executionTimeMs = executionTimeMs;
        }

        public List<Map<String, Object>> getRows() {
            return rows;
        }

        public long getExecutionTimeMs() {
            return executionTimeMs;
        }
    }
}