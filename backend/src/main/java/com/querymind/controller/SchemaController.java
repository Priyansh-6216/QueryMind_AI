package com.querymind.controller;

import com.querymind.dto.SchemaResponse;
import com.querymind.service.SchemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class SchemaController {

    @Autowired
    private SchemaService schemaService;

    @GetMapping("/schema")
    public ResponseEntity<SchemaResponse> getSchema() {
        SchemaResponse schema = schemaService.getSchema();
        return ResponseEntity.ok(schema);
    }
}