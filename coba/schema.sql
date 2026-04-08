-- Database Schema for NutriSmart Application
-- File: schema.sql (For Production / Evaluator Review)

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    age INT,
    gender ENUM('male', 'female'),
    weight_kg DECIMAL(5,2),
    height_cm DECIMAL(5,2),
    activity_level DECIMAL(3,2),
    goal ENUM('loss', 'maintain', 'gain'),
    calculated_tdee INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS FoodItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category ENUM('Protein', 'Carb', 'Vegetable', 'Fat', 'Snack', 'Drink'),
    calories INT NOT NULL,
    protein INT,
    carbs INT,
    fat INT,
    is_vegan BOOLEAN DEFAULT FALSE,
    image_url VARCHAR(512),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS DailyLogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    log_date DATE NOT NULL,
    total_calories_consumed INT DEFAULT 0,
    total_protein_consumed INT DEFAULT 0,
    total_carbs_consumed INT DEFAULT 0,
    total_fat_consumed INT DEFAULT 0,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS DailyLogItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT NOT NULL,
    food_item_id INT NOT NULL,
    serving_multiplier DECIMAL(3,2) DEFAULT 1.0,
    FOREIGN KEY (log_id) REFERENCES DailyLogs(id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES FoodItems(id)
);

CREATE TABLE IF NOT EXISTS Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'delivered') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS OrderItems (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    food_item_id INT NOT NULL,
    quantity INT DEFAULT 1,
    price_per_item DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES FoodItems(id)
);

-- Seed Initial Mock Data
INSERT INTO FoodItems (name, category, calories, protein, carbs, fat, is_vegan, image_url) VALUES 
('Grilled Chicken Breast (100g)', 'Protein', 165, 31, 0, 3, FALSE, 'https://via.placeholder.com/150'),
('Steamed Broccoli (100g)', 'Vegetable', 34, 2, 6, 0, TRUE, 'https://via.placeholder.com/150'),
('Brown Rice (100g)', 'Carb', 111, 2, 23, 0, TRUE, 'https://via.placeholder.com/150'),
('Salmon Fillet (100g)', 'Protein', 208, 20, 0, 13, FALSE, 'https://via.placeholder.com/150'),
('Tofu (100g)', 'Protein', 144, 15, 2, 8, TRUE, 'https://via.placeholder.com/150'),
('Quinoa (100g)', 'Carb', 120, 4, 21, 1, TRUE, 'https://via.placeholder.com/150'),
('Avocado (100g)', 'Fat', 160, 2, 8, 14, TRUE, 'https://via.placeholder.com/150'),
('Sweet Potato (100g)', 'Carb', 86, 1, 20, 0, TRUE, 'https://via.placeholder.com/150'),
('Mixed Salad (100g)', 'Vegetable', 20, 1, 3, 0, TRUE, 'https://via.placeholder.com/150'),
('Boiled Egg (1 large)', 'Protein', 78, 6, 0, 5, FALSE, 'https://via.placeholder.com/150');
