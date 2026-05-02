package com.querymind.validator;

import com.querymind.exception.UnsafeSqlException;
import com.querymind.util.SqlLimitUtil;
import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.Select;
import org.springframework.stereotype.Component;

@Component
public class SqlSafetyValidator {

    public String validateAndSanitize(String sql) {
        if (sql == null || sql.trim().isEmpty()) {
            throw new UnsafeSqlException("SQL query cannot be empty");
        }

        // Check for multiple statements
        if (sql.contains(";")) {
            String[] statements = sql.split(";");
            if (statements.length > 1) {
                throw new UnsafeSqlException("Multiple SQL statements are not allowed");
            }
        }

        // Check for dangerous keywords
        String upperSql = sql.toUpperCase();
        String[] dangerousKeywords = {
            "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "TRUNCATE", "CREATE",
            "REPLACE", "MERGE", "GRANT", "REVOKE", "CALL", "EXECUTE", "COPY",
            "PG_SLEEP", "INFORMATION_SCHEMA", "PG_CATALOG"
        };

        for (String keyword : dangerousKeywords) {
            if (upperSql.contains(keyword)) {
                throw new UnsafeSqlException("Unsafe SQL detected: " + keyword + " is not allowed");
            }
        }

        // Check for SQL comments
        if (upperSql.contains("--") || upperSql.contains("/*")) {
            throw new UnsafeSqlException("SQL comments are not allowed");
        }

        // Parse with JSqlParser to ensure it's a SELECT
        try {
            Statement statement = CCJSqlParserUtil.parse(sql);
            if (!(statement instanceof Select)) {
                throw new UnsafeSqlException("Only SELECT queries are allowed");
            }
        } catch (JSQLParserException e) {
            throw new UnsafeSqlException("Invalid SQL syntax", e);
        }

        // Ensure LIMIT exists
        return SqlLimitUtil.ensureLimit(sql);
    }
}