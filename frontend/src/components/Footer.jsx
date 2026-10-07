import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaGem,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = ({ showAlert }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      if (showAlert) {
        showAlert('success', 'Thank you for subscribing to AURA updates.');
      } else {
        alert('Thank you for subscribing to AURA updates.');
      }
      setEmail('');
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: '#FFFFFF',
        borderTop: '1px solid var(--border-dark)',
        paddingTop: '5rem',
        paddingBottom: '2.5rem'
      }}
    >
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="row g-5 mb-5">
          <div className="col-lg-4 col-md-6">
            <Link
              to="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                textDecoration: 'none',
                marginBottom: '1.2rem'
              }}
            >
              <span style={{ color: 'var(--accent-gold)', fontSize: '1.3rem' }}>
                <FaGem />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  letterSpacing: '0.18em',
                  color: '#FFFFFF'
                }}
              >
                AURA
              </span>
            </Link>

            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Curated contemporary jewellery designed to add subtle charm, elegance, and sparkle to your everyday moments.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '0.9rem'
                }}
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '0.9rem'
                }}
                aria-label="Pinterest"
              >
                <FaPinterestP />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: '0.9rem'
                }}
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                marginBottom: '1.3rem',
                fontWeight: 600
              }}
            >
              Collections
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  All Jewellery
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  Rings
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  Necklaces
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  Earrings
                </Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                marginBottom: '1.3rem',
                fontWeight: 600
              }}
            >
              Customer Care
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
              <li>
                <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/wishlist" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/login" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.88rem' }}>
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h4
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--accent-gold)',
                marginBottom: '1.3rem',
                fontWeight: 600
              }}
            >
              Newsletter
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', marginBottom: '1rem' }}>
              Subscribe to get notified about new arrivals, festive deals, and styling inspiration.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '2px',
                  color: '#FFFFFF',
                  padding: '0.65rem 1rem',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
              <button type="submit" className="btn-aura-gold" style={{ padding: '0.65rem 1.2rem', whiteSpace: 'nowrap' }}>
                Join
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FaMapMarkerAlt style={{ color: 'var(--accent-gold)', marginTop: '3px' }} />
                <span>[Store Address], [Area / Locality], [City], [State] – [PIN Code], India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaPhoneAlt style={{ color: 'var(--accent-gold)' }} />
                <span>+91 XXXXX XXXXX &bull; Mon-Sat 10:00 AM - 7:00 PM IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaEnvelope style={{ color: 'var(--accent-gold)' }} />
                <span>hello@example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.8rem'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} AURA Jewellery. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Customer Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
