import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar, FaShoppingBag } from 'react-icons/fa';
import ShopContext from '../context/ShopContext';

const ProductCard = ({ product, showAlert }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useContext(ShopContext);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    if (showAlert) {
      showAlert('success', `Added "${product.title}" to your cart`);
    }
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (showAlert) {
      showAlert('success', isFavorited ? `Removed from wishlist` : `Saved to wishlist`);
    }
  };

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.img}
            alt={product.title}
            className="product-card-img"
            loading="lazy"
          />
        </Link>

        <div className="product-badges">
          {product.isNewArrival && <span className="badge-gold">New</span>}
          {product.originalPrice && <span className="badge-dark">Sale</span>}
        </div>

        <button
          type="button"
          className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleToggleWishlist}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          aria-label="Wishlist"
        >
          {isFavorited ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <div className="product-card-body">
        <span className="product-category-label">{product.categoryLabel || product.category}</span>
        
        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.6rem' }}>
          <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                style={{
                  fontSize: '0.75rem',
                  opacity: i < Math.floor(product.rating || 5) ? 1 : 0.3
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ({product.reviewsCount || 10})
          </span>
        </div>

        <div className="product-price-row">
          <span className="product-current-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="product-original-price">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className="btn-aura-primary"
            onClick={handleAddToCart}
          >
            <FaShoppingBag style={{ fontSize: '0.85rem' }} /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
