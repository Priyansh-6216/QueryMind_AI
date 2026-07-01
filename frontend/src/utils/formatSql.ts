import { format } from 'sql-formatter';

// Supported languages: https://github.com/sqlformatter/sql-formatter#languages
export const formatSql = (sql: string): string => {
  try {
    // Format SQL with standard options
    return format(sql, {
      language: 'postgresql',
      keywordCase: 'upper',
      // You can customize further based on your SQL dialect if needed
    });
  } catch (error) {
    console.error('Error formatting SQL:', error);
    // Return original SQL if formatting fails
    return sql;
  }
};