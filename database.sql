CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    username VARCHAR(100) NOT NULL,  -- tried using user but its a protected term
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO messages (text, username) VALUES
('Hi there!', 'Amando'),
('Hello World!', 'Charles');