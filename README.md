# QueryMind AI

AI-powered SQL query generation from natural language questions.

## Features

- Convert plain English questions to safe SQL queries
- Execute queries against PostgreSQL database
- View database schema
- Query history
- Secure: Only SELECT queries allowed, with safety validation

## Quick Start

1. Clone the repository
2. Set up environment variables
3. Run with Docker Compose

## Prerequisites

- Docker and Docker Compose
- OpenAI API key

## Setup

1. Copy environment files:
   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Edit `backend/.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

3. Run the application:
   ```bash
   docker-compose up --build
   ```

4. Open http://localhost:5173 in your browser

## Development

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

The PostgreSQL database runs in Docker with sample data for users, products, and orders tables.

## API Documentation

- `POST /api/query` - Execute natural language query
- `GET /api/schema` - Get database schema
- `GET /api/history` - Get query history
- `GET /api/health` - Health check

## Architecture

- **Backend**: Spring Boot with PostgreSQL
- **Frontend**: React with TypeScript
- **AI**: OpenAI GPT models for SQL generation
- **Security**: JSqlParser for SQL validation

## Security

- Only SELECT queries are allowed
- SQL injection prevention through AI prompt engineering
- Safety validation with JSqlParser
- Read-only database user recommended for production