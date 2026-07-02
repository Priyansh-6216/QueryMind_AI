package com.querymind.service;

import com.querymind.dto.QueryRequest;
import com.querymind.dto.QueryResponse;
import com.querymind.dto.SqlGenerationResponse;
import com.querymind.exception.QueryExecutionException;
import com.querymind.exception.UnsafeSqlException;
import com.querymind.validator.SqlSafetyValidator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryOrchestratorService {

    @Autowired
    private SchemaService schemaService;

    @Autowired
    private PromptBuilderService promptBuilderService;

    @Autowired
    private AiSqlService aiSqlService;

    @Autowired
    private SqlSafetyValidator sqlSafetyValidator;

    @Autowired
    private QueryExecutorService queryExecutorService;

    @Autowired
    private ResultFormatterService resultFormatterService;

    @Autowired
    private QueryHistoryService queryHistoryService;

    public QueryResponse processQuery(QueryRequest request) {
        String question = request.getQuestion();
        if (question == null || question.trim().isEmpty()) {
            throw new IllegalArgumentException("Question cannot be empty");
        }

        String status = "SUCCESS";
        String errorMessage = null;
        String generatedSql = null;
        String explanation = null;
        Integer rowCount = null;
        Long executionTimeMs = null;

        try {
            // 1. Get schema
            String schemaText = schemaService.getSchemaAsText();

            // 2. Build prompt
            String prompt = promptBuilderService.buildPrompt(question, schemaText);

            // 3. Generate SQL
            SqlGenerationResponse aiResponse = aiSqlService.generateSql(prompt);
            generatedSql = aiResponse.getSql();
            explanation = aiResponse.getExplanation();

            // 4. Validate SQL
            String safeSql = sqlSafetyValidator.validateAndSanitize(generatedSql);

            // 5. Execute SQL
            QueryExecutorService.QueryResult result = queryExecutorService.executeQuery(safeSql);
            executionTimeMs = result.getExecutionTimeMs();

            // 6. Format result
            ResultFormatterService.ResultFormat formatted = resultFormatterService.formatResult(result.getRows());
            rowCount = formatted.getRows().size();

            // 7. Return response
            return new QueryResponse(question, safeSql, explanation,
                    formatted.getColumns(), formatted.getRows(),
                    rowCount, executionTimeMs, status);

        } catch (UnsafeSqlException e) {
            status = "ERROR";
            errorMessage = e.getMessage();
            throw e;
        } catch (Exception e) {
            status = "ERROR";
            errorMessage = e.getMessage();
            throw new QueryExecutionException("Query processing failed: " + e.getMessage(), e);
        } finally {
            // 8. Save history
            queryHistoryService.saveQueryHistory(question, generatedSql, explanation,
                    status, rowCount, executionTimeMs != null ? executionTimeMs.intValue() : null,
                    errorMessage);
        }
    }
}