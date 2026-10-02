import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';

const PromoBanner = () => {
  return (
    <section style={{ padding: '4rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            background: `linear-gradient(90deg, rgba(22, 21, 19, 0.92) 0%, rgba(22, 21, 19, 0.72) 60%, rgba(22, 21, 19, 0.35) 100%), url('https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1600&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '4.5rem 3rem',
            color: '#FFFFFF',
            border: '1px solid var(--border-dark)'
          }}
        >
          <div style={{ maxWidth: '600px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--accent-gold)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              <FaGem style={{ color: 'var(--accent-gold)' }} /> Seasonal Collection
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1rem'
              }}
            >
              Festive &amp; Everyday Curation
            </h2>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Discover our latest pieces across rings, necklaces, earrings, bracelets, and matching sets.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/shop" className="btn-aura-gold">
                Explore All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
