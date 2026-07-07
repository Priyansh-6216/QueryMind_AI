package com.querymind.service;

import com.querymind.dto.SavedQueryDto;
import com.querymind.entity.AppUser;
import com.querymind.entity.SavedQuery;
import com.querymind.repository.SavedQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SavedQueryServiceImpl implements SavedQueryService {

    @Autowired
    private SavedQueryRepository savedQueryRepository;

    private AppUser getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof AppUser) {
            return (AppUser) authentication.getPrincipal();
        }
        return null;
    }

    @Override
    public SavedQueryDto saveSavedQuery(SavedQueryDto savedQueryDto) {
        AppUser currentUser = getCurrentUser();
        
        SavedQuery savedQuery;
        if (savedQueryDto.getId() != null) {
            // Check if it belongs to user
            Optional<SavedQuery> existing = savedQueryRepository.findById(savedQueryDto.getId());
            if (existing.isPresent() && existing.get().getUser() != null && currentUser != null && existing.get().getUser().getId().equals(currentUser.getId())) {
                savedQuery = existing.get();
                savedQuery.setName(savedQueryDto.getName());
                savedQuery.setQuestion(savedQueryDto.getQuestion());
                savedQuery.setGeneratedSql(savedQueryDto.getGeneratedSql());
                savedQuery.setExplanation(savedQueryDto.getExplanation());
            } else {
                // If it doesn't exist or doesn't belong to user, throw or create new (here we just throw or return null, but let's throw exception)
                throw new RuntimeException("SavedQuery not found or not authorized to update");
            }
        } else {
            savedQuery = new SavedQuery(
                    savedQueryDto.getName(),
                    savedQueryDto.getQuestion(),
                    savedQueryDto.getGeneratedSql(),
                    savedQueryDto.getExplanation()
            );
            savedQuery.setCreatedAt(savedQueryDto.getCreatedAt() != null ? savedQueryDto.getCreatedAt() : LocalDateTime.now());
            savedQuery.setUser(currentUser);
        }
        
        savedQuery.setUpdatedAt(LocalDateTime.now());
        SavedQuery saved = savedQueryRepository.save(savedQuery);
        return entityToDto(saved);
    }

    @Override
    public List<SavedQueryDto> getAllSavedQueries() {
        AppUser currentUser = getCurrentUser();
        if (currentUser == null) return Collections.emptyList();
        return savedQueryRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId()).stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSavedQuery(Long id) {
        AppUser currentUser = getCurrentUser();
        if (currentUser != null) {
            savedQueryRepository.findByIdAndUserId(id, currentUser.getId())
                    .ifPresent(savedQuery -> savedQueryRepository.delete(savedQuery));
        }
    }

    @Override
    public Optional<SavedQueryDto> getSavedQueryById(Long id) {
        AppUser currentUser = getCurrentUser();
        if (currentUser != null) {
            return savedQueryRepository.findByIdAndUserId(id, currentUser.getId()).map(this::entityToDto);
        }
        return Optional.empty();
    }

    private SavedQueryDto entityToDto(SavedQuery savedQuery) {
        SavedQueryDto dto = new SavedQueryDto();
        dto.setId(savedQuery.getId());
        dto.setName(savedQuery.getName());
        dto.setQuestion(savedQuery.getQuestion());
        dto.setGeneratedSql(savedQuery.getGeneratedSql());
        dto.setExplanation(savedQuery.getExplanation());
        dto.setCreatedAt(savedQuery.getCreatedAt());
        dto.setUpdatedAt(savedQuery.getUpdatedAt());
        return dto;
    }
}