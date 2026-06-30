package com.querymind.controller;

import com.querymind.dto.SavedQueryDto;
import com.querymind.service.SavedQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-queries")
@CrossOrigin(origins = "http://localhost:5173")
public class SavedQueryController {

    @Autowired
    private SavedQueryService savedQueryService;

    @GetMapping
    public ResponseEntity<List<SavedQueryDto>> getAllSavedQueries() {
        List<SavedQueryDto> savedQueries = savedQueryService.getAllSavedQueries();
        return ResponseEntity.ok(savedQueries);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SavedQueryDto> getSavedQueryById(@PathVariable Long id) {
        return savedQueryService.getSavedQueryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SavedQueryDto> saveSavedQuery(@RequestBody SavedQueryDto savedQueryDto) {
        SavedQueryDto savedQuery = savedQueryService.saveSavedQuery(savedQueryDto);
        return ResponseEntity.ok(savedQuery);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SavedQueryDto> updateSavedQuery(@PathVariable Long id, @RequestBody SavedQueryDto savedQueryDto) {
        savedQueryDto.setId(id);
        SavedQueryDto updatedQuery = savedQueryService.saveSavedQuery(savedQueryDto);
        return ResponseEntity.ok(updatedQuery);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSavedQuery(@PathVariable Long id) {
        savedQueryService.deleteSavedQuery(id);
        return ResponseEntity.noContent().build();
    }
}