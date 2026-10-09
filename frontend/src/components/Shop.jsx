import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import { categories } from '../data/products';
import { FaSearch, FaTimes, FaSlidersH } from 'react-icons/fa';

const VALID_TYPES = ['precious', 'artificial'];
const VALID_CATEGORIES = ['rings', 'necklaces', 'earrings', 'bracelets', 'sets'];

const parseCategoriesParam = (param) => {
  if (!param) return [];
  return param
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => VALID_CATEGORIES.includes(s));
};

const Shop = ({ showAlert }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const jewelleryTypeFromUrl = searchParams.get('jewelleryType');

  const {
    state: { products, searchQuery, sortBy },
    setSelectedCategory,
    setSearchQuery,
    setSortBy
  } = useContext(ShopContext);

  // Single-select for jewellery type (precious OR artificial, or null)
  const selectedType = useMemo(() => {
    if (!jewelleryTypeFromUrl) return null;
    const norm = jewelleryTypeFromUrl.toLowerCase().trim();
    return VALID_TYPES.includes(norm) ? norm : null;
  }, [jewelleryTypeFromUrl]);

  // Multi-select for categories
  const selectedCategories = useMemo(() => {
    return parseCategoriesParam(categoryFromUrl);
  }, [categoryFromUrl]);

  const isAllSelected = !selectedType && selectedCategories.length === 0;

  const handleTypeToggle = (typeSlug) => {
    const norm = typeSlug.toLowerCase();
    const newParams = new URLSearchParams(searchParams);

    // Single-select toggle: if clicked type is already active, deselect it. Otherwise switch to it.
    if (selectedType === norm) {
      newParams.delete('jewelleryType');
    } else {
      newParams.set('jewelleryType', norm);
    }
    setSearchParams(newParams);
  };

  const handleCategoryToggle = (catSlug) => {
    const norm = catSlug.toLowerCase();
    let nextCategories;
    if (selectedCategories.includes(norm)) {
      nextCategories = selectedCategories.filter((c) => c !== norm);
    } else {
      nextCategories = [...selectedCategories, norm];
    }

    const newParams = new URLSearchParams(searchParams);
    if (nextCategories.length > 0) {
      newParams.set('category', nextCategories.join(','));
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  const handleClearCategories = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
    setSearchParams(newParams);
    setSelectedCategory('all');
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('default');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by single-selected Jewellery Type (if any selected)
    if (selectedType) {
      result = result.filter(
        (p) => p.jewelleryType && p.jewelleryType.toLowerCase().trim() === selectedType
      );
    }

    // Filter by multi-selected Categories with OR logic (if any selected)
    if (selectedCategories.length > 0) {
      result = result.filter(
        (p) => p.category && selectedCategories.includes(p.category.toLowerCase().trim())
      );
    }

    // Filter by Search Query
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

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedType, selectedCategories, searchQuery, sortBy]);

  const categoryOptions = useMemo(() => {
    return categories.filter((c) => c.slug !== 'all');
  }, []);

  const getPageTitle = () => {
    const typeLabel =
      selectedType === 'artificial'
        ? 'Artificial Jewellery'
        : selectedType === 'precious'
        ? 'Precious Jewellery'
        : '';

    const categoryLabel =
      selectedCategories.length === 1
        ? selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)
        : selectedCategories.length > 1
        ? selectedCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(' & ')
        : '';

    if (typeLabel && categoryLabel) {
      return `${typeLabel} — ${categoryLabel}`;
    }
    if (typeLabel) {
      return `${typeLabel} Collection`;
    }
    if (categoryLabel) {
      return `${categoryLabel} Collection`;
    }
    return 'All Collections';
  };

  const getPageSubtitle = () => {
    if (selectedType === 'artificial') {
      return 'Fashion & Everyday Jewellery';
    }
    if (selectedType === 'precious') {
      return 'Fine Gold, Silver & Gemstone Jewellery';
    }
    return 'Jewellery Collections';
  };

  const getPageDescription = () => {
    if (selectedType === 'artificial') {
      return 'Contemporary fashion jewellery pieces crafted for versatile daily styling and layering.';
    }
    if (selectedType === 'precious') {
      return 'Authentic fine jewellery pieces featuring solid gold, sterling silver, diamonds, and natural pearls.';
    }
    if (selectedCategories.length === 1) {
      const catObj = categories.find((c) => c.slug === selectedCategories[0]);
      if (catObj && catObj.description) return catObj.description;
    }
    return 'Explore our complete suite of versatile fine and fashion jewellery pieces.';
  };

  return (
    <div style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-subtitle">{getPageSubtitle()}</span>
          <h1 className="section-title">{getPageTitle()}</h1>
          <p className="section-description">{getPageDescription()}</p>
        </div>

        {/* Filters & Controls Toolbar */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.4rem 1.5rem',
            borderRadius: '3px',
            border: '1px solid var(--border-color)',
            marginBottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* Main Controls Wrapper */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1.5rem'
            }}
          >
            {/* Left Column: Two Clearly Labelled Filter Rows */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.1rem',
                flex: '1 1 560px',
                minWidth: 0
              }}
            >
              {/* Row 1: Filter by Jewellery Type */}
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.45rem'
                  }}
                >
                  Filter by Jewellery Type
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                  {/* Precious Jewellery Filter (Single-Select) */}
                  <button
                    type="button"
                    onClick={() => handleTypeToggle('precious')}
                    style={{
                      padding: '0.42rem 1.1rem',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      backgroundColor: selectedType === 'precious'
                        ? 'var(--text-primary)'
                        : 'var(--bg-secondary)',
                      color: selectedType === 'precious' ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: selectedType === 'precious'
                        ? 'var(--text-primary)'
                        : 'var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Precious Jewellery
                  </button>

                  {/* Artificial Jewellery Filter (Single-Select) */}
                  <button
                    type="button"
                    onClick={() => handleTypeToggle('artificial')}
                    style={{
                      padding: '0.42rem 1.1rem',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      backgroundColor: selectedType === 'artificial'
                        ? 'var(--text-primary)'
                        : 'var(--bg-secondary)',
                      color: selectedType === 'artificial' ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: selectedType === 'artificial'
                        ? 'var(--text-primary)'
                        : 'var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Artificial Jewellery
                  </button>
                </div>
              </div>

              {/* Row 2: Filter by Category */}
              <div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text-muted)',
                    marginBottom: '0.45rem'
                  }}
                >
                  Filter by Category
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                  {/* All Categories Button */}
                  <button
                    type="button"
                    onClick={handleClearCategories}
                    style={{
                      padding: '0.42rem 1.1rem',
                      borderRadius: '20px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      backgroundColor: selectedCategories.length === 0
                        ? 'var(--text-primary)'
                        : 'var(--bg-secondary)',
                      color: selectedCategories.length === 0 ? '#FFFFFF' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: selectedCategories.length === 0
                        ? 'var(--text-primary)'
                        : 'var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    All Categories
                  </button>

                  {/* Category Filters: Rings, Necklaces, Earrings, Bracelets, Sets (Multi-Select) */}
                  {categoryOptions.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.slug);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryToggle(cat.slug)}
                        style={{
                          padding: '0.42rem 1.1rem',
                          borderRadius: '20px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          backgroundColor: isSelected ? 'var(--text-primary)' : 'var(--bg-secondary)',
                          color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                          border: '1px solid',
                          borderColor: isSelected ? 'var(--text-primary)' : 'var(--border-color)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Search & Sort Controls */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.85rem',
                alignSelf: 'flex-start',
                paddingTop: '1.2rem'
              }}
            >
              <div style={{ position: 'relative', width: '220px' }}>
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
        </div>

        {/* Results Info Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredProducts.length}</strong> items
            {selectedType && (
              <span> in <strong>{selectedType === 'artificial' ? 'Artificial' : 'Precious'} Jewellery</strong></span>
            )}
            {selectedCategories.length > 0 && (
              <span> ({selectedCategories.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')})</span>
            )}
          </span>
          {(!isAllSelected || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                fontSize: '0.82rem',
                color: 'var(--accent-gold-dark)',
                fontWeight: 600,
                textDecoration: 'underline',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
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



