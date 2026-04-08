import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Recommendations from './pages/Recommendations';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import { Apple, LayoutDashboard, User, LogOut, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setMobileOpen] = useState(false);
    const user = JSON.parse(localStorage.getItem('nutrismart_user'));

    const handleLogout = () => {
        localStorage.removeItem('nutrismart_user');
        navigate('/');
    };

    const NavLink = ({ to, children, icon: Icon }) => {
        const isActive = location.pathname === to;
        return (
            <Link to={to} className={`flex items-center gap-2 ${isActive ? 'active' : ''}`} style={isActive ? {color: 'var(--primary)', fontWeight: 'bold'} : {}}>
                <Icon size={18} /> {children}
            </Link>
        );
    };

    return (
        <nav className="navbar">
            <div className="flex justify-between items-center w-full">
                <Link to="/" className="navbar-brand">NutriSmart</Link>
                
                {/* Mobile Toggle */}
                <button className="btn-outline mobile-menu-btn" onClick={() => setMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <X/> : <Menu/>}
                </button>

                {/* Desktop Nav */}
                <div className="nav-links">
                    {user ? (
                        <>
                            <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                            <NavLink to="/recommendations" icon={Apple}>AI Menu</NavLink>
                            <NavLink to="/cart" icon={ShoppingCart}>Cart</NavLink>
                            <NavLink to="/profile" icon={User}>Profile</NavLink>
                            <button onClick={handleLogout} className="btn btn-outline" style={{padding: '0.4rem 1rem'}}>
                                <LogOut size={16}/> Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileOpen && (
                <div className="flex flex-col gap-4 mt-4 w-full" style={{textAlign:'center'}}>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={()=>setMobileOpen(false)}>Dashboard</Link>
                            <Link to="/recommendations" onClick={()=>setMobileOpen(false)}>AI Menu</Link>
                            <Link to="/cart" onClick={()=>setMobileOpen(false)}>Cart</Link>
                            <Link to="/profile" onClick={()=>setMobileOpen(false)}>Profile</Link>
                            <span onClick={()=>{handleLogout(); setMobileOpen(false);}} style={{color:'red'}}>Logout</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={()=>setMobileOpen(false)}>Login</Link>
                            <Link to="/register" onClick={()=>setMobileOpen(false)}>Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('nutrismart_user');
    return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
