import { useState } from 'react';
import './Signup.css';

function LogoIcon() {
    return (
        <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#14B8A6" />
            <line
                x1="18"
                y1="7"
                x2="18"
                y2="29"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
            <line
                x1="7"
                y1="18"
                x2="29"
                y2="18"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
            <line
                x1="10"
                y1="10"
                x2="26"
                y2="26"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
            <line
                x1="26"
                y1="10"
                x2="10"
                y2="26"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function Signup({ onSuccess, onLogin, onBack }) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        org: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function handleChange(e) {
        setForm((f) => ({
            ...f,
            [e.target.name]: e.target.value,
        }));

        setError('');
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!form.name.trim()) {
            setError('Please enter your name.');
            return;
        }

        if (!form.email.includes('@')) {
            setError('Enter a valid email address.');
            return;
        }

        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 900);
    }

    return (
        <div className="signup-page-container">
            {/* Top nav */}
            <div className="signup-nav">
                <button onClick={onBack} className="signup-brand-btn">
                    <LogoIcon />
                    <span className="signup-brand-title">ResearchOS</span>
                </button>

                <p className="signup-nav-text">
                    Already have an account?{' '}
                    <button onClick={onLogin} className="signup-nav-link">
                        Sign in
                    </button>
                </p>
            </div>

            <div className="signup-content-wrap">
                <div className="signup-card-container">
                    <h1 className="signup-title">Create your workspace</h1>
                    <p className="signup-subtitle">
                        Free for academic labs. No credit card required.
                    </p>

                    <div className="signup-card">
                        <form onSubmit={handleSubmit} className="signup-form">
                            {/* Full name */}
                            <div>
                                <label className="signup-field-label">Full name</label>
                                <input
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Dr. Jane Smith"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="signup-input"
                                />
                            </div>

                            {/* Work email */}
                            <div>
                                <label className="signup-field-label">Work email</label>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="jane@university.edu"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="signup-input"
                                />
                            </div>

                            {/* Institution */}
                            <div>
                                <label className="signup-field-label">
                                    Institution{' '}
                                    <span className="signup-field-optional">
                                        (optional)
                                    </span>
                                </label>
                                <input
                                    name="org"
                                    type="text"
                                    autoComplete="organization"
                                    placeholder="MIT CSAIL"
                                    value={form.org}
                                    onChange={handleChange}
                                    className="signup-input"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label className="signup-field-label">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Minimum 8 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="signup-input"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="signup-error-msg">{error}</p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="signup-submit-btn"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin"
                                            width="15"
                                            height="15"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                        >
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="6"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeDasharray="28"
                                                strokeDashoffset="10"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        Creating workspace…
                                    </>
                                ) : (
                                    'Create free workspace'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="signup-divider">
                            <div className="signup-divider-line" />
                            <span className="signup-divider-text">or</span>
                            <div className="signup-divider-line" />
                        </div>

                        {/* Google button */}
                        <button
                            type="button"
                            onClick={onSuccess}
                            className="signup-google-btn"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                            >
                                <path
                                    d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.58c1.51-1.39 2.4-3.44 2.4-5.88z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.58-2a4.8 4.8 0 01-7.15-2.52H.96v2.07A8 8 0 008 16z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M3.57 9.54A4.8 4.8 0 013.32 8c0-.54.09-1.06.25-1.54V4.39H.96A8 8 0 000 8c0 1.3.31 2.52.96 3.61l2.61-2.07z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M8 3.2c1.22 0 2.3.42 3.16 1.24l2.37-2.37A8 8 0 00.96 4.4l2.61 2.07A4.77 4.77 0 018 3.2z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        {/* Terms */}
                        <p className="signup-terms">
                            By signing up you agree to our{' '}
                            <button className="signup-terms-link">
                                Terms of Service
                            </button>
                            {' '}and{' '}
                            <button className="signup-terms-link">
                                Privacy Policy
                            </button>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}