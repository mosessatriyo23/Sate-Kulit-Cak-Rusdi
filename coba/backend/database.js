const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error connecting to SQLite:', err.message);
    else {
        console.log('Connected to SQLite database.');
        initDb();
    }
});

function initDb() {
    db.serialize(() => {
        // Drop old users table to recreate with new schema if it exists
        db.run(`DROP TABLE IF EXISTS users`);
        
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            dob DATE,
            gender TEXT,
            weight REAL,
            height REAL,
            activityLevel REAL,
            goal TEXT,
            dailyCalories INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS food_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            category TEXT,
            calories INTEGER,
            protein INTEGER,
            carbs INTEGER,
            fat INTEGER,
            is_vegan BOOLEAN,
            image_url TEXT,
            price INTEGER DEFAULT 15000
        )`);

        db.get("SELECT COUNT(*) as count FROM food_items", (err, row) => {
            if (row && row.count === 0) {
                const initData = [
                    ['Grilled Chicken Breast (100g)', 'Protein', 165, 31, 0, 3.6, false, 'https://via.placeholder.com/150', 25000],
                    ['Steamed Broccoli (100g)', 'Vegetable', 34, 2.8, 6.6, 0.4, true, 'https://via.placeholder.com/150', 8000],
                    ['Brown Rice (100g)', 'Carb', 111, 2.6, 23, 0.9, true, 'https://via.placeholder.com/150', 10000],
                    ['Salmon Fillet (100g)', 'Protein', 208, 20, 0, 13, false, 'https://via.placeholder.com/150', 45000],
                    ['Tofu (100g)', 'Protein', 144, 15, 2.8, 8.7, true, 'https://via.placeholder.com/150', 12000],
                    ['Quinoa (100g)', 'Carb', 120, 4.4, 21, 1.9, true, 'https://via.placeholder.com/150', 18000],
                    ['Avocado (100g)', 'Fat', 160, 2, 8.5, 14.7, true, 'https://via.placeholder.com/150', 20000],
                    ['Sweet Potato (100g)', 'Carb', 86, 1.6, 20, 0.1, true, 'https://via.placeholder.com/150', 12000],
                    ['Mixed Salad (100g)', 'Vegetable', 20, 1.5, 3, 0.2, true, 'https://via.placeholder.com/150', 15000],
                    ['Boiled Egg (1 large)', 'Protein', 78, 6, 0.6, 5, false, 'https://via.placeholder.com/150', 6000]
                ];
                const stmt = db.prepare('INSERT INTO food_items (name, category, calories, protein, carbs, fat, is_vegan, image_url, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
                initData.forEach(item => stmt.run(item));
                stmt.finalize();
            }
        });
        
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            total_price INTEGER,
            status TEXT
        )`);
    });
}

module.exports = db;
