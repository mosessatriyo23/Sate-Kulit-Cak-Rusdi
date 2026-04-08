import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Activity, Flame, Salad } from 'lucide-react';

const Calculator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        weight: '',
        height: '',
        age: '',
        gender: 'male',
        activityLevel: '1.2',
        goal: 'maintain'
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/calculator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setResult(data);
            localStorage.setItem('targetCalories', data.dailyCalories);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card mb-4" style={{ borderTop: '4px solid var(--primary)' }}>
                <h2 className="text-center flex items-center justify-center gap-2 mb-2">
                    <Activity size={28} /> Personal Nutrition Calculator
                </h2>
                <p className="text-muted text-center mb-4">Discover your daily caloric needs and macronutrients precisely tailored for your body.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Weight (kg)</label>
                            <input required type="number" name="weight" className="form-input" min="30" max="300" value={formData.weight} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Height (cm)</label>
                            <input required type="number" name="height" className="form-input" min="100" max="250" value={formData.height} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Age (years)</label>
                            <input required type="number" name="age" className="form-input" min="10" max="100" value={formData.age} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Activity Level</label>
                        <select name="activityLevel" className="form-select" value={formData.activityLevel} onChange={handleChange}>
                            <option value="1.2">Sedentary (Little or no exercise)</option>
                            <option value="1.375">Lightly Active (1-3 days/week)</option>
                            <option value="1.55">Moderately Active (3-5 days/week)</option>
                            <option value="1.725">Very Active (6-7 days/week)</option>
                            <option value="1.9">Extra Active (Very hard exercise/job)</option>
                        </select>
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label">Nutrition Goal</label>
                        <select name="goal" className="form-select" value={formData.goal} onChange={handleChange}>
                            <option value="loss">Weight Loss (Deficit)</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="gain">Bulking (Surplus)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Calculating...' : 'Calculate My Nutrition'} 
                    </button>
                </form>
            </div>

            {result && (
                <div className="card" style={{ animation: 'fadeIn 0.5s', backgroundColor: 'var(--hover-tint)' }}>
                    <h3 className="text-center mb-4 flex items-center justify-center gap-2">
                        <Target /> Your Smart Blueprint
                    </h3>
                    <div className="grid-2 mb-4">
                        <div className="card text-center" style={{ padding: '1rem' }}>
                            <div className="text-muted mb-1">Daily Target (TDEE)</div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '0' }} className="flex items-center justify-center gap-2">
                                <Flame color="#E65100" /> {result.dailyCalories} kcal
                            </h2>
                        </div>
                        <div className="card text-center" style={{ padding: '1rem' }}>
                            <div className="text-muted mb-1">Basal Metabolic Rate</div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0', color: 'var(--secondary)' }}>{result.bmr} kcal</h2>
                        </div>
                    </div>
                    
                    <h4 className="mb-2">Daily Macro Targets</h4>
                    <div className="grid-3 mb-4 text-center">
                        <div className="card" style={{ padding: '1rem' }}>
                            <div style={{ color: '#E53935', fontWeight: 'bold' }}>Protein</div>
                            <div>{result.macros.protein}g</div>
                        </div>
                        <div className="card" style={{ padding: '1rem' }}>
                            <div style={{ color: '#1E88E5', fontWeight: 'bold' }}>Carbs</div>
                            <div>{result.macros.carbs}g</div>
                        </div>
                        <div className="card" style={{ padding: '1rem' }}>
                            <div style={{ color: '#FDD835', fontWeight: 'bold' }}>Fats</div>
                            <div>{result.macros.fats}g</div>
                        </div>
                    </div>
                    
                    <button onClick={() => navigate('/recommendations')} className="btn btn-primary" style={{ width: '100%' }}>
                        Get AI Menu Recommendations <Salad size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};
export default Calculator;
