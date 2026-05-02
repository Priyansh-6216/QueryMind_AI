package com.querymind.controller;

import com.querymind.dto.QueryHistoryDto;
import com.querymind.service.QueryHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class HistoryController {

    @Autowired
    private QueryHistoryService queryHistoryService;

    @GetMapping("/history")
    public ResponseEntity<List<QueryHistoryDto>> getHistory() {
        List<QueryHistoryDto> history = queryHistoryService.getAllHistory();
        return ResponseEntity.ok(history);
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<Void> deleteHistory(@PathVariable Long id) {
        queryHistoryService.deleteHistory(id);
        return ResponseEntity.noContent().build();
    }
}