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

    public String executeExplain(String sql) {
        try {
            // Postgres supports EXPLAIN ANALYZE. Since the app is built around postgres, this should work.
            List<Map<String, Object>> result = databaseConnectionManager.getTargetJdbcTemplate().queryForList("EXPLAIN ANALYZE " + sql);
            StringBuilder plan = new StringBuilder();
            for (Map<String, Object> row : result) {
                // The column name is usually "QUERY PLAN"
                for (Object value : row.values()) {
                    if (value != null) {
                        plan.append(value.toString()).append("\n");
                    }
                }
            }
            return plan.toString();
        } catch (Exception e) {
            // If EXPLAIN ANALYZE fails (e.g. for some non-select queries or syntax issues), log and return error
            return "Execution Plan not available: " + e.getMessage();
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