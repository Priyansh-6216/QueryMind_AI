package com.querymind.service;

import com.querymind.dto.SavedQueryDto;
import com.querymind.entity.SavedQuery;
import com.querymind.repository.SavedQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SavedQueryServiceImpl implements SavedQueryService {

    @Autowired
    private SavedQueryRepository savedQueryRepository;

    @Override
    public SavedQueryDto saveSavedQuery(SavedQueryDto savedQueryDto) {
        SavedQuery savedQuery = new SavedQuery(
                savedQueryDto.getName(),
                savedQueryDto.getQuestion(),
                savedQueryDto.getGeneratedSql(),
                savedQueryDto.getExplanation()
        );
        if (savedQueryDto.getId() != null) {
            savedQuery.setId(savedQueryDto.getId());
        }
        savedQuery.setCreatedAt(savedQueryDto.getCreatedAt() != null ? savedQueryDto.getCreatedAt() : LocalDateTime.now());
        savedQuery.setUpdatedAt(LocalDateTime.now());
        SavedQuery saved = savedQueryRepository.save(savedQuery);
        return entityToDto(saved);
    }

    @Override
    public List<SavedQueryDto> getAllSavedQueries() {
        return savedQueryRepository.findAll().stream()
                .map(this::entityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteSavedQuery(Long id) {
        savedQueryRepository.deleteById(id);
    }

    @Override
    public Optional<SavedQueryDto> getSavedQueryById(Long id) {
        return savedQueryRepository.findById(id).map(this::entityToDto);
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