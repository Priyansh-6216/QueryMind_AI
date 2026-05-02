package com.querymind;

import com.querymind.dto.SchemaResponse;
import com.querymind.service.SchemaService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class SchemaServiceTest {

    @Autowired
    private SchemaService schemaService;

    @Test
    public void testGetSchema() {
        SchemaResponse schema = schemaService.getSchema();
        assertNotNull(schema);
        assertNotNull(schema.getTables());
        // Should have users, products, orders tables
        assertTrue(schema.getTables().size() >= 3);
    }

    @Test
    public void testGetSchemaAsText() {
        String text = schemaService.getSchemaAsText();
        assertNotNull(text);
        assertTrue(text.contains("Table:"));
        assertTrue(text.contains("users"));
    }
}