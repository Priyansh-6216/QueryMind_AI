# QueryMind AI Architecture

## Overview

QueryMind AI is a full-stack application that converts natural language questions into safe SQL queries using AI, executes them against a PostgreSQL database, and displays the results in a React frontend.

## System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │ Spring Boot API │    │  PostgreSQL DB  │
│                 │    │                 │    │                 │
│ - Query Input   │◄──►│ - Query Controller│◄──►│ - Business Data │
│ - SQL Preview   │    │ - Orchestrator   │    │ - Query History │
│ - Results Table │    │ - AI Service     │    │                 │
│ - Schema Viewer │    │ - SQL Validator  │    │                 │
│ - History       │    │ - Executor       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Backend Components

### Controllers
- **QueryController**: Handles natural language query requests
- **SchemaController**: Provides database schema information
- **HistoryController**: Manages query history

### Services
- **QueryOrchestratorService**: Main workflow coordinator
- **SchemaService**: Database schema reader
- **PromptBuilderService**: AI prompt construction
- **AiSqlService**: OpenAI API integration
- **SqlSafetyValidator**: SQL security validation
- **QueryExecutorService**: Safe SQL execution
- **ResultFormatterService**: Query result formatting
- **QueryHistoryService**: History persistence

### Validators & Utils
- **SqlSafetyValidator**: Prevents unsafe SQL execution
- **SqlLimitUtil**: Ensures LIMIT clauses
- **JsonUtil**: JSON processing utilities

## Frontend Components

### Pages
- **QueryPage**: Main query interface
- **HistoryPage**: Query history viewer
- **SchemaPage**: Database schema browser

### Components
- **QueryInput**: Natural language input
- **SqlPreview**: Generated SQL display
- **ResultTable**: Dynamic result display
- **SchemaViewer**: Database structure visualization

## Data Flow

1. User enters natural language question
2. Frontend sends request to `/api/query`
3. Backend fetches database schema
4. Schema is converted to text format
5. AI prompt is built with schema and question
6. Prompt sent to OpenAI API
7. AI response parsed for SQL and explanation
8. SQL validated for safety
9. Safe SQL executed against database
10. Results formatted and returned
11. Query logged to history table
12. Frontend displays SQL, explanation, and results

## Security Measures

- Only SELECT queries allowed
- JSqlParser validation of SQL syntax
- Dangerous keyword blocking
- LIMIT clause enforcement
- Read-only database user recommended
- Input sanitization

## Technology Stack

- **Backend**: Spring Boot, PostgreSQL, JSqlParser
- **Frontend**: React, TypeScript, Tailwind CSS
- **AI**: OpenAI GPT models
- **Deployment**: Docker, Docker Compose