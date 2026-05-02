# QueryMind AI Security

## Overview

QueryMind AI implements multiple layers of security to ensure safe SQL execution and protect the database from malicious queries.

## Security Layers

### 1. AI Prompt Engineering
- **Strict Instructions**: AI model is explicitly instructed to only generate SELECT queries
- **Forbidden Operations**: Prompt blocks INSERT, UPDATE, DELETE, DROP, ALTER, etc.
- **Schema Confinement**: AI can only use tables and columns from provided schema

### 2. SQL Validation (JSqlParser)
- **Syntax Validation**: All SQL parsed and validated before execution
- **Statement Type Check**: Only SELECT statements allowed
- **Keyword Blocking**: Dangerous functions and keywords blocked
- **Comment Removal**: SQL comments not permitted

### 3. Safety Validator
- **Pattern Matching**: Blocks dangerous SQL patterns
- **Multiple Statement Prevention**: Semicolon-separated statements rejected
- **Function Blacklist**: Blocks pg_sleep, information_schema access, etc.
- **Limit Enforcement**: Automatic LIMIT addition if missing

### 4. Database Security
- **Read-Only User**: Recommended separate database user with SELECT only
- **Parameterized Queries**: JdbcTemplate prevents SQL injection
- **Timeout Protection**: Query execution timeouts prevent long-running queries

## Blocked SQL Patterns

The system blocks the following SQL patterns:

### Destructive Operations
```sql
INSERT INTO users VALUES (...)
UPDATE users SET name = 'hacked'
DELETE FROM users
DROP TABLE users
ALTER TABLE users ADD COLUMN hacked
TRUNCATE users
CREATE TABLE hacked (...)
```

### Multiple Statements
```sql
SELECT * FROM users; DROP TABLE users;
```

### Dangerous Functions
```sql
SELECT pg_sleep(10)
SELECT * FROM information_schema.tables
SELECT * FROM pg_catalog.pg_tables
```

### System Access
```sql
GRANT SELECT ON users TO hacker
REVOKE SELECT ON users FROM user
```

### Comments
```sql
SELECT * FROM users -- malicious comment
SELECT * FROM users /* block comment */
```

## Safe SQL Examples

### Allowed
```sql
SELECT * FROM users WHERE city = 'New York' LIMIT 100
SELECT u.name, COUNT(o.id) FROM users u JOIN orders o ON u.id = o.user_id GROUP BY u.name
SELECT * FROM products ORDER BY price DESC LIMIT 50
```

### Auto-Corrected
```sql
SELECT * FROM users  -- becomes: SELECT * FROM users LIMIT 100
```

## Implementation Details

### SqlSafetyValidator.java
```java
public String validateAndSanitize(String sql) {
    // Check for multiple statements
    // Check for dangerous keywords
    // Parse with JSqlParser
    // Ensure SELECT only
    return SqlLimitUtil.ensureLimit(sql);
}
```

### SqlLimitUtil.java
```java
public static String ensureLimit(String sql) {
    // Parse SQL and add LIMIT 100 if missing
    return sql + " LIMIT 100";
}
```

## Production Recommendations

1. **Database User**: Create read-only PostgreSQL user
   ```sql
   CREATE USER querymind_user WITH PASSWORD 'secure_password';
   GRANT SELECT ON ALL TABLES IN SCHEMA public TO querymind_user;
   ```

2. **Connection Pooling**: Use connection pooling with limits
3. **Query Timeouts**: Set maximum execution time
4. **Rate Limiting**: Implement API rate limiting
5. **Logging**: Log all queries for audit trails
6. **Input Validation**: Validate question length and content
7. **API Keys**: Require authentication for API access

## Testing Security

The system includes unit tests for security validation:

```java
@Test
public void testDeleteBlocked() {
    assertThrows(UnsafeSqlException.class, () -> 
        validator.validateAndSanitize("DELETE FROM users"));
}
```

## Known Limitations

- AI model could potentially be jailbroken with creative prompts
- Complex SQL injection through AI-generated content
- Resource exhaustion through expensive queries
- Schema leakage through error messages

## Future Enhancements

- Query cost estimation before execution
- User-specific schema permissions
- Query result size limits
- Advanced AI prompt validation
- Machine learning-based anomaly detection