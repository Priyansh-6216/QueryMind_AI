package com.querymind.service;

import org.springframework.stereotype.Service;

@Service
public class PromptBuilderService {

    public String buildPrompt(String question, String schemaText, String previousQuestion, String previousSql) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("You are a PostgreSQL expert.\n\n")
              .append("Convert the user's natural language question into one safe PostgreSQL SELECT query.\n\n")
              .append("Rules:\n")
              .append("1. Only generate SELECT queries.\n")
              .append("2. Do not generate INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, CREATE, GRANT, REVOKE, CALL, COPY, or EXECUTE.\n")
              .append("3. Use only the tables and columns from the schema.\n")
              .append("4. Do not invent tables or columns.\n")
              .append("5. Use joins only when relationships exist in the schema.\n")
              .append("6. Always include LIMIT 100 unless the user asks for fewer rows.\n")
              .append("7. Return only valid JSON.\n")
              .append("8. Do not include markdown.\n")
              .append("9. Do not explain outside the JSON.\n\n")
              .append("Database schema:\n").append(schemaText).append("\n\n");

        if (previousQuestion != null && !previousQuestion.trim().isEmpty() && previousSql != null && !previousSql.trim().isEmpty()) {
            prompt.append("Context from previous interaction:\n")
                  .append("Previous question: ").append(previousQuestion).append("\n")
                  .append("Previous SQL: ").append(previousSql).append("\n\n")
                  .append("Please consider this context if the user's current question is a follow-up.\n\n");
        }

        prompt.append("User current question:\n").append(question).append("\n\n")
              .append("Additionally, analyze the query results and suggest the most appropriate chart type for visualizing the data:\n")
              .append("- BAR: For comparing categorical data (e.g., sales by product, counts by category)\n")
              .append("- LINE: For showing trends over time (e.g., monthly sales, temperature over days)\n")
              .append("- PIE: For showing proportions of a whole (e.g., market share, budget allocation)\n")
              .append("- NONE: If the data is not suitable for visualization (e.g., text data, complex multi-dimensional data)\n\n")
              .append("Return format:\n")
              .append("{\n")
              .append("  \"sql\": \"SELECT ...\",\n")
              .append("  \"explanation\": \"Simple explanation...\",\n")
              .append("  \"suggestedChartType\": \"BAR|LINE|PIE|NONE\"\n")
              .append("}");

        return prompt.toString();
    }
}