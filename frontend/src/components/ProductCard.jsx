import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaShoppingBag } from 'react-icons/fa';
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
      <Link to={`/product/${product.id}`} className="product-card-img-wrapper">
        <img
          src={product.img}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
        />
      </Link>

      <button
        type="button"
        className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
        onClick={handleToggleWishlist}
        title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist"
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </button>

      <div className="product-card-body">
        <div className="product-meta-row">
          <span className="product-category-label">
            {product.categoryLabel || product.category}
          </span>
        </div>

        <h3 className="product-title">
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h3>

        {product.material && (
          <div className="product-material-label" title={product.material}>
            {product.material}
          </div>
        )}

        <div className="product-price-row">
          <span className="product-current-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="product-card-actions">
          <button
            type="button"
            className="btn-aura-primary"
            onClick={handleAddToCart}
          >
            <FaShoppingBag style={{ fontSize: '0.82rem' }} /> Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
