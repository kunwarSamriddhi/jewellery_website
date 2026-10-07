import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const BrandStory = () => {
  return (
    <section style={{ padding: '6.5rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="row align-items-center g-5">

          <div className="col-lg-6">
            <div style={{ position: 'relative', padding: '1.5rem' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '70%',
                  height: '70%',
                  border: '1px solid var(--accent-gold)',
                  zIndex: 0
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80"
                alt="Jewellery Design Workshop"
                style={{
                  width: '100%',
                  borderRadius: '2px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: 'var(--shadow-lg)',
                  objectFit: 'cover',
                  maxHeight: '520px'
                }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <span className="section-subtitle">Our Philosophy</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1.5rem',
                lineHeight: 1.2
              }}
            >
              Thoughtfully Designed Jewellery for Everyday Moments
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '1rem', lineHeight: 1.7 }}>
              At AURA, we believe that beautiful jewellery should seamlessly complement your unique personality.
              From subtle accents for daily workwear to standout statement pieces for festive occasions,
              our designs are curated to inspire confidence.
            </p>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.7 }}>
              Every creation is selected for its aesthetic appeal and wearable comfort. We focus on
              versatile styling, contemporary charm, and making online jewellery shopping simple and enjoyable.
            </p>

            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold-light)',
                      color: 'var(--accent-gold-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Selected Designs</h4>
                    <p style={{ fontSize: '0.82rem', margin: 0 }}>Thoughtfully chosen for finish and style.</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold-light)',
                      color: 'var(--accent-gold-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Protective Packaging</h4>
                    <p style={{ fontSize: '0.82rem', margin: 0 }}>Packed carefully in jewellery boxes.</p>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn-aura-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
