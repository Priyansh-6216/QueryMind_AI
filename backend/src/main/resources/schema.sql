-- Business Demo Tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  product_id INT REFERENCES products(id),
  amount DECIMAL(10,2),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- App Users Table
CREATE TABLE app_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- App History Table
CREATE TABLE query_history (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES app_users(id),
  question TEXT NOT NULL,
  generated_sql TEXT NOT NULL,
  explanation TEXT,
  status VARCHAR(50),
  row_count INT,
  execution_time_ms INT,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Saved Queries Table
CREATE TABLE saved_queries (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES app_users(id),
  name VARCHAR(255) NOT NULL,
  question TEXT NOT NULL,
  generated_sql TEXT,
  explanation TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);