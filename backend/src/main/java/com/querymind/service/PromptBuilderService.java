package com.querymind.service;

import org.springframework.stereotype.Service;

@Service
public class PromptBuilderService {

    public String buildPrompt(String question, String schemaText) {
        return "You are a PostgreSQL expert.\n\n" +
               "Convert the user's natural language question into one safe PostgreSQL SELECT query.\n\n" +
               "Rules:\n" +
               "1. Only generate SELECT queries.\n" +
               "2. Do not generate INSERT, UPDATE, DELETE, DROP, ALTER, TRUNCATE, CREATE, GRANT, REVOKE, CALL, COPY, or EXECUTE.\n" +
               "3. Use only the tables and columns from the schema.\n" +
               "4. Do not invent tables or columns.\n" +
               "5. Use joins only when relationships exist in the schema.\n" +
               "6. Always include LIMIT 100 unless the user asks for fewer rows.\n" +
               "7. Return only valid JSON.\n" +
               "8. Do not include markdown.\n" +
               "9. Do not explain outside the JSON.\n\n" +
               "Database schema:\n" + schemaText + "\n\n" +
               "User question:\n" + question + "\n\n" +
               "Return format:\n" +
               "{\n" +
               "  \"sql\": \"SELECT ...\",\n" +
               "  \"explanation\": \"Simple explanation...\"\n" +
               "}";
    }
}