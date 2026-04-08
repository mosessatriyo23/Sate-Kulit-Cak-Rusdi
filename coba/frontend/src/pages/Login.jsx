import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('nutrismart_user', JSON.stringify(data));
                navigate('/dashboard');
            }
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
            <div className="card">
                <h2 className="text-center flex items-center justify-center gap-2 mb-4">
                    <Activity size={28} /> Login
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input required type="email" name="email" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="form-group mb-4">
                        <label className="form-label">Password</label>
                        <input required type="password" name="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <div className="text-center mt-4">
                        No active profile? <Link to="/register" style={{color:'var(--primary)'}}>Register here.</Link>
                </div>
            </div>
        </div>
    );
};
export default Login;
