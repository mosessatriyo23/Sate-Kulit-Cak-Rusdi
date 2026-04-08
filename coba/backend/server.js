const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Helper: Calculate Age from DOB
const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
};

// Helper: Calculate target calories & macros
const calculateNutrition = (weight, height, age, gender, activityLevel, goal) => {
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += (gender === 'male') ? 5 : -161;
    let tdee = bmr * parseFloat(activityLevel);
    
    let dailyCalories = tdee;
    if (goal === 'loss') dailyCalories -= 500;
    else if (goal === 'gain') dailyCalories += 500;
    
    if(dailyCalories < 1200 && gender === 'female') dailyCalories = 1200;
    if(dailyCalories < 1500 && gender === 'male') dailyCalories = 1500;

    return {
        dailyCalories: Math.round(dailyCalories),
        bmr: Math.round(bmr),
        protein: Math.round((dailyCalories * 0.3) / 4),
        carbs: Math.round((dailyCalories * 0.45) / 4),
        fats: Math.round((dailyCalories * 0.25) / 9)
    };
};

// AUTH: Register & Calculate initial BMI/TDEE
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, dob, gender, weight, height, activityLevel, goal } = req.body;
    
    const age = calculateAge(dob);
    const { dailyCalories } = calculateNutrition(weight, height, age, gender, activityLevel, goal);

    db.run(
        `INSERT INTO users (name, email, password, dob, gender, weight, height, activityLevel, goal, dailyCalories) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, email, password, dob, gender, weight, height, activityLevel, goal, dailyCalories],
        function(err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID, name, dailyCalories });
        }
    );
});

// AUTH: Login & Recalculate (in case they aged!)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Invalid credentials' });
        
        // Auto-update age and caloric needs
        const age = calculateAge(user.dob);
        const { dailyCalories } = calculateNutrition(user.weight, user.height, age, user.gender, user.activityLevel, user.goal);
        
        res.json({ ...user, age, dailyCalories }); // Send mock token / user data back
    });
});

// PROFILE: Read Profile
app.get('/api/user/profile/:id', (req, res) => {
    db.get(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, user) => {
        if (err || !user) return res.status(404).json({ error: "User not found" });
        const age = calculateAge(user.dob);
        const nutrition = calculateNutrition(user.weight, user.height, age, user.gender, user.activityLevel, user.goal);
        res.json({ ...user, age, nutrition });
    });
});

// PROFILE: Edit Profile
app.put('/api/user/profile/:id', (req, res) => {
    const { weight, height, activityLevel, goal } = req.body;
    db.get(`SELECT * FROM users WHERE id = ?`, [req.params.id], (err, user) => {
        if (err || !user) return res.status(404).json({error: "User not found"});
        
        const age = calculateAge(user.dob);
        const { dailyCalories } = calculateNutrition(weight || user.weight, height || user.height, age, user.gender, activityLevel || user.activityLevel, goal || user.goal);

        db.run(
            `UPDATE users SET weight = ?, height = ?, activityLevel = ?, goal = ?, dailyCalories = ? WHERE id = ?`,
            [weight || user.weight, height || user.height, activityLevel || user.activityLevel, goal || user.goal, dailyCalories, req.params.id],
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "Profile updated successfully", newDailyCalories: dailyCalories });
            }
        );
    });
});

// RECOMMENDATIONS (Singular items can be fetched here)
app.post('/api/recommend', (req, res) => {
    const { targetCalories } = req.body;
    const caloriesPerMeal = targetCalories / 3;

    db.all("SELECT * FROM food_items", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const proteins = rows.filter(item => item.category === 'Protein');
        const carbs = rows.filter(item => item.category === 'Carb');
        const veggies = rows.filter(item => item.category === 'Vegetable');
        
        const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
        const meals = { breakfast: [], lunch: [], dinner: [] };
        
        ['breakfast', 'lunch', 'dinner'].forEach(meal => {
            const p = pickRandom(proteins); const c = pickRandom(carbs); const v = pickRandom(veggies);
            const mockMultiplier = isNaN(caloriesPerMeal) ? 1 : (caloriesPerMeal / (p.calories + c.calories + v.calories));
            
            meals[meal] = [
                { ...p, serving: Math.max(0.5, mockMultiplier).toFixed(1) },
                { ...c, serving: Math.max(0.5, mockMultiplier).toFixed(1) },
                { ...v, serving: Math.max(0.5, mockMultiplier).toFixed(1) }
            ];
        });

        res.json({ meals, catalog: rows }); // Sending catalog so frontend can buy one-by-one
    });
});

// AI SUBSTITUTION
app.post('/api/substitute', (req, res) => {
    const { foodId, category } = req.body;
    db.get("SELECT * FROM food_items WHERE id = ?", [foodId], (err, originalFood) => {
        if (err || !originalFood) return res.status(404).json({ error: "Food not found" });
        db.all("SELECT * FROM food_items WHERE category = ? AND id != ?", [category || originalFood.category, foodId], (err, rowArray) => {
             const alternatives = rowArray.filter(f => Math.abs(f.calories - originalFood.calories) <= 70);
             if(alternatives.length === 0) return res.json({ alternatives: rowArray });
             res.json({ alternatives, original: originalFood });
        });
    });
});

// DASHBOARD
app.get('/api/dashboard', (req, res) => {
    res.json({
        progress: { caloriesConsumed: 1800, caloriesTarget: 2200, protein: 110, proteinTarget: 150, carbs: 180, carbsTarget: 247, fat: 55, fatTarget: 61 },
        reminder: "You need 400 more calories today. Consider a light healthy snack."
    });
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
