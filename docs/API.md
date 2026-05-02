# QueryMind AI API Documentation

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### Execute Query
Generate and execute SQL from natural language.

**Endpoint:** `POST /query`

**Request:**
```json
{
  "question": "Show me all users from New York"
}
```

**Success Response (200):**
```json
{
  "question": "Show me all users from New York",
  "sql": "SELECT * FROM users WHERE city = 'New York' LIMIT 100",
  "explanation": "This query selects all users from the users table where the city is New York.",
  "columns": ["id", "name", "email", "city", "created_at"],
  "rows": [
    [1, "Alice Johnson", "alice@example.com", "New York", "2023-01-01T00:00:00Z"],
    [2, "Bob Smith", "bob@example.com", "New York", "2023-01-02T00:00:00Z"]
  ],
  "rowCount": 2,
  "executionTimeMs": 45,
  "status": "SUCCESS"
}
```

**Error Response (400/500):**
```json
{
  "status": "ERROR",
  "message": "Unsafe SQL detected. Only SELECT queries are allowed."
}
```

### Get Database Schema
Retrieve the current database schema.

**Endpoint:** `GET /schema`

**Response (200):**
```json
{
  "tables": [
    {
      "name": "users",
      "columns": [
        {
          "name": "id",
          "type": "integer",
          "primaryKey": true,
          "foreignKey": false
        },
        {
          "name": "name",
          "type": "varchar",
          "primaryKey": false,
          "foreignKey": false
        },
        {
          "name": "email",
          "type": "varchar",
          "primaryKey": false,
          "foreignKey": false
        },
        {
          "name": "city",
          "type": "varchar",
          "primaryKey": false,
          "foreignKey": false
        },
        {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "foreignKey": false
        }
      ]
    }
  ]
}
```

### Get Query History
Retrieve all previous queries.

**Endpoint:** `GET /history`

**Response (200):**
```json
[
  {
    "id": 1,
    "question": "Show total revenue by city",
    "generatedSql": "SELECT city, SUM(amount) as total FROM users u JOIN orders o ON u.id = o.user_id GROUP BY city",
    "status": "SUCCESS",
    "executionTimeMs": 40,
    "createdAt": "2023-05-02T10:00:00Z"
  }
]
```

### Delete History Item
Remove a query from history.

**Endpoint:** `DELETE /history/{id}`

**Response (204):** No content

### Health Check
Check if the service is running.

**Endpoint:** `GET /health`

**Response (200):**
```
OK
```

## Error Codes

- `400 Bad Request`: Invalid input or unsafe SQL
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Rate Limiting

Currently no rate limiting implemented. Consider adding for production use.

## Authentication

Currently no authentication required. Add API keys for production use.