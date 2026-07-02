package com.querymind.service;

import com.querymind.dto.SavedQueryDto;
import java.util.List;

public interface SavedQueryService {
    SavedQueryDto saveSavedQuery(SavedQueryDto savedQueryDto);
    java.util.Optional<SavedQueryDto> getSavedQueryById(Long id);
    List<SavedQueryDto> getAllSavedQueries();
    void deleteSavedQuery(Long id);
}