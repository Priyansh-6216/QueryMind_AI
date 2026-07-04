package com.querymind.service;

import com.querymind.dto.ColumnSchemaDto;
import com.querymind.dto.SchemaResponse;
import com.querymind.dto.TableSchemaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SchemaService {

    @Autowired
    private DatabaseConnectionManager databaseConnectionManager;

    public SchemaResponse getSchema() {
        List<TableSchemaDto> tables = new ArrayList<>();
        try {
            DatabaseMetaData metaData = databaseConnectionManager.getTargetJdbcTemplate().getDataSource().getConnection().getMetaData();
            ResultSet tablesRs = metaData.getTables(null, null, "%", new String[]{"TABLE"});

            while (tablesRs.next()) {
                String tableName = tablesRs.getString("TABLE_NAME");
                if (!tableName.equals("query_history")) { // Exclude our history table
                    List<ColumnSchemaDto> columns = getColumnsForTable(metaData, tableName);
                    tables.add(new TableSchemaDto(tableName, columns));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Failed to read schema", e);
        }

        return new SchemaResponse(tables);
    }

    public String getSchemaAsText() {
        SchemaResponse schema = getSchema();
        StringBuilder sb = new StringBuilder();

        for (TableSchemaDto table : schema.getTables()) {
            sb.append("Table: ").append(table.getName()).append("\n");
            sb.append("Columns:\n");
            for (ColumnSchemaDto col : table.getColumns()) {
                sb.append("- ").append(col.getName()).append(" (").append(col.getType()).append(")");
                if (col.isPrimaryKey()) sb.append(" PRIMARY KEY");
                if (col.isForeignKey()) sb.append(" FOREIGN KEY");
                sb.append("\n");
            }
            sb.append("\n");
        }

        return sb.toString();
    }

    private List<ColumnSchemaDto> getColumnsForTable(DatabaseMetaData metaData, String tableName) throws SQLException {
        List<ColumnSchemaDto> columns = new ArrayList<>();
        ResultSet columnsRs = metaData.getColumns(null, null, tableName, "%");

        // Get primary keys
        ResultSet pkRs = metaData.getPrimaryKeys(null, null, tableName);
        List<String> primaryKeys = new ArrayList<>();
        while (pkRs.next()) {
            primaryKeys.add(pkRs.getString("COLUMN_NAME"));
        }

        // Get foreign keys
        ResultSet fkRs = metaData.getImportedKeys(null, null, tableName);
        List<String> foreignKeys = new ArrayList<>();
        while (fkRs.next()) {
            foreignKeys.add(fkRs.getString("FKCOLUMN_NAME"));
        }

        while (columnsRs.next()) {
            String colName = columnsRs.getString("COLUMN_NAME");
            String colType = columnsRs.getString("TYPE_NAME");
            boolean isPk = primaryKeys.contains(colName);
            boolean isFk = foreignKeys.contains(colName);

            columns.add(new ColumnSchemaDto(colName, colType, isPk, isFk));
        }

        return columns;
    }
}