import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('nutrismart_cart')) || [];
        setCart(saved);
    }, []);

    const removeFromCart = (index) => {
        let newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('nutrismart_cart', JSON.stringify(newCart));
    };

    const handleCheckout = async () => {
        if(cart.length === 0) return alert("Cart is empty");
        
        alert("Mock Checkout Processing...");
        // Here we'd send to our mock /api/checkout
        localStorage.removeItem('nutrismart_cart');
        setCart([]);
        alert("Order placed successfully! Menus will be delivered.");
        navigate('/dashboard');
    };

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalCals = cart.reduce((acc, item) => acc + (item.calories * item.serving * item.quantity), 0);

    return (
        <div className="cart-grid">
            <div>
                <h2 className="mb-4 flex items-center gap-2"><ShoppingCart /> Your Healthy Cart</h2>
                
                {cart.length === 0 ? (
                    <div className="card text-center" style={{ padding: '3rem' }}>
                        <h3 className="text-muted">Your cart is completely empty</h3>
                        <p>No individual items selected yet.</p>
                        <Link to="/recommendations" className="btn btn-primary mt-4">Browse AI Menu Planner</Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((item, idx) => (
                            <div key={idx} className="card flex justify-between items-center cart-item-card" style={{ padding: '1rem' }}>
                                <div className="flex items-center gap-4 cart-item-details">
                                    <img src={item.image} alt="food" style={{ width:'60px', height:'60px', borderRadius:'8px', objectFit: 'cover' }}/>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h4>
                                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                            Qty: {item.quantity} | {Math.round(item.calories * item.serving)} kcal/ea
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 cart-item-price">
                                    <div style={{ fontWeight: 'bold', color: 'var(--primary)', fontSize: '1.1rem' }}>
                                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                                    </div>
                                    <button onClick={() => removeFromCart(idx)} className="btn btn-danger" style={{ padding: '0.5rem 0.7rem' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="card" style={{ alignSelf: 'start', position: 'sticky', top: '100px' }}>
                <h3 className="mb-4">Order Summary</h3>
                <div className="flex justify-between mb-2">
                    <span className="text-muted">Total Items</span>
                    <span>{cart.length}</span>
                </div>
                <div className="flex justify-between mb-2">
                    <span className="text-muted">Total Calories</span>
                    <span>{Math.round(totalCals)} kcal</span>
                </div>
                <div className="flex justify-between mb-4" style={{ fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <span>Total Payment</span>
                    <span style={{ color: 'var(--primary)' }}>Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCheckout} disabled={cart.length === 0}>
                    Proceed to Checkout <ArrowRight size={18} />
                </button>
                <div className="text-center mt-2 text-muted" style={{ fontSize: '0.8rem' }}>
                    Free delivery on your mock-order!
                </div>
            </div>
        </div>
    );
};
export default Cart;
