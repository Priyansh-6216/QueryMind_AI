package com.querymind.dto;

public class ColumnSchemaDto {
    private String name;
    private String type;
    private boolean primaryKey;
    private boolean foreignKey;

    public ColumnSchemaDto() {}

    public ColumnSchemaDto(String name, String type, boolean primaryKey, boolean foreignKey) {
        this.name = name;
        this.type = type;
        this.primaryKey = primaryKey;
        this.foreignKey = foreignKey;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public boolean isPrimaryKey() { return primaryKey; }
    public void setPrimaryKey(boolean primaryKey) { this.primaryKey = primaryKey; }

    public boolean isForeignKey() { return foreignKey; }
    public void setForeignKey(boolean foreignKey) { this.foreignKey = foreignKey; }
}