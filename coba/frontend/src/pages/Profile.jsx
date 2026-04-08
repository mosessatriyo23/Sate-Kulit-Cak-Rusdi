import React, { useEffect, useState } from 'react';
import { User, Activity, Flame } from 'lucide-react';

const Profile = () => {
    const defaultUser = JSON.parse(localStorage.getItem('nutrismart_user'));
    const [user, setUser] = useState(defaultUser);
    const [formData, setFormData] = useState({
        weight: defaultUser?.weight || '',
        height: defaultUser?.height || '',
        activityLevel: defaultUser?.activityLevel || '1.2',
        goal: defaultUser?.goal || 'maintain'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const fetchProfile = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/user/profile/${user.id}`);
            const data = await res.json();
            setUser(data);
            localStorage.setItem('nutrismart_user', JSON.stringify(data));
        } catch (e) { console.error(e); }
    };

    useEffect(() => {
        if(user) fetchProfile();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch(`http://localhost:5000/api/user/profile/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.error) setMessage(data.error);
            else {
                setMessage('Profile Updated Successfully! Your AI targets have adjusted.');
                fetchProfile(); // refresh data
            }
        } catch(e) { console.error(e); setMessage('Error updating profile'); }
        setLoading(false);
    };

    if (!user || !user.nutrition) return <div className="text-center mt-4">Loading Profile...</div>;

    return (
        <div className="grid-2">
            <div className="card">
                <h2 className="flex items-center gap-2 mb-4"><User /> Biological Profile</h2>
                <div className="mb-4 text-muted" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
                    <p><strong>Current Age:</strong> {user.age} Years (Auto-Calculated)</p>
                    <p><strong>Gender:</strong> {user.gender}</p>
                </div>
                
                <h3>Update Metrics</h3>
                <p className="text-sm text-muted mb-4">Body changes? Update here so AI can re-sync your diet.</p>
                {message && <div style={{ background: '#E8F5E9', color: '#2E7D32', padding: '10px', borderRadius: '8px', marginBottom: '1rem' }}>{message}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Weight (kg)</label>
                            <input type="number" name="weight" className="form-input" value={formData.weight} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Height (cm)</label>
                            <input type="number" name="height" className="form-input" value={formData.height} onChange={handleChange} />
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

                    <button type="submit" className="btn btn-outline" style={{width: '100%'}} disabled={loading}>
                        {loading ? 'Saving...' : 'Recalculate & Save Profile'}
                    </button>
                </form>
            </div>

            <div className="card" style={{ background: 'var(--hover-tint)', alignSelf: 'start' }}>
                <h3 className="text-center mb-4 flex items-center justify-center gap-2">
                    <Activity /> Realtime Engine Target
                </h3>
                <div className="card text-center mb-4" style={{ padding: '1.5rem' }}>
                    <div className="text-muted mb-1">True Daily Energy Target</div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0', color: '#E65100' }} className="flex items-center justify-center gap-2">
                        <Flame color="#E65100" size={32} /> {user.nutrition.dailyCalories} kcal
                    </h2>
                </div>
                
                <h4 className="mb-2 text-center">Precise Macro Goals</h4>
                <div className="grid-3 mb-4 text-center">
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#E53935', fontWeight: 'bold' }}>Protein</div>
                        <div>{user.nutrition.protein}g</div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#1E88E5', fontWeight: 'bold' }}>Carbs</div>
                        <div>{user.nutrition.carbs}g</div>
                    </div>
                    <div className="card" style={{ padding: '1rem' }}>
                        <div style={{ color: '#FDD835', fontWeight: 'bold' }}>Fats</div>
                        <div>{user.nutrition.fats}g</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Profile;
