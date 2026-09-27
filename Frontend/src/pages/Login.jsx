import { useState } from 'react';
import './Login.css';

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

export default function Login({ onSuccess, onSignup, onBack }) {
    const [form, setForm] = useState({
        email: '',
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

        if (!form.email.includes('@')) {
            setError('Enter a valid email address.');
            return;
        }

        if (!form.password) {
            setError('Please enter your password.');
            return;
        }

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            onSuccess();
        }, 800);
    }

    return (
        <div className="auth-page-container">
            {/* Top nav */}
            <div className="auth-nav">
                <button onClick={onBack} className="auth-brand-btn">
                    <LogoIcon />
                    <span className="auth-brand-title">ResearchOS</span>
                </button>

                <p className="auth-nav-text">
                    Don't have an account?{' '}
                    <button onClick={onSignup} className="auth-nav-link">
                        Sign up free
                    </button>
                </p>
            </div>

            <div className="auth-content-wrap">
                <div className="auth-card-container">
                    <h1 className="auth-title">Welcome back</h1>
                    <p className="auth-subtitle">
                        Sign in to your research workspace.
                    </p>

                    <div className="auth-card">
                        <form onSubmit={handleSubmit} className="auth-form">
                            {/* Email */}
                            <div>
                                <label className="auth-field-label">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="jane@university.edu"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="auth-input"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="auth-field-label-row">
                                    <label className="auth-field-label" style={{ marginBottom: 0 }}>
                                        Password
                                    </label>
                                    <button type="button" className="auth-forgot-btn">
                                        Forgot password?
                                    </button>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="auth-input"
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="auth-error-msg">{error}</p>
                            )}

                            {/* Sign in button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="auth-submit-btn"
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
                                        Signing in…
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="auth-divider">
                            <div className="auth-divider-line" />
                            <span className="auth-divider-text">or</span>
                            <div className="auth-divider-line" />
                        </div>

                        {/* Google button */}
                        <button
                            type="button"
                            onClick={onSuccess}
                            className="auth-google-btn"
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
                    </div>
                </div>
            </div>
        </div>
    );
}