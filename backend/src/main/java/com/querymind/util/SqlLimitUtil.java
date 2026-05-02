package com.querymind.util;

import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.select.Select;

public class SqlLimitUtil {

    public static String ensureLimit(String sql) {
        try {
            Select select = (Select) CCJSqlParserUtil.parse(sql);
            if (select.getLimit() == null) {
                // Add LIMIT 100
                return sql + " LIMIT 100";
            }
        } catch (JSQLParserException | ClassCastException e) {
            // If parsing fails, just add LIMIT to be safe
            if (!sql.toUpperCase().contains("LIMIT")) {
                return sql + " LIMIT 100";
            }
        }
        return sql;
    }
}