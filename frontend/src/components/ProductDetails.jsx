import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import {
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaShieldAlt,
  FaMoneyBillWave,
  FaArrowLeft
} from 'react-icons/fa';

const ProductDetails = ({ showAlert }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    state: { products },
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useContext(ShopContext);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Piece Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The requested jewellery creation may have been archived or removed from the catalog.
        </p>
        <Link to="/shop" className="btn-aura-primary">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    if (showAlert) {
      showAlert('success', `Added ${qty} × "${product.title}" to your shopping bag.`);
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (showAlert) {
      showAlert('success', isFavorited ? 'Removed from wishlist' : 'Saved to wishlist');
    }
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ padding: '3rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2.5rem', fontSize: '0.84rem' }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}
          >
            <FaArrowLeft style={{ fontSize: '0.75rem' }} /> Back
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to={`/shop?category=${product.category}`} style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>
            {product.categoryLabel || product.category}
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.title}</span>
        </div>

        <div className="row g-5 mb-5 align-items-start">
          {/* Left Column: Image Showcase */}
          <div className="col-lg-6">
            <div
              style={{
                position: 'relative',
                borderRadius: '3px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img
                src={product.img}
                alt={product.title}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <button
                type="button"
                className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                style={{ top: '1.25rem', right: '1.25rem', width: '40px', height: '40px', fontSize: '1.05rem' }}
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
              >
                {isFavorited ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="col-lg-6">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold-dark)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              {product.categoryLabel || product.category}
            </span>

            <h1
              style={{
                fontSize: 'clamp(1.85rem, 3.2vw, 2.5rem)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1rem',
                lineHeight: 1.2,
                fontWeight: 500
              }}
            >
              {product.title}
            </h1>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.description}
            </p>

            {/* Product Specifications */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '3px',
                padding: '1.4rem 1.6rem',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
                Product Specifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem', fontSize: '0.88rem' }}>
                {product.material && (
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Material: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Dimensions: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{product.dimensions}</span>
                  </div>
                )}
                {product.care && (
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>Care Instructions: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{product.care}</span>
                  </div>
                )}
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Package Contains: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>1 Unit in AURA Packaging Box</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Bag */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--border-color)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '2px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  style={{ padding: '0.75rem 1.1rem', fontSize: '1rem', color: 'var(--text-primary)' }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ padding: '0.75rem 1.25rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(product.inStock || 10, qty + 1))}
                  style={{ padding: '0.75rem 1.1rem', fontSize: '1rem', color: 'var(--text-primary)' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn-aura-primary"
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '220px', padding: '0.95rem 1.6rem', fontSize: '0.85rem' }}
              >
                <FaShoppingBag /> Add to Shopping Bag
              </button>
            </div>

            {/* Assurances / Details */}
            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <FaMoneyBillWave style={{ color: 'var(--accent-gold-dark)' }} />
                <span>Payment Method: Cash on Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <FaShieldAlt style={{ color: 'var(--accent-gold-dark)' }} />
                <span>Delivered in protective AURA jewellery packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Complementary Styling</span>
              <h2 className="section-title">You May Also Like</h2>
            </div>
            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div className="col-lg-3 col-md-6 col-sm-6" key={p.id}>
                  <ProductCard product={p} showAlert={showAlert} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
