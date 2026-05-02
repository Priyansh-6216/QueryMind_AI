package com.querymind;

import com.querymind.exception.UnsafeSqlException;
import com.querymind.validator.SqlSafetyValidator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SqlSafetyValidatorTest {

    @Autowired
    private SqlSafetyValidator validator;

    @Test
    public void testValidSelect() {
        String sql = "SELECT * FROM users";
        String result = validator.validateAndSanitize(sql);
        assertTrue(result.contains("LIMIT 100"));
    }

    @Test
    public void testDeleteBlocked() {
        String sql = "DELETE FROM users";
        assertThrows(UnsafeSqlException.class, () -> validator.validateAndSanitize(sql));
    }

    @Test
    public void testDropBlocked() {
        String sql = "DROP TABLE users";
        assertThrows(UnsafeSqlException.class, () -> validator.validateAndSanitize(sql));
    }

    @Test
    public void testMultipleStatementsBlocked() {
        String sql = "SELECT * FROM users; DROP TABLE users";
        assertThrows(UnsafeSqlException.class, () -> validator.validateAndSanitize(sql));
    }

    @Test
    public void testPgSleepBlocked() {
        String sql = "SELECT pg_sleep(10)";
        assertThrows(UnsafeSqlException.class, () -> validator.validateAndSanitize(sql));
    }

    @Test
    public void testLimitAlreadyPresent() {
        String sql = "SELECT * FROM users LIMIT 5";
        String result = validator.validateAndSanitize(sql);
        assertEquals(sql, result);
    }
}