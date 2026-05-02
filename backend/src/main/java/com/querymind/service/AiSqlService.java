package com.querymind.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querymind.config.OpenAiConfig;
import com.querymind.dto.SqlGenerationResponse;
import com.querymind.exception.LlmResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class AiSqlService {

    @Autowired
    private OpenAiConfig openAiConfig;

    @Autowired
    private RestTemplate restTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public SqlGenerationResponse generateSql(String prompt) {
        String response = callOpenAi(prompt);
        return parseResponse(response);
    }

    private String callOpenAi(String prompt) {
        String url = "https://api.openai.com/v1/chat/completions";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiConfig.getApiKey());
        headers.set("Content-Type", "application/json");

        Map<String, Object> requestBody = Map.of(
            "model", openAiConfig.getModel(),
            "messages", new Object[]{
                Map.of("role", "user", "content", prompt)
            },
            "temperature", 0.1
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            return response.getBody();
        } catch (Exception e) {
            throw new LlmResponseException("Failed to call OpenAI API", e);
        }
    }

    private SqlGenerationResponse parseResponse(String response) {
        try {
            JsonNode root = objectMapper.readTree(response);
            String content = root.path("choices").get(0).path("message").path("content").asText();

            // Try to parse the content as JSON
            JsonNode jsonResponse = objectMapper.readTree(content);
            String sql = jsonResponse.path("sql").asText();
            String explanation = jsonResponse.path("explanation").asText();

            return new SqlGenerationResponse(sql, explanation);
        } catch (Exception e) {
            // Retry once if parsing fails
            try {
                // For retry, we could call again, but for simplicity, throw exception
                throw new LlmResponseException("Invalid JSON response from LLM", e);
            } catch (Exception retryException) {
                throw new LlmResponseException("Failed to parse LLM response after retry", retryException);
            }
        }
    }
}