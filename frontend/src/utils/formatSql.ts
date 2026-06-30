import sqlFormatter from 'sqlformatter';

// Supported languages: https://github.com/sqlformatter/sql-formatter#languages
export const formatSql = (sql: string): string => {
  try {
    // Format SQL with standard options
    return sqlFormatter.format(sql, {
      language: 'sql', // default to standard SQL
      indent: '  ',    // 2 spaces for indentation
      lineWidth: 80,   // wrap lines at 80 characters
      uppercase: true, // uppercase keywords (SELECT, FROM, WHERE, etc.)
      // You can customize further based on your SQL dialect if needed
    });
  } catch (error) {
    console.error('Error formatting SQL:', error);
    // Return original SQL if formatting fails
    return sql;
  }
};