import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import { categories } from '../data/products';
import { FaArrowRight } from 'react-icons/fa';

const CategorySection = () => {
  const { setSelectedCategory, setSearchQuery } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleCategoryClick = (catSlug) => {
    setSelectedCategory(catSlug.toLowerCase());
    setSearchQuery('');
    navigate(`/shop?category=${catSlug.toLowerCase()}`);
  };

  const displayCategories = categories.filter((cat) => cat.id !== 'all');

  return (
    <section style={{ padding: '5.5rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header">
          <span className="section-subtitle">Curated Collections</span>
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-description">
            Explore our curated selection of rings, necklaces, earrings, bracelets, and matching sets.
          </p>
        </div>

        <div className="row g-4">
          {displayCategories.map((cat, idx) => {
            const colClass = idx < 2 ? 'col-lg-6 col-md-6' : 'col-lg-4 col-md-6';
            return (
              <div className={colClass} key={cat.id}>
                <div
                  className="category-card"
                  onClick={() => handleCategoryClick(cat.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <div className="category-overlay">
                    <span className="category-count">Collection</span>
                    <h3 className="category-title">{cat.name}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.86rem', marginBottom: '0.85rem' }}>
                      {cat.description}
                    </p>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        color: 'var(--accent-gold-light)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em'
                      }}
                    >
                      Discover Pieces <FaArrowRight style={{ fontSize: '0.72rem' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
