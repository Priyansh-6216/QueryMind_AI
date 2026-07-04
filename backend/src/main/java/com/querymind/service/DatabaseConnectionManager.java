package com.querymind.service;

import com.querymind.dto.DatabaseConnectionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@Service
public class DatabaseConnectionManager {

    @Autowired
    private JdbcTemplate defaultJdbcTemplate;

    private DatabaseConnectionDto activeConnection;
    private JdbcTemplate customJdbcTemplate;

    public synchronized void setCustomConnection(DatabaseConnectionDto dto) {
        this.activeConnection = dto;
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver"); // Currently assuming Postgres for dynamic connections
        dataSource.setUrl(dto.getUrl());
        dataSource.setUsername(dto.getUsername());
        dataSource.setPassword(dto.getPassword());
        this.customJdbcTemplate = new JdbcTemplate(dataSource);
    }

    public synchronized void resetToDefault() {
        this.activeConnection = null;
        this.customJdbcTemplate = null;
    }

    public synchronized DatabaseConnectionDto getActiveConnection() {
        if (activeConnection == null) return null;
        return new DatabaseConnectionDto(activeConnection.getUrl(), activeConnection.getUsername(), "********");
    }

    public synchronized JdbcTemplate getTargetJdbcTemplate() {
        if (customJdbcTemplate != null) {
            return customJdbcTemplate;
        }
        return defaultJdbcTemplate;
    }

    public void testConnection(DatabaseConnectionDto dto) {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl(dto.getUrl());
        dataSource.setUsername(dto.getUsername());
        dataSource.setPassword(dto.getPassword());
        
        JdbcTemplate testTemplate = new JdbcTemplate(dataSource);
        testTemplate.execute("SELECT 1");
    }
}
