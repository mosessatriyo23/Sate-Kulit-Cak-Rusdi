import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Target } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', 
        dob: '', gender: 'male', 
        weight: '', height: '', 
        activityLevel: '1.2', goal: 'maintain'
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.error) alert(data.error);
            else {
                // Mock Token Login immediately after register
                alert("Account created successfully! Your daily calories have been mapped.");
                navigate('/login');
            }
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card mb-4" style={{ borderTop: '4px solid var(--primary)' }}>
                <h2 className="text-center flex items-center justify-center gap-2 mb-2">
                    <Target size={28} /> Create NutriSmart Account
                </h2>
                <p className="text-muted text-center mb-4">Let's calculate your bodily needs by setting up your biological profile.</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input required type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input required type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input required type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className="grid-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                        <div className="form-group">
                            <label className="form-label">Date of Birth</label>
                            <input required type="date" name="dob" className="form-input" value={formData.dob} onChange={handleChange} />
                            <small className="text-muted">Used for auto-aging calculations</small>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Gender</label>
                            <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

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
                        {loading ? 'Processing...' : 'Calculate My Needs & Register'}
                    </button>
                    
                    <div className="text-center mt-4">
                        Already have an account? <Link to="/login" style={{color:'var(--primary)'}}>Login here.</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Register;
