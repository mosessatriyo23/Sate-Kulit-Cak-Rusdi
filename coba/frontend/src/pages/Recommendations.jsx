import React, { useEffect, useState } from 'react';
import { BrainCircuit, RefreshCw, ShoppingBag } from 'lucide-react';

const Recommendations = () => {
    const user = JSON.parse(localStorage.getItem('nutrismart_user'));
    const [meals, setMeals] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ isOpen: false, food: null, category: null, mealType: null, idx: null });
    const [alternatives, setAlternatives] = useState([]);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const target = user.dailyCalories || 2000;
            const res = await fetch('http://localhost:5000/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetCalories: target })
            });
            const data = await res.json();
            setMeals(data.meals);
        } catch (e) { console.error(e); }
        setLoading(false);
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const addToCart = (item) => {
        let cart = JSON.parse(localStorage.getItem('nutrismart_cart')) || [];
        // Add single item to cart
        const cartItem = { id: item.id || Math.random(), name: item.name, calories: item.calories, price: item.price || 15000, serving: item.serving, quantity: 1, image: `https://ui-avatars.com/api/?name=${item.name.replace(/\([^)]*\)/g,'')}&background=E8F5E9&color=005F02` };
        
        const existing = cart.find(i => i.name === cartItem.name);
        if(existing) existing.quantity += 1;
        else cart.push(cartItem);
        
        localStorage.setItem('nutrismart_cart', JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
    };

    const openSwapModal = async (food, category, mealType, idx) => {
        setModal({ isOpen: true, food, category, mealType, idx });
        setAlternatives([]);
        try {
            const res = await fetch('http://localhost:5000/api/substitute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foodId: food.id, category })
            });
            const data = await res.json();
            setAlternatives(data.alternatives);
        } catch(e) { console.error(e); }
    };

    const confirmSwap = (newFood) => {
        const updatedMeals = { ...meals };
        updatedMeals[modal.mealType][modal.idx] = { ...newFood, serving: modal.food.serving };
        setMeals(updatedMeals);
        setModal({ isOpen: false, food: null, category: null, mealType: null, idx: null });
    };

    if (loading) return <div className="text-center mt-4"><h3>AI is designing your perfect menu based on {user?.dailyCalories} kcal...</h3></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-4" style={{flexWrap: 'wrap', gap: '1rem'}}>
                <h2><BrainCircuit style={{ display:'inline', marginBottom:'-5px' }} /> Daily Smart Menu Planner</h2>
                <button className="btn btn-outline" onClick={fetchRecommendations}>
                    Regenerate AI Plan <RefreshCw size={16}/>
                </button>
            </div>

            {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                <div key={mealType} className="mb-4">
                    <h3 style={{textTransform: 'capitalize'}}>{mealType}</h3>
                    <div className="grid-3">
                        {meals[mealType].map((item, idx) => (
                            <div key={idx} className="card flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="badge badge-category">{item.category}</span>
                                        {item.is_vegan && <span className="badge badge-vegan">🌱 Vegan</span>}
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <div style={{ width: '60px', height: '60px', background: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
                                            <img src={`https://ui-avatars.com/api/?name=${item.name.replace(/\([^)]*\)/g,'')}&background=E8F5E9&color=005F02`} alt={item.name} style={{width:'100%', height:'100%', objectFit:'cover'}} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0', lineHeight: '1.2' }}>{item.name}</h4>
                                            <div className="text-muted" style={{ fontSize: '0.9rem' }}>Serving: {item.serving}x</div>
                                        </div>
                                    </div>
                                    <div className="mt-2" style={{ fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #efefef', paddingTop: '10px' }}>
                                        <span>🔥 {Math.round(item.calories * item.serving)} kcal</span>
                                        <span style={{color: 'var(--primary)', fontWeight: 'bold'}}>Rp {(item.price || 15000).toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                                <div className="grid-2 mt-4" style={{ gap: '0.5rem', gridTemplateColumns: '1fr 1fr' }}>
                                    <button className="btn btn-outline" style={{ padding: '0.5rem', fontSize:'0.9rem' }} onClick={() => openSwapModal(item, item.category, mealType, idx)}>
                                        AI Swap
                                    </button>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem', fontSize:'0.9rem' }} onClick={() => addToCart(item)}>
                                        <ShoppingBag size={14} /> Add
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {modal.isOpen && (
                <div className="modal-overlay" style={{ display: 'flex' }}>
                    <div className="modal-content">
                        <h3>AI Smart Substitution <BrainCircuit size={18} /></h3>
                        <p className="text-muted mb-4">Replacing <b>{modal.food.name}</b> with equivalently nutritious options.</p>
                        
                        <div className="mb-2" style={{ background: '#f5f5f5', padding: '10px', borderRadius: '8px' }}>
                            <small>Original Macros: {modal.food.calories} kcal | {modal.food.protein}g Protein | {modal.food.carbs}g Carbs</small>
                        </div>

                        {alternatives.length === 0 ? <p>Finding best alternatives...</p> : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {alternatives.map(alt => (
                                    <div key={alt.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', cursor: 'pointer' }} onClick={() => confirmSwap(alt)}>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{alt.name}</div>
                                            <div style={{ fontSize: '0.85rem' }} className="text-muted">🔥 {alt.calories} kcal | 💪 {alt.protein}g P | 🌾 {alt.carbs}g C</div>
                                            {Math.abs(alt.calories - modal.food.calories) < 20 && <span className="badge badge-vegan mt-1 d-inline-block">Perfect Match</span>}
                                        </div>
                                        <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>Select</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button className="btn btn-outline mt-4" onClick={() => setModal({ ...modal, isOpen: false })} style={{ width: '100%' }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default Recommendations;
