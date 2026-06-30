package com.querymind.dto;

import java.util.List;

public class SchemaResponse {
    private List<TableSchemaDto> tables;

    public SchemaResponse() {}

    public SchemaResponse(List<TableSchemaDto> tables) {
        this.tables = tables;
    }

    public List<TableSchemaDto> getTables() { return tables; }
    public void setTables(List<TableSchemaDto> tables) { this.tables = tables; }
}