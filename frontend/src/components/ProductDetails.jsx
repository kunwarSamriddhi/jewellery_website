import React, { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import ProductCard from './ProductCard';
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingBag,
  FaShieldAlt,
  FaShippingFast,
  FaUndoAlt,
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
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Piece Not Found</h2>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '2rem', fontSize: '0.85rem' }}>
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}
          >
            <FaArrowLeft /> Back
          </button>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <Link to="/shop" style={{ color: 'var(--text-secondary)' }}>Shop</Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.title}</span>
        </div>

        <div className="row g-5 mb-5">
          <div className="col-lg-6">
            <div
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-card)',
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
                  objectFit: 'cover'
                }}
              />
              <button
                type="button"
                className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                style={{ top: '1.25rem', right: '1.25rem', width: '42px', height: '42px', fontSize: '1.1rem' }}
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                {isFavorited ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>

          <div className="col-lg-6">
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
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
                fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                fontFamily: 'var(--font-serif)',
                marginBottom: '1rem',
                lineHeight: 1.2
              }}
            >
              {product.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    style={{
                      fontSize: '0.9rem',
                      opacity: i < Math.floor(product.rating || 5) ? 1 : 0.3
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {product.rating || 4.8} &bull; {product.reviewsCount || 25} Verified Reviews
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="badge-gold">In Stock</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {product.description}
            </p>

            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '4px',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)'
              }}
            >
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.8rem', fontWeight: 600 }}>
                Product Specifications
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.88rem' }}>
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
                    <strong style={{ color: 'var(--text-primary)' }}>Care: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>{product.care}</span>
                  </div>
                )}
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>Package Contains: </strong>
                  <span style={{ color: 'var(--text-secondary)' }}>1 Unit in AURA Packaging Box</span>
                </div>
              </div>
            </div>

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
                  style={{ padding: '0.75rem 1rem', fontSize: '1rem', color: 'var(--text-primary)' }}
                >
                  -
                </button>
                <span style={{ padding: '0.75rem 1.25rem', fontWeight: 600, fontSize: '0.95rem' }}>
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(Math.min(product.inStock || 10, qty + 1))}
                  style={{ padding: '0.75rem 1rem', fontSize: '1rem', color: 'var(--text-primary)' }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn-aura-primary"
                onClick={handleAddToCart}
                style={{ flex: 1, minWidth: '200px', padding: '0.9rem 1.5rem' }}
              >
                <FaShoppingBag /> Add to Shopping Bag
              </button>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <FaShippingFast style={{ color: 'var(--accent-gold-dark)' }} />
                <span>Payment Method: Cash on Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <FaShieldAlt style={{ color: 'var(--accent-gold-dark)' }} />
                <span>Delivered in protective AURA jewellery packaging</span>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
            <div className="section-header">
              <span className="section-subtitle">More To Love</span>
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
