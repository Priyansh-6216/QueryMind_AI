package com.querymind.service;

import com.querymind.dto.QueryHistoryDto;
import com.querymind.entity.AppUser;
import com.querymind.entity.QueryHistory;
import com.querymind.repository.QueryHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QueryHistoryService {

    @Autowired
    private QueryHistoryRepository repository;

    private AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof AppUser) {
            return (AppUser) authentication.getPrincipal();
        }
        return null;
    }

    public void saveQueryHistory(String question, String generatedSql, String explanation,
                                String status, Integer rowCount, Integer executionTimeMs,
                                String errorMessage) {
        QueryHistory history = new QueryHistory(question, generatedSql, explanation,
                                               status, rowCount, executionTimeMs, errorMessage);
        history.setUser(getCurrentUser());
        repository.save(history);
    }

    public List<QueryHistoryDto> getAllHistory() {
        AppUser currentUser = getCurrentUser();
        if (currentUser == null) {
            return Collections.emptyList();
        }
        return repository.findByUserIdOrderByCreatedAtDesc(currentUser.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public void deleteHistory(Long id) {
        AppUser currentUser = getCurrentUser();
        if (currentUser != null) {
            // Alternatively, could check if history belongs to user before deleting
            repository.findById(id).ifPresent(history -> {
                if (history.getUser() != null && history.getUser().getId().equals(currentUser.getId())) {
                    repository.deleteById(id);
                }
            });
        }
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