import { useState, useEffect } from 'react';
import './Landing.css';

const features = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1.5" fill="#0F9D8A" opacity="0.85" />
                <rect x="11" y="2" width="7" height="7" rx="1.5" fill="#14B8A6" opacity="0.5" />
                <rect x="2" y="11" width="7" height="7" rx="1.5" fill="#14B8A6" opacity="0.5" />
                <rect x="11" y="11" width="7" height="7" rx="1.5" fill="#0F9D8A" opacity="0.85" />
            </svg>
        ),
        title: 'Dataset Versioning',
        desc: 'Track every mutation with full lineage. Compare versions side-by-side and roll back instantly.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 12 L6 7 L10 13 L14 8 L18 10" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="7" r="1.5" fill="#0F9D8A" />
                <circle cx="10" cy="13" r="1.5" fill="#0F9D8A" />
                <circle cx="14" cy="8" r="1.5" fill="#0F9D8A" />
            </svg>
        ),
        title: 'Experiment Tracking',
        desc: 'Log hyperparameters, metrics, and artifacts automatically. Compare runs with interactive charts.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="3.5" cy="10" r="2.5" fill="#14B8A6" opacity="0.7" />
                <circle cx="10" cy="4" r="2.5" fill="#0F9D8A" />
                <circle cx="16.5" cy="10" r="2.5" fill="#14B8A6" opacity="0.7" />
                <circle cx="10" cy="16" r="2.5" fill="#0F9D8A" opacity="0.7" />
                <line x1="6" y1="10" x2="7.5" y2="10" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="12.5" y1="10" x2="14" y2="10" stroke="#14B8A6" strokeWidth="1.5" />
                <line x1="10" y1="6.5" x2="10" y2="8" stroke="#0F9D8A" strokeWidth="1.5" />
                <line x1="10" y1="12" x2="10" y2="13.5" stroke="#0F9D8A" strokeWidth="1.5" />
            </svg>
        ),
        title: 'Provenance Lineage',
        desc: 'Visualize your full pipeline from raw data to model output. Reproduce any result with one click.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 5 Q10 2 16 5 L16 11 Q10 16 4 11 Z" fill="#14B8A6" opacity="0.12" />
                <path d="M4 5 Q10 2 16 5 L16 11 Q10 16 4 11 Z" stroke="#0F9D8A" strokeWidth="1.6" fill="none" />
                <circle cx="10" cy="8.5" r="2" fill="#0F9D8A" opacity="0.8" />
            </svg>
        ),
        title: 'Research Copilot',
        desc: 'Ask questions about your data, summarize findings, and draft experiment proposals with AI.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="6" cy="6" r="2.5" stroke="#0F9D8A" strokeWidth="1.6" />
                <circle cx="14" cy="6" r="2.5" stroke="#14B8A6" strokeWidth="1.6" opacity="0.7" />
                <circle cx="10" cy="14" r="2.5" stroke="#0F9D8A" strokeWidth="1.6" />
                <line x1="8.5" y1="6" x2="11.5" y2="6" stroke="#14B8A6" strokeWidth="1.2" />
                <line x1="7.5" y1="8.5" x2="9" y2="11.5" stroke="#0F9D8A" strokeWidth="1.2" />
                <line x1="12.5" y1="8.5" x2="11" y2="11.5" stroke="#0F9D8A" strokeWidth="1.2" />
            </svg>
        ),
        title: 'Team Collaboration',
        desc: 'Shared workspaces, role-based access, and async activity feeds keep your lab in sync.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="13" width="3" height="5" rx="1" fill="#14B8A6" opacity="0.6" />
                <rect x="7" y="9" width="3" height="9" rx="1" fill="#0F9D8A" opacity="0.75" />
                <rect x="12" y="5" width="3" height="13" rx="1" fill="#14B8A6" opacity="0.85" />
                <rect x="17" y="2" width="3" height="16" rx="1" fill="#0F9D8A" />
            </svg>
        ),
        title: 'Model Analytics',
        desc: 'Benchmark models on accuracy, latency, and reproducibility. Export publication-ready figures.',
    },
];

const stats = [
    { value: '10×', label: 'faster experimentation' },
    { value: '99.9%', label: 'reproducibility rate' },
    { value: '500+', label: 'research teams' },
    { value: '2M+', label: 'tracked experiments' },
];

const navLinks = [
    { label: 'Features' },
    { label: 'How It Works' },
    { label: 'Research' },
    { label: 'Pricing' },
];

function LogoIcon({ size = 32 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#14B8A6" />
            <line x1="18" y1="7" x2="18" y2="29" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="7" y1="18" x2="29" y2="18" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="10" y1="10" x2="26" y2="26" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="26" y1="10" x2="10" y2="26" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
    );
}

export default function Landing({ onGetStarted, onLogin }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const el = document.getElementById('landing-root');
        if (!el) return;
        const handler = () => setScrolled(el.scrollTop > 32);
        el.addEventListener('scroll', handler);
        return () => el.removeEventListener('scroll', handler);
    }, []);

    return (
        <div id="landing-root" className="landing-container">
            {/* Nav */}
            <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
                <div className="landing-nav-inner">
                    <div className="landing-logo">
                        <LogoIcon size={32} />
                        <span className="landing-logo-text">ResearchOS</span>
                    </div>
                    <div className="landing-nav-links">
                        {navLinks.map(l => (
                            <button key={l.label} className="landing-nav-link">{l.label}</button>
                        ))}
                    </div>
                    <div className="landing-nav-actions">
                        <button onClick={onLogin} className="landing-login-btn">
                            Log in
                        </button>
                        <button onClick={onGetStarted} className="landing-signup-btn">
                            Get started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero-bg-gradient" />
                <div className="landing-hero-bg-glow" />

                <div className="landing-hero-content">
                    <div className="landing-badge">
                        <span className="landing-badge-pulse" />
                        Now in public beta — free for academic labs
                    </div>
                    <h1 className="landing-hero-title">
                        Turn your research into<br />
                        <span className="landing-hero-title-highlight">reproducible results</span>
                    </h1>
                    <p className="landing-hero-subtitle">
                        A unified workspace for datasets, experiments, and lineage — so your lab can move faster and publish with confidence.
                    </p>
                    <div className="landing-hero-buttons">
                        <button onClick={onGetStarted} className="landing-cta-primary">
                            Get started free
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button onClick={onLogin} className="landing-cta-secondary">
                            Sign in to workspace
                        </button>
                    </div>
                </div>

                {/* Dashboard preview */}
                <div className="landing-preview-wrapper">
                    <div className="landing-preview-card">
                        {/* Window chrome */}
                        <div className="landing-chrome-bar">
                            <div className="landing-dot landing-dot-red" />
                            <div className="landing-dot landing-dot-yellow" />
                            <div className="landing-dot landing-dot-green" />
                            <span className="landing-chrome-title">ResearchOS — Experiment Dashboard</span>
                        </div>
                        {/* Stat cards */}
                        <div className="landing-preview-stats">
                            {[
                                { label: 'Active Experiments', val: '24', delta: '+3 this week', color: '#14B8A6' },
                                { label: 'Best Accuracy', val: '94.7%', delta: 'ResNet-50 v4', color: '#0F9D8A' },
                                { label: 'Datasets Tracked', val: '187', delta: '12.4 GB total', color: '#14B8A6' },
                            ].map((s) => (
                                <div key={s.label} className="landing-preview-stat-card">
                                    <div className="landing-preview-stat-label">{s.label}</div>
                                    <div className="landing-preview-stat-val" style={{ color: s.color }}>{s.val}</div>
                                    <div className="landing-preview-stat-delta">{s.delta}</div>
                                </div>
                            ))}
                        </div>
                        {/* Chart */}
                        <div className="landing-preview-chart-wrapper">
                            <div className="landing-preview-chart-card">
                                <div className="landing-preview-chart-header">
                                    <span className="landing-preview-chart-title">Accuracy over training epochs</span>
                                    <span className="landing-preview-chart-sub">ResNet-50 v4</span>
                                </div>
                                <svg viewBox="0 0 500 80" style={{ width: '100%', height: '3.5rem' }}>
                                    <defs>
                                        <linearGradient id="agrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.18" />
                                            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,70 C50,65 100,50 150,38 C200,25 250,18 300,14 C350,10 400,8 500,6 L500,80 L0,80 Z" fill="url(#agrad)" />
                                    <path d="M0,70 C50,65 100,50 150,38 C200,25 250,18 300,14 C350,10 400,8 500,6" fill="none" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M0,72 C50,68 100,60 150,52 C200,44 250,38 300,35 C350,32 400,30 500,28" fill="none" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="landing-stats-section">
                <div className="landing-stats-grid">
                    {stats.map((s) => (
                        <div key={s.label}>
                            <div className="landing-stat-value">{s.value}</div>
                            <div className="landing-stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="landing-features-section">
                <div className="landing-features-container">
                    <div className="landing-features-header">
                        <h2 className="landing-features-title">Everything your lab needs</h2>
                        <p className="landing-features-desc">From raw data ingestion to publication-ready results, ResearchOS handles the full research lifecycle.</p>
                    </div>
                    <div className="landing-features-grid">
                        {features.map((f) => (
                            <div key={f.title} className="landing-feature-card">
                                <div className="landing-feature-icon-box">
                                    {f.icon}
                                </div>
                                <h3 className="landing-feature-card-title">{f.title}</h3>
                                <p className="landing-feature-card-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="landing-cta-section">
                <div className="landing-cta-container">
                    <h2 className="landing-cta-title">Ready to accelerate your research?</h2>
                    <p className="landing-cta-desc">Join 500+ research teams already using ResearchOS. Free for academic labs, no credit card required.</p>
                    <button onClick={onGetStarted} className="landing-cta-btn">
                        Create your free workspace
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-footer-container">
                    <div className="landing-footer-grid">
                        {/* Brand + tagline */}
                        <div className="landing-footer-brand-col">
                            <div className="landing-footer-brand-row">
                                <LogoIcon size={30} />
                                <span className="landing-footer-brand-title">ResearchOS</span>
                            </div>
                            <p className="landing-footer-brand-desc">
                                Turn your research into reproducible results. A unified workspace for datasets, experiments, and lineage.
                            </p>
                        </div>

                        {/* Product links */}
                        <div>
                            <h4 className="landing-footer-col-title">Product</h4>
                            <ul className="landing-footer-links-list">
                                {['Features', 'How It Works', 'Research', 'About'].map(l => (
                                    <li key={l}>
                                        <button className="landing-footer-link-btn">{l}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources links */}
                        <div>
                            <h4 className="landing-footer-col-title">Resources</h4>
                            <ul className="landing-footer-links-list">
                                {['Documentation', 'GitHub', 'Contact'].map(l => (
                                    <li key={l}>
                                        <button className="landing-footer-link-btn">{l}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="landing-footer-bottom">
                        <p className="landing-footer-copyright">© 2026 ResearchOS. All rights reserved.</p>
                        <div className="landing-footer-status">
                            <span className="landing-footer-status-dot" />
                            System operational
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
