import React, { useContext, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { FaSearch, FaTimes, FaSlidersH } from 'react-icons/fa';

const Shop = ({ showAlert }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const jewelleryTypeFromUrl = searchParams.get('jewelleryType');

  const {
    state: { products, selectedCategory, searchQuery, sortBy },
    setSelectedCategory,
    setSearchQuery,
    setSortBy
  } = useContext(ShopContext);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl.toLowerCase());
    } else {
      setSelectedCategory('all');
    }
  }, [categoryFromUrl, setSelectedCategory]);

  const handleCategoryChange = (slug) => {
    const normalized = slug.toLowerCase();
    setSelectedCategory(normalized);
    const newParams = new URLSearchParams(searchParams);
    
    if (normalized === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', normalized);
    }
    
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (jewelleryTypeFromUrl) {
      const targetType = jewelleryTypeFromUrl.toLowerCase().trim();
      result = result.filter(
        (p) => p.jewelleryType && p.jewelleryType.toLowerCase().trim() === targetType
      );
    }

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
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.jewelleryType && p.jewelleryType.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, jewelleryTypeFromUrl, searchQuery, sortBy]);

  const activeCategoryObj =
    categories.find(
      (c) => c.slug.toLowerCase() === (selectedCategory || 'all').toLowerCase()
    ) || categories[0];

  const getPageTitle = () => {
    const catName = activeCategoryObj.slug !== 'all' ? activeCategoryObj.name : '';
    if (jewelleryTypeFromUrl === 'artificial') {
      return catName ? `Artificial Jewellery — ${catName}` : 'Artificial Jewellery Collection';
    }
    if (jewelleryTypeFromUrl === 'precious') {
      return catName ? `Precious Jewellery — ${catName}` : 'Precious Jewellery Collection';
    }
    return catName ? activeCategoryObj.name : 'All Collections';
  };

  const getPageSubtitle = () => {
    if (jewelleryTypeFromUrl === 'artificial') {
      return 'Fashion & Everyday Jewellery';
    }
    if (jewelleryTypeFromUrl === 'precious') {
      return 'Fine Gold, Silver & Gemstone Jewellery';
    }
    return 'Jewellery Collections';
  };

  return (
    <div style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">{getPageSubtitle()}</span>
          <h1 className="section-title">{getPageTitle()}</h1>
          <p className="section-description">
            {jewelleryTypeFromUrl === 'artificial'
              ? 'Contemporary fashion jewellery pieces crafted for versatile daily styling and layering.'
              : jewelleryTypeFromUrl === 'precious'
              ? 'Authentic fine jewellery pieces featuring solid gold, sterling silver, diamonds, and natural pearls.'
              : activeCategoryObj.description || 'Explore our complete suite of jewellery pieces.'}
          </p>
        </div>

        {/* Filters & Controls Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.25rem 1.5rem',
            borderRadius: '3px',
            border: '1px solid var(--border-color)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
            {categories.map((cat) => {
              const isSelected =
                (selectedCategory || 'all').toLowerCase() === cat.slug.toLowerCase();
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.slug)}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
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

          {/* Search & Sort */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', width: '230px' }}>
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
                  aria-label="Clear search"
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
                    fontSize: '0.78rem'
                  }}
                />
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FaSlidersH style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.45rem 0.85rem',
                  fontSize: '0.82rem',
                  borderRadius: '2px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="default">Featured / Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredProducts.length}</strong> items
            {jewelleryTypeFromUrl && (
              <span> in <strong>{jewelleryTypeFromUrl === 'artificial' ? 'Artificial' : 'Precious'} Jewellery</strong></span>
            )}
          </span>
          {(selectedCategory !== 'all' || searchQuery || jewelleryTypeFromUrl) && (
            <button
              type="button"
              onClick={handleResetFilters}
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

        {/* Product Grid */}
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
              borderRadius: '3px'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>
              No Jewellery Found
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              We could not find any items matching your selected criteria.
            </p>
            <button
              type="button"
              className="btn-aura-primary"
              onClick={handleResetFilters}
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
