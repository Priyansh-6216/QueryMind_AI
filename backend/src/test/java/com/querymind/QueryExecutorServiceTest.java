package com.querymind;

import com.querymind.service.QueryExecutorService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class QueryExecutorServiceTest {

    @Autowired
    private QueryExecutorService queryExecutorService;

    @Test
    public void testExecuteValidQuery() {
        String sql = "SELECT COUNT(*) as count FROM users";
        QueryExecutorService.QueryResult result = queryExecutorService.executeQuery(sql);
        assertNotNull(result);
        assertNotNull(result.getRows());
        assertTrue(result.getExecutionTimeMs() >= 0);
    }

    @Test
    public void testExecuteInvalidQuery() {
        String sql = "SELECT * FROM nonexistent_table";
        assertThrows(RuntimeException.class, () -> queryExecutorService.executeQuery(sql));
    }
}