package com.querymind.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class ResultFormatterService {

    public ResultFormat formatResult(List<Map<String, Object>> rawResult) {
        if (rawResult.isEmpty()) {
            return new ResultFormat(new ArrayList<>(), new ArrayList<>());
        }

        // Get column names from the first row
        Set<String> columnSet = new LinkedHashSet<>(rawResult.get(0).keySet());
        List<String> columns = new ArrayList<>(columnSet);

        // Convert rows
        List<List<Object>> rows = new ArrayList<>();
        for (Map<String, Object> row : rawResult) {
            List<Object> rowData = new ArrayList<>();
            for (String col : columns) {
                rowData.add(row.get(col));
            }
            rows.add(rowData);
        }

        return new ResultFormat(columns, rows);
    }

    public static class ResultFormat {
        private final List<String> columns;
        private final List<List<Object>> rows;

        public ResultFormat(List<String> columns, List<List<Object>> rows) {
            this.columns = columns;
            this.rows = rows;
        }

        public List<String> getColumns() {
            return columns;
        }

        public List<List<Object>> getRows() {
            return rows;
        }
    }
}