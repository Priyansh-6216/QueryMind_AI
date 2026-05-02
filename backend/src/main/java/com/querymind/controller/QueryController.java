package com.querymind.controller;

import com.querymind.dto.QueryRequest;
import com.querymind.dto.QueryResponse;
import com.querymind.service.QueryOrchestratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class QueryController {

    @Autowired
    private QueryOrchestratorService queryOrchestratorService;

    @PostMapping("/query")
    public ResponseEntity<QueryResponse> executeQuery(@RequestBody QueryRequest request) {
        QueryResponse response = queryOrchestratorService.processQuery(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}