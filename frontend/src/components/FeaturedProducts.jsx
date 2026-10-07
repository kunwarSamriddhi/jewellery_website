import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { FaArrowRight } from 'react-icons/fa';

const FeaturedProducts = ({ showAlert }) => {
  const { state: { products } } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('featured');

  const displayedProducts = activeTab === 'featured'
    ? products.filter((p) => p.isFeatured)
    : products.filter((p) => p.isNewArrival);

  return (
    <section style={{ padding: '6rem 1.5rem', backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Artisanal Mastery</span>
          <h2 className="section-title">Iconic Creations</h2>
          <p className="section-description">
            Each piece is meticulously shaped by master bench jewellers with extraordinary attention to detail.
          </p>

          <div
            style={{
              display: 'inline-flex',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-primary)',
              padding: '0.35rem',
              borderRadius: '30px',
              border: '1px solid var(--border-color)',
              marginTop: '1.5rem'
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('featured')}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '25px',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: activeTab === 'featured' ? 'var(--text-primary)' : 'transparent',
                color: activeTab === 'featured' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              Featured Pieces
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              style={{
                padding: '0.5rem 1.4rem',
                borderRadius: '25px',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                backgroundColor: activeTab === 'new' ? 'var(--text-primary)' : 'transparent',
                color: activeTab === 'new' ? '#FFFFFF' : 'var(--text-secondary)'
              }}
            >
              New Arrivals
            </button>
          </div>
        </div>

        <div className="row g-4">
          {displayedProducts.slice(0, 4).map((product) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
              <ProductCard product={product} showAlert={showAlert} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/shop" className="btn-aura-outline">
            View Complete Collection <FaArrowRight style={{ fontSize: '0.8rem' }} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
