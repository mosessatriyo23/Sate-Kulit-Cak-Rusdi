import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Bell, Trophy, Target } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem('nutrismart_user')) || {};
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/dashboard')
            .then(res => res.json())
            .then(data => setStats(data));
    }, []);

    if (!stats) return <div className="text-center mt-4"><h3>Loading Health Metrics...</h3></div>;
    
    // We override target with dynamic user target from Auth
    const targetCalories = user.dailyCalories || stats.progress.caloriesTarget || 2000;
    const { progress, reminder } = stats;

    const macroData = {
        labels: ['Protein', 'Carbs', 'Fat'],
        datasets: [
            {
                data: [progress.protein, progress.carbs, progress.fat],
                backgroundColor: ['#E53935', '#1E88E5', '#FDD835'],
                borderWidth: 0,
            },
        ],
    };

    const barData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Calories Consumed',
                data: [targetCalories-200, targetCalories-50, targetCalories+100, targetCalories-100, progress.caloriesConsumed, 0, 0],
                backgroundColor: 'rgba(0, 95, 2, 0.7)',
            },
            {
                label: 'Personal Target',
                data: Array(7).fill(targetCalories),
                backgroundColor: 'rgba(66, 122, 67, 0.2)',
            }
        ],
    };

    return (
        <div>
            <h2 className="mb-4">Welcome back, {user.name?.split(' ')[0] || 'User'}! 🌿</h2>
            
            <div className="card mb-4" style={{ background: '#E8F5E9', borderColor: '#4CAF50', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: '#4CAF50', color: 'white', padding: '10px', borderRadius: '50%' }}><Bell /></div>
                <div>
                    <h4 style={{ margin: 0 }}>Smart Reminder</h4>
                    <p style={{ margin: 0, color: 'var(--text-main)' }}>You need {targetCalories - progress.caloriesConsumed > 0 ? targetCalories - progress.caloriesConsumed : 0} more calories today. Consider a light healthy snack.</p>
                </div>
            </div>

            <div className="grid-3 mb-4">
                <div className="card text-center flex flex-col justify-center items-center">
                    <Trophy size={40} color="var(--primary)" style={{ marginBottom: '10px' }} />
                    <div className="text-muted">Calories Today</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {progress.caloriesConsumed} / {targetCalories} kcal
                    </h3>
                    <div style={{ background: '#e0e0e0', height: '12px', width: '100%', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min((progress.caloriesConsumed / targetCalories) * 100, 100)}%`, background: 'var(--primary)' }}></div>
                    </div>
                </div>
                
                <div className="card flex flex-col items-center">
                    <h4 className="text-center mb-2">Macronutrient Intake</h4>
                    <div style={{ maxWidth: '140px', width: '100%' }}>
                        <Doughnut data={macroData} options={{ maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
                    </div>
                </div>

                <div className="card">
                     <h4 className="mb-2 flex items-center gap-2"><Target size={20} /> Weekly Hits</h4>
                     <p className="text-sm text-muted mb-4">You are hitting approx. 85% of your personalized targets. Keep it going!</p>
                     <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', lineHeight: '1.8' }}>
                         <li>Hydration: 2.2L / 2L</li>
                         <li>Sleep Quality: Optimal</li>
                         <li>Workouts: 2/4 logged</li>
                     </ul>
                </div>
            </div>

            <div className="card">
                <h4 className="mb-4">Caloric Breakdown vs Targets (Weekly View)</h4>
                <div style={{ height: '300px' }}>
                    <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
