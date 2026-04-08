import React from 'react';
import { Link } from 'react-router-dom';
import { Target, ShieldCheck, Mail, ArrowRight, Zap, RefreshCw, BarChart3, Activity } from 'lucide-react';

const Landing = () => {
    return (
        <div style={{ paddingBottom: '4rem' }}>
            {/* Hero Section */}
            <div className="hero grid-2 flex items-center animate-fade-up">
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="badge badge-vegan mb-4" style={{ display: 'inline-block', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>✨ V2.0 AI Engine Live</div>
                    <h1>Smart Nutrition for a Better Life</h1>
                    <p>Welcome to NutriSmart. Your personal health architect. We calculate your precise macros based on your biometrics and design a smart menu you'll genuinely love.</p>
                    <div className="flex gap-4">
                        <Link to="/register" className="btn btn-primary btn-pulse" style={{ background: 'var(--white)', color: 'var(--primary)', fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                            Start Your Journey <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center animate-float" style={{ position: 'relative', zIndex: 1 }}>
                    <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=500&h=500" alt="Healthy Plate" style={{ width: '100%', maxWidth: '400px', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.2)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} />
                </div>
            </div>

            {/* Application Explanation / Features */}
            <div className="text-center mb-4 animate-fade-up animate-delay-1">
                <h2 className="mb-2" style={{ fontSize: '2.5rem' }}>Why NutriSmart?</h2>
                <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem auto' }}>We bridge the gap between rigorous nutrition science and accessible daily habits using cutting-edge AI.</p>
            </div>
            
            <div className="grid-3 mb-4">
                <div className="card text-center animate-fade-up animate-delay-1">
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--hover-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <Target size={32} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Surgical Precision</h3>
                    <p className="text-muted">No guessing games. Provide your DOB, Height, and Weight upon signup to calculate your real-time Basal Metabolic Rate and True Daily Energy Expenditure.</p>
                </div>
                
                <div className="card text-center animate-fade-up animate-delay-2">
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--hover-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <RefreshCw size={32} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Smart Substitution</h3>
                    <p className="text-muted">Bored of eating boiled chicken? Our mock-AI engine replaces foods you don't like with alternatives matching identical macros and calorie allowances (+/- 70 kcal).</p>
                </div>

                <div className="card text-center animate-fade-up animate-delay-3">
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--hover-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <Activity size={32} color="var(--primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Dynamic Profiling</h3>
                    <p className="text-muted">As your body morphs, so does your diet. Auto-aging detection and continuous profile edits keep your health blueprints 100% accurate every single day.</p>
                </div>
            </div>

            {/* About Us */}
            <div className="card mb-4 mt-4 animate-fade-up" style={{ background: '#0B190C', color: 'white', border: 'none', padding: '4rem 3rem', borderRadius: 'var(--radius-lg)' }}>
                <div className="grid-2 items-center">
                    <div>
                        <h2 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Visionaries Behind It</h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>NutriSmart is an innovative startup born from the necessity of accessible wellness. We blend web technology and nutrition science into actionable recommendations.</p>
                        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2rem' }}>Our core mission is to obliterate restrictive fad diets and empower individuals globally to make intelligent, uncompromised food choices.</p>
                        <ul style={{ color: 'var(--primary-light)', fontWeight: 'bold', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li className="flex items-center gap-2"><Zap size={20}/> Zero Confusing Math</li>
                            <li className="flex items-center gap-2"><Zap size={20}/> Focus on Consistency</li>
                            <li className="flex items-center gap-2"><Zap size={20}/> 100% Data-Driven Algorithm</li>
                        </ul>
                    </div>
                    <div className="flex justify-center">
                        <img src="https://images.unsplash.com/photo-1555243896-771a8239d20c?auto=format&fit=crop&q=80&w=500&h=600" alt="About Us Team" style={{ width: '100%', maxWidth: '400px', borderRadius: 'var(--radius)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)', height: '100%', objectFit: 'cover' }} />
                    </div>
                </div>
            </div>

            {/* Contact Us */}
            <div className="animate-fade-up" style={{ maxWidth: '700px', margin: '6rem auto 2rem auto' }}>
                <div className="card card-solid text-center" style={{ padding: '3rem 2rem' }}>
                    <h2 className="mb-2" style={{ fontSize: '2.5rem' }}>Get in Touch</h2>
                    <p className="text-muted mb-4">Have questions regarding our API or nutritional algorithms? Reach out to our founders directly.</p>
                    <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
                        <div className="grid-2" style={{ gap: '1rem' }}>
                            <div className="form-group">
                                <label className="form-label" style={{textAlign:'left'}}>Full Name</label>
                                <input type="text" className="form-input" placeholder="John Doe" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" style={{textAlign:'left'}}>Email Address</label>
                                <input type="email" className="form-input" placeholder="john@company.com" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label" style={{textAlign:'left'}}>Message</label>
                            <textarea className="form-input" rows="5" placeholder="How can we help you achieve your goals?" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                            <Mail size={20} /> Send Mission Report
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Landing;
