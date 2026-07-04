package com.querymind.controller;

import com.querymind.dto.DatabaseConnectionDto;
import com.querymind.service.DatabaseConnectionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/connection")
@CrossOrigin(origins = "http://localhost:5173")
public class DatabaseConnectionController {

    @Autowired
    private DatabaseConnectionManager databaseConnectionManager;

    @GetMapping
    public ResponseEntity<DatabaseConnectionDto> getActiveConnection() {
        DatabaseConnectionDto dto = databaseConnectionManager.getActiveConnection();
        if (dto == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/test")
    public ResponseEntity<String> testConnection(@RequestBody DatabaseConnectionDto dto) {
        try {
            databaseConnectionManager.testConnection(dto);
            return ResponseEntity.ok("Connection successful");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Connection failed: " + e.getMessage());
        }
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveConnection(@RequestBody DatabaseConnectionDto dto) {
        try {
            databaseConnectionManager.testConnection(dto); // verify before saving
            databaseConnectionManager.setCustomConnection(dto);
            return ResponseEntity.ok("Connection saved and activated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to verify connection: " + e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<String> resetConnection() {
        databaseConnectionManager.resetToDefault();
        return ResponseEntity.ok("Connection reset to default");
    }
}
