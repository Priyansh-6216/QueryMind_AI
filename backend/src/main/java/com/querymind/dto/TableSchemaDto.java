package com.querymind.dto;

import java.util.List;

public class TableSchemaDto {
    private String name;
    private List<ColumnSchemaDto> columns;

    public TableSchemaDto() {}

    public TableSchemaDto(String name, List<ColumnSchemaDto> columns) {
        this.name = name;
        this.columns = columns;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public List<ColumnSchemaDto> getColumns() { return columns; }
    public void setColumns(List<ColumnSchemaDto> columns) { this.columns = columns; }
}