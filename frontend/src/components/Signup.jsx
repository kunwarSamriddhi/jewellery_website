import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGem, FaLock, FaEnvelope, FaUser } from 'react-icons/fa';

const Signup = ({ showAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      if (showAlert) showAlert('danger', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('aura_user', JSON.stringify({ email: formData.email, name: formData.name }));
      if (showAlert) showAlert('success', 'Your AURA client account has been created successfully!');
      navigate('/login');
    }, 600);
  };

  return (
    <div style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--bg-primary)', minHeight: '75vh', display: 'flex', alignItems: 'center' }}>
      <div
        className="container"
        style={{
          maxWidth: '480px',
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
            Create an Account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Join AURA for early access to new collections, exclusive offers, and order tracking.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Lady Alexandra"
                className="form-control"
                style={{ paddingLeft: '2.2rem', fontSize: '0.9rem' }}
              />
              <FaUser
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

          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alexandra@example.com"
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

          <div className="mb-3">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                minLength={6}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="•••••••• (min. 6 characters)"
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

          <div className="mb-4">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                minLength={6}
                name="confirmPassword"
                value={formData.confirmPassword}
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
