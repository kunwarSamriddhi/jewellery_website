import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

const Wishlist = ({ showAlert }) => {
  const { state: { wishlist } } = useContext(ShopContext);

  if (wishlist.length === 0) {
    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.75rem',
              color: 'var(--text-muted)',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FaHeart />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Curate your private gallery of dream pieces by clicking the heart icon on any creation.
          </p>
          <Link to="/shop" className="btn-aura-primary">
            Explore Collections <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '3rem', maxWidth: '100%' }}>
          <span className="section-subtitle">Private Curation</span>
          <h1 className="section-title">Saved Creations ({wishlist.length})</h1>
        </div>

        <div className="row g-4">
          {wishlist.map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <ProductCard product={product} showAlert={showAlert} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
