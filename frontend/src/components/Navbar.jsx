import React, { useState, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaShoppingBag,
  FaHeart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
  FaGem
} from 'react-icons/fa';
import ShopContext from '../context/ShopContext';

const Navbar = ({ showAlert }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const { cartCount, wishlistCount, setSearchQuery, setSelectedCategory } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchQuery(localSearch.trim());
      setSelectedCategory('all');
      navigate('/shop');
      setSearchOpen(false);
    }
  };

  const handleCategoryNav = (catSlug) => {
    setSelectedCategory(catSlug.toLowerCase());
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'var(--bg-primary)' }}>
      <div
        style={{
          backgroundColor: 'var(--bg-dark)',
          color: 'var(--accent-gold-light)',
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.45rem 1rem',
          textAlign: 'center',
          fontWeight: 500
        }}
      >
        Cash on Delivery Available &bull; Explore Our Latest Jewellery Collections
      </div>

      <nav
        style={{
          borderBottom: '1px solid var(--border-color)',
          padding: '1.1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1440px',
          margin: '0 auto',
          position: 'relative'
        }}
      >
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            padding: '0.25rem'
          }}
          className="d-lg-none d-flex align-items-center"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none'
          }}
        >
          <span
            style={{
              color: 'var(--accent-gold-dark)',
              fontSize: '1.2rem',
              display: 'flex'
            }}
          >
            <FaGem />
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: 'var(--text-primary)',
                lineHeight: 1
              }}
            >
              AURA
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.58rem',
                letterSpacing: '0.25em',
                color: 'var(--accent-gold-dark)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '2px'
              }}
            >
              Jewellery &amp; Accessories
            </span>
          </div>
        </Link>

        <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: '2rem' }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--accent-gold-dark)' : 'var(--text-primary)',
              position: 'relative',
              padding: '0.3rem 0'
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            onClick={() => handleCategoryNav('all')}
            style={({ isActive }) => ({
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--accent-gold-dark)' : 'var(--text-primary)',
              padding: '0.3rem 0'
            })}
          >
            Shop All
          </NavLink>

          <div className="dropdown">
            <button
              className="dropdown-toggle"
              type="button"
              id="collectionsMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: 'var(--text-primary)',
                padding: '0.3rem 0'
              }}
            >
              Collections
            </button>
            <ul
              className="dropdown-menu shadow-sm"
              aria-labelledby="collectionsMenu"
              style={{
                borderRadius: '4px',
                border: '1px solid var(--border-color)',
                padding: '0.75rem 0',
                backgroundColor: 'var(--bg-card)'
              }}
            >
              <li>
                <Link
                  className="dropdown-item py-2"
                  to="/shop"
                  onClick={() => handleCategoryNav('rings')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Rings
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-2"
                  to="/shop"
                  onClick={() => handleCategoryNav('necklaces')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Necklaces
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-2"
                  to="/shop"
                  onClick={() => handleCategoryNav('earrings')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Earrings
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-2"
                  to="/shop"
                  onClick={() => handleCategoryNav('bracelets')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Bracelets
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-2"
                  to="/shop"
                  onClick={() => handleCategoryNav('sets')}
                  style={{ fontSize: '0.85rem' }}
                >
                  Jewellery Sets
                </Link>
              </li>
            </ul>
          </div>

          <NavLink
            to="/about"
            style={({ isActive }) => ({
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--accent-gold-dark)' : 'var(--text-primary)',
              padding: '0.3rem 0'
            })}
          >
            About Us
          </NavLink>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Search Products"
            aria-label="Search"
          >
            <FaSearch />
          </button>

          <Link
            to="/login"
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Account / Sign In"
            aria-label="Account"
          >
            <FaUser />
          </Link>

          <Link
            to="/wishlist"
            style={{
              position: 'relative',
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Saved Items"
            aria-label="Wishlist"
          >
            <FaHeart />
            {wishlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: 'var(--accent-gold-dark)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            style={{
              position: 'relative',
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Shopping Bag"
            aria-label="Cart"
          >
            <FaShoppingBag />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-10px',
                  backgroundColor: 'var(--text-primary)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {searchOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1rem 1.5rem',
            animation: 'fadeInToast 0.2s ease-in-out'
          }}
        >
          <form
            onSubmit={handleSearchSubmit}
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search jewellery by name, category, or style (e.g. Ring, Pearl, Choker, Earrings)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                fontSize: '0.9rem',
                padding: '0.65rem 1rem'
              }}
              autoFocus
            />
            <button type="submit" className="btn-aura-primary" style={{ padding: '0.65rem 1.4rem' }}>
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}

      {mobileMenuOpen && (
        <div
          className="d-lg-none"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => handleCategoryNav('all')}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}
          >
            All Collections
          </Link>
          <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <Link to="/shop" onClick={() => handleCategoryNav('rings')} style={{ color: 'var(--text-secondary)' }}>
              &bull; Rings
            </Link>
            <Link to="/shop" onClick={() => handleCategoryNav('necklaces')} style={{ color: 'var(--text-secondary)' }}>
              &bull; Necklaces
            </Link>
            <Link to="/shop" onClick={() => handleCategoryNav('earrings')} style={{ color: 'var(--text-secondary)' }}>
              &bull; Earrings
            </Link>
            <Link to="/shop" onClick={() => handleCategoryNav('bracelets')} style={{ color: 'var(--text-secondary)' }}>
              &bull; Bracelets
            </Link>
            <Link to="/shop" onClick={() => handleCategoryNav('sets')} style={{ color: 'var(--text-secondary)' }}>
              &bull; Sets
            </Link>
          </div>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}
          >
            About Us
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)'
            }}
          >
            Sign In / Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
