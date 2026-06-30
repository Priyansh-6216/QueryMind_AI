-- Sample data for users
INSERT INTO users (name, email, city) VALUES
('Alice Johnson', 'alice@example.com', 'New York'),
('Bob Smith', 'bob@example.com', 'Los Angeles'),
('Charlie Brown', 'charlie@example.com', 'Chicago'),
('Diana Prince', 'diana@example.com', 'Houston'),
('Eve Wilson', 'eve@example.com', 'Phoenix');

-- Sample data for products
INSERT INTO products (name, category, price) VALUES
('Laptop', 'Electronics', 1200.00),
('Mouse', 'Electronics', 25.00),
('Book', 'Education', 15.00),
('Chair', 'Furniture', 150.00),
('Phone', 'Electronics', 800.00);

-- Sample data for orders
INSERT INTO orders (user_id, product_id, amount, status) VALUES
(1, 1, 1200.00, 'completed'),
(2, 2, 25.00, 'completed'),
(3, 3, 15.00, 'pending'),
(4, 4, 150.00, 'completed'),
(5, 5, 800.00, 'completed'),
(1, 5, 800.00, 'completed'),
(2, 1, 1200.00, 'pending');