import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const BrandStory = () => {
  return (
    <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="row align-items-center g-5">

          <div className="col-lg-6">
            <div style={{ position: 'relative', padding: '1rem' }}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '65%',
                  height: '65%',
                  border: '1px solid var(--accent-gold)',
                  zIndex: 0
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=80"
                alt="Jewellery Design Workshop"
                style={{
                  width: '100%',
                  borderRadius: '3px',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: 'var(--shadow-md)',
                  objectFit: 'cover',
                  maxHeight: '500px'
                }}
              />
            </div>
          </div>

          <div className="col-lg-6">
            <span className="section-subtitle">Our Philosophy</span>
            <h2
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1.4rem',
                lineHeight: 1.2,
                fontWeight: 500
              }}
            >
              Thoughtfully Designed Jewellery for Everyday Moments
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', fontSize: '0.98rem', lineHeight: 1.75 }}>
              At AURA, we believe that beautiful jewellery should seamlessly complement your unique personality.
              From subtle accents for daily workwear to standout statement pieces for festive occasions,
              our designs are curated to inspire confidence.
            </p>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.98rem', lineHeight: 1.75 }}>
              Every creation is selected for its aesthetic appeal and wearable comfort. We focus on
              versatile styling, contemporary charm, and making online jewellery shopping simple and enjoyable.
            </p>

            <div className="row g-4 mb-4">
              <div className="col-sm-6">
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold-light)',
                      color: 'var(--accent-gold-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1rem'
                    }}
                  >
                    <FaCheckCircle />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', marginBottom: '0.2rem', fontWeight: 600 }}>Selected Designs</h4>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-secondary)' }}>
                      Thoughtfully chosen for finish, durability, and style.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6">
                <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-gold-light)',
                      color: 'var(--accent-gold-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: '1rem'
                    }}
                  >
                    <FaShieldAlt />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.96rem', marginBottom: '0.2rem', fontWeight: 600 }}>Protective Packaging</h4>
                    <p style={{ fontSize: '0.82rem', margin: 0, color: 'var(--text-secondary)' }}>
                      Packed carefully in protective jewellery boxes.
                    </p>
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
