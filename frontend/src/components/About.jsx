import React from 'react';
import { Link } from 'react-router-dom';
import { FaGem, FaCheckCircle, FaHeart, FaShippingFast } from 'react-icons/fa';

const About = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>

      <section
        style={{
          padding: '6rem 1.5rem',
          background: `linear-gradient(rgba(18, 18, 17, 0.7), rgba(18, 18, 17, 0.7)), url('https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.8rem',
              color: 'var(--accent-gold)',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem'
            }}
          >
            About AURA
          </span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', color: '#FFFFFF', marginBottom: '1.2rem', fontFamily: 'var(--font-serif)' }}>
            Elevating Everyday Jewellery
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.88)', lineHeight: 1.7 }}>
            Designed for those who appreciate understated elegance and trend-forward accessories for every moment.
          </p>
        </div>
      </section>

      <section style={{ padding: '6rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="row g-5 align-items-center mb-6">
            <div className="col-lg-6">
              <span className="section-subtitle">Our Journey</span>
              <h2 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
                Jewellery That Complements Your Individual Style
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
                AURA was created to make beautiful, contemporary jewellery accessible for everyday wear as well as special
                celebrations. We curate collections that balance timeless aesthetics with modern styling trends.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Whether you are looking for a minimal ring to stack, an eye-catching necklace for work, or an ornate set
                for a wedding function, each piece in our store is chosen for its quality finish, design harmony, and comfort.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80"
                alt="Jewellery Design Studio"
                style={{
                  width: '100%',
                  borderRadius: '3px',
                  boxShadow: 'var(--shadow-md)',
                  objectFit: 'cover',
                  maxHeight: '420px'
                }}
              />
            </div>
          </div>

          <div style={{ marginTop: '5rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
            <div className="section-header">
              <span className="section-subtitle">What Defines Us</span>
              <h2 className="section-title">Our Guiding Values</h2>
            </div>

            <div className="row g-4">
              <div className="col-md-4">
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem 2rem', borderRadius: '3px', height: '100%' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>
                    <FaCheckCircle />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Quality Focused</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    We carefully inspect every item to ensure smooth polish, secure clasps, and resilient finishes.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem 2rem', borderRadius: '3px', height: '100%' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>
                    <FaGem />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Versatile Styling</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Curated pieces that pair effortlessly with Western outfits, ethnic ensembles, and fusion wear.
                  </p>
                </div>
              </div>

              <div className="col-md-4">
                <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '2.5rem 2rem', borderRadius: '3px', height: '100%' }}>
                  <div style={{ fontSize: '1.8rem', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>
                    <FaHeart />
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem' }}>Customer First</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    From easy browsing to simple Cash on Delivery ordering, we strive to make your shopping smooth and pleasant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-dark)', color: '#FFFFFF', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ color: '#FFFFFF', fontSize: '2.4rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
            Find Your Next Favourite Piece
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.75)', marginBottom: '2rem' }}>
            Explore our latest arrivals across rings, necklaces, earrings, and bracelets.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-aura-gold">
              Shop Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;