package com.querymind.service;

import com.querymind.dto.SavedQueryDto;
import java.util.List;

public interface SavedQueryService {
    SavedQueryDto saveSavedQuery(SavedQueryDto savedQueryDto);
    List<SavedQueryDto> getAllSavedQueries();
    void deleteSavedQuery(Long id);
}