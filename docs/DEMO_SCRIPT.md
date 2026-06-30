# QueryMind AI Demo Script

## Setup

1. Start the application:
   ```bash
   docker-compose up --build
   ```

2. Open http://localhost:5173 in browser

## Demo Flow

### 1. Welcome & Schema Overview
- Show the three main sections: Query, History, Schema
- Navigate to Schema tab to show database structure
- Explain the sample data: users, products, orders tables

### 2. Basic Query Demo
- Go to Query tab
- Enter: "Show me all users"
- Show generated SQL, explanation, and results table
- Point out the LIMIT 100 automatically added

### 3. Join Query Demo
- Enter: "Show me all orders with user names"
- Explain how AI understands relationships
- Show the JOIN query generated

### 4. Aggregation Demo
- Enter: "What are the top 3 products by price?"
- Demonstrate ORDER BY and LIMIT understanding

### 5. Filtering Demo
- Enter: "Show users from New York"
- Show WHERE clause generation

### 6. History Feature
- Go to History tab
- Show all previous queries
- Demonstrate delete functionality

### 7. Error Handling Demo
- Try unsafe query: "Delete all users"
- Show error message about unsafe SQL
- Try: "Show me database tables" (should be blocked)

### 8. Complex Query Demo
- Enter: "Show total spending by city for completed orders"
- Show complex JOIN with GROUP BY and aggregation

## Sample Questions to Try

### Basic Queries
- "List all products"
- "Show user information"
- "Display all orders"

### Filtering
- "Show users from Chicago"
- "Find products in Electronics category"
- "Show completed orders"

### Joins
- "Show orders with product names"
- "List users who have placed orders"
- "Show products that have been ordered"

### Aggregations
- "Count total users"
- "Show average product price"
- "Find total revenue from all orders"

### Complex
- "Show top 5 users by order count"
- "What are the most popular product categories?"
- "Show revenue by city"

## Key Features to Highlight

1. **Natural Language Processing**: Plain English to SQL
2. **Safety First**: Only SELECT queries allowed
3. **Schema Awareness**: Uses actual database structure
4. **Real-time Execution**: Immediate results
5. **History Tracking**: All queries logged
6. **Error Handling**: Clear error messages
7. **Responsive UI**: Works on desktop and mobile

## Troubleshooting

If demo fails:
- Check Docker containers are running
- Verify OpenAI API key is set
- Check browser console for errors
- Ensure database has sample data

## Demo Duration: 10-15 minutes