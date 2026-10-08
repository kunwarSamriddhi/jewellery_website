import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGem } from 'react-icons/fa';

const Hero = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, rgba(22, 21, 19, 0.72) 0%, rgba(22, 21, 19, 0.5) 100%), url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
        color: '#FFFFFF',
        padding: '5.5rem 1.5rem'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div style={{ maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-gold-light)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              padding: '0.4rem 0.95rem',
              borderRadius: '20px',
              fontSize: '0.76rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <FaGem style={{ color: 'var(--accent-gold)' }} />
            Trending Collections &amp; Everyday Staples
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
              lineHeight: 1.15,
              color: '#FFFFFF',
              fontWeight: 400,
              marginBottom: '1.25rem',
              fontFamily: 'var(--font-serif)'
            }}
          >
            Timeless Jewellery for Everyday Elegance
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.98rem, 1.8vw, 1.12rem)',
              color: 'rgba(255, 255, 255, 0.88)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 300
            }}
          >
            Discover our handpicked curation of stylish rings, necklaces, earrings, and bracelets
            crafted to elevate your everyday looks and festive celebrations.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Link
              to="/shop"
              className="btn-aura-gold"
              style={{ padding: '0.85rem 2rem' }}
            >
              Shop All Pieces <FaArrowRight style={{ fontSize: '0.78rem' }} />
            </Link>

            <Link
              to="/about"
              className="btn-aura-outline"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.45)',
                color: '#FFFFFF',
                padding: '0.85rem 1.8rem'
              }}
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
