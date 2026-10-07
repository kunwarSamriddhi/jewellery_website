import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGem, FaLock, FaEnvelope } from 'react-icons/fa';

const Login = ({ showAlert }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (credentials.email && credentials.password) {
        localStorage.setItem('aura_user', JSON.stringify({ email: credentials.email, name: 'Client' }));
        if (showAlert) showAlert('success', 'Welcome back! You have successfully signed in.');
        navigate('/');
      } else {
        if (showAlert) showAlert('danger', 'Please enter valid credentials.');
      }
    }, 600);
  };

  return (
    <div style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--bg-primary)', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div
        className="container"
        style={{
          maxWidth: '460px',
          margin: '0 auto',
          backgroundColor: 'var(--bg-card)',
          padding: '3rem 2.5rem',
          borderRadius: '4px',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ color: 'var(--accent-gold-dark)', fontSize: '1.6rem', display: 'inline-block', marginBottom: '0.6rem' }}>
            <FaGem />
          </span>
          <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.4rem' }}>
            Client Sign In
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Access your saved wishlists, shopping bag, and order history.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="client@example.com"
                className="form-control"
                style={{ paddingLeft: '2.2rem', fontSize: '0.9rem' }}
              />
              <FaEnvelope
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label className="form-label mb-0" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); if (showAlert) showAlert('info', 'Password reset instructions would be sent via API.'); }} style={{ fontSize: '0.78rem', color: 'var(--accent-gold-dark)' }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="form-control"
                style={{ paddingLeft: '2.2rem', fontSize: '0.9rem' }}
              />
              <FaLock
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn-aura-primary"
            disabled={loading}
            style={{ width: '100%', padding: '0.85rem', marginBottom: '1.5rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Do not have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
