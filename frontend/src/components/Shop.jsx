import React, { useContext, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { FaSearch, FaTimes, FaSlidersH } from 'react-icons/fa';

const Shop = ({ showAlert }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const {
    state: { products, selectedCategory, searchQuery, sortBy },
    setSelectedCategory,
    setSearchQuery,
    setSortBy
  } = useContext(ShopContext);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl.toLowerCase());
    }
  }, [categoryFromUrl, setSelectedCategory]);

  const handleCategoryChange = (slug) => {
    const normalized = slug.toLowerCase();
    setSelectedCategory(normalized);
    if (normalized === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: normalized });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    const activeCat = (selectedCategory || 'all').trim().toLowerCase();
    if (activeCat && activeCat !== 'all') {
      result = result.filter(
        (p) => p.category && p.category.trim().toLowerCase() === activeCat
      );
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const activeCategoryObj =
    categories.find(
      (c) => c.slug.toLowerCase() === (selectedCategory || 'all').toLowerCase()
    ) || categories[0];

  return (
    <div style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">Jewellery Collections</span>
          <h1 className="section-title">
            {selectedCategory === 'all' || !selectedCategory ? 'All Collections' : activeCategoryObj.name}
          </h1>
          <p className="section-description">
            {activeCategoryObj.description || 'Explore our complete suite of jewellery pieces.'}
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.25rem 1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            {categories.map((cat) => {
              const isSelected =
                (selectedCategory || 'all').toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-secondary)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-color)'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '240px' }}>
              <input
                type="text"
                placeholder="Search pieces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.45rem 2rem 0.45rem 0.85rem',
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)'
                }}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <FaTimes />
                </button>
              ) : (
                <FaSearch
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem'
                  }}
                />
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaSlidersH style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.85rem',
                  borderRadius: '2px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="default">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredProducts.length}</strong> items
          </span>
          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
              style={{
                fontSize: '0.82rem',
                color: 'var(--accent-gold-dark)',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {filteredProducts.length > 0 ? (
          <div className="row g-4">
            {filteredProducts.map((product) => (
              <div className="col-lg-3 col-md-6 col-sm-6" key={product.id}>
                <ProductCard product={product} showAlert={showAlert} />
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 2rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>No Jewellery Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              We could not find any items matching your selected criteria.
            </p>
            <button
              type="button"
              className="btn-aura-primary"
              onClick={() => {
                handleCategoryChange('all');
                setSearchQuery('');
              }}
            >
              View All Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
