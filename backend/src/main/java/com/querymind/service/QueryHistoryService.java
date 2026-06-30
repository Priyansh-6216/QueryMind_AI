package com.querymind.service;

import com.querymind.dto.QueryHistoryDto;
import com.querymind.entity.QueryHistory;
import com.querymind.repository.QueryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueryHistoryService {

    @Autowired
    private QueryHistoryRepository repository;

    public void saveQueryHistory(String question, String generatedSql, String explanation,
                                String status, Integer rowCount, Integer executionTimeMs,
                                String errorMessage) {
        QueryHistory history = new QueryHistory(question, generatedSql, explanation,
                                               status, rowCount, executionTimeMs, errorMessage);
        repository.save(history);
    }

    public List<QueryHistoryDto> getAllHistory() {
        return repository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void deleteHistory(Long id) {
        repository.deleteById(id);
    }

    private QueryHistoryDto convertToDto(QueryHistory entity) {
        return new QueryHistoryDto(
            entity.getId(),
            entity.getQuestion(),
            entity.getGeneratedSql(),
            entity.getStatus(),
            entity.getExecutionTimeMs(),
            entity.getCreatedAt()
        );
    }
}