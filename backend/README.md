# QueryMind AI Backend

Spring Boot backend for AI-powered SQL query generation.

## Setup

1. Copy `.env.example` to `.env` and fill in your values.
2. Run PostgreSQL database.
3. Run `mvn spring-boot:run`

## API

- GET /api/health - Health check
- POST /api/query - Execute natural language query
- GET /api/schema - Get database schema
- GET /api/history - Get query history