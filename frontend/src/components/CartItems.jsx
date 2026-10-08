import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import ShopContext from '../context/ShopContext';
import {
  FaTrashAlt,
  FaArrowRight,
  FaShoppingBag,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';

const CartItems = ({ showAlert }) => {
  const {
    state: { cart },
    removeFromCart,
    updateCartQty,
    clearCart,
    cartSubtotal,
    cartTotal
  } = useContext(ShopContext);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pinCode: ''
  });

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const finalTotal = cartTotal;

  const handleProceedToCheckout = () => {
    setShowAddressModal(true);
  };

  const handleFinalOrderSubmit = (e) => {
    e.preventDefault();
    setIsCheckingOut(true);

    setTimeout(() => {
      setIsCheckingOut(false);
      setShowAddressModal(false);
      setOrderComplete(true);
      clearCart();
    }, 800);
  };

  if (orderComplete) {
    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-card)',
            padding: '3.5rem 2.5rem',
            borderRadius: '3px',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-light)',
              color: 'var(--accent-gold-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FaCheckCircle />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>Order Placed Successfully</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
            Thank you for shopping with AURA. Your order has been placed with <strong>Cash on Delivery</strong>.
          </p>
          <div
            style={{
              backgroundColor: 'var(--bg-secondary)',
              padding: '0.8rem 1.2rem',
              borderRadius: '3px',
              fontSize: '0.88rem',
              display: 'inline-block',
              marginBottom: '1.8rem',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)'
            }}
          >
            Payment Method: <strong>Cash on Delivery</strong>
          </div>
          <br />
          <span className="badge-dark" style={{ marginBottom: '2rem', display: 'inline-block' }}>
            Order Reference: #AURA-{Math.floor(100000 + Math.random() * 900000)}
          </span>
          <br />
          <Link to="/shop" className="btn-aura-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ padding: '6rem 1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              color: 'var(--text-muted)',
              margin: '0 auto 1.5rem auto'
            }}
          >
            <FaShoppingBag />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>Your Shopping Bag is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Explore our curated collections of rings, necklaces, earrings, bracelets, and sets to begin.
          </p>
          <Link to="/shop" className="btn-aura-primary">
            Explore Collections <FaArrowRight style={{ fontSize: '0.75rem' }} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 1.5rem 6rem 1.5rem', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem', maxWidth: '100%' }}>
          <span className="section-subtitle">Your Selection</span>
          <h1 className="section-title">Shopping Bag ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            padding: '1rem 1.5rem',
            borderRadius: '3px',
            marginBottom: '2.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <FaMoneyBillWave style={{ color: 'var(--accent-gold-dark)', fontSize: '1.1rem' }} />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            Payment Method: <strong>Cash on Delivery</strong> (Pay in cash when your order arrives)
          </span>
        </div>

        <div className="row g-5">
          <div className="col-lg-8">
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '3px',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}
            >
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1.5rem',
                    borderBottom: index < cart.length - 1 ? '1px solid var(--border-color-light)' : 'none',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    alignItems: 'center'
                  }}
                >
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: '85px',
                        height: '85px',
                        objectFit: 'cover',
                        borderRadius: '2px',
                        border: '1px solid var(--border-color-light)'
                      }}
                    />
                  </Link>

                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--accent-gold-dark)', letterSpacing: '0.08em', fontWeight: 600 }}>
                      {item.categoryLabel || item.category}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', marginBottom: '0.3rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      <Link to={`/product/${item.id}`}>{item.title}</Link>
                    </h3>
                    {item.material && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                        {item.material}
                      </div>
                    )}
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      ₹{item.price.toLocaleString('en-IN')} each
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)',
                      borderRadius: '2px'
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, (item.qty || 1) - 1)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span style={{ padding: '0.4rem 0.8rem', fontWeight: 600, fontSize: '0.9rem' }}>
                      {item.qty || 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQty(item.id, (item.qty || 1) + 1)}
                      style={{ padding: '0.4rem 0.75rem', fontSize: '0.9rem', color: 'var(--text-primary)' }}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '90px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                      ₹{(item.price * (item.qty || 1)).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      removeFromCart(item);
                      if (showAlert) showAlert('success', `Removed "${item.title}" from bag.`);
                    }}
                    style={{
                      color: 'var(--text-muted)',
                      padding: '0.5rem',
                      fontSize: '0.9rem',
                      transition: 'var(--transition-smooth)'
                    }}
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/shop" className="btn-aura-outline" style={{ fontSize: '0.8rem' }}>
                &larr; Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
              >
                Clear Bag
              </button>
            </div>
          </div>

          <div className="col-lg-4">
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                borderRadius: '3px',
                border: '1px solid var(--border-color)',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color-light)', paddingBottom: '0.8rem', fontFamily: 'var(--font-serif)' }}>
                Order Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                </div>

                <div
                  style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}
                >
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  padding: '0.75rem 1rem',
                  borderRadius: '3px',
                  marginBottom: '1.5rem',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <FaInfoCircle style={{ color: 'var(--accent-gold-dark)' }} />
                <span>Payment Method: <strong>Cash on Delivery</strong></span>
              </div>

              <button
                type="button"
                className="btn-aura-primary"
                onClick={handleProceedToCheckout}
                style={{ width: '100%', padding: '0.95rem 1rem', fontSize: '0.85rem' }}
              >
                Proceed to Checkout
              </button>

              <div
                style={{
                  marginTop: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem'
                }}
              >
                <FaShieldAlt /> Simple &amp; Easy Order Placement
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showAddressModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(22, 21, 19, 0.65)',
              backdropFilter: 'blur(4px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem 2rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', margin: 0, fontFamily: 'var(--font-serif)' }}>
                  Delivery Address (Cash on Delivery)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  style={{ fontSize: '1.25rem', color: 'var(--text-muted)', padding: '0.2rem' }}
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleFinalOrderSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      name="fullName"
                      value={addressForm.fullName}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. Priya Sharma"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="+91 98765 43210"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={addressForm.email}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="priya@example.com"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Flat / House No. / Building Name / Street Address *</label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={addressForm.address}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. Flat 402, Lotus Residency, MG Road"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>Area / Locality *</label>
                    <input
                      type="text"
                      required
                      name="locality"
                      value={addressForm.locality}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. Indiranagar"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>City *</label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. Bengaluru"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>State *</label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. Karnataka"
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: 600 }}>PIN Code *</label>
                    <input
                      type="text"
                      required
                      name="pinCode"
                      value={addressForm.pinCode}
                      onChange={handleAddressChange}
                      className="form-control"
                      placeholder="e.g. 560038"
                      maxLength={6}
                      style={{ fontSize: '0.88rem' }}
                    />
                  </div>

                  <div className="col-12 mt-2">
                    <div
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        padding: '0.85rem 1rem',
                        borderRadius: '3px',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem'
                      }}
                    >
                      <FaMoneyBillWave style={{ color: 'var(--accent-gold-dark)' }} />
                      <span>Payment Method: <strong>Cash on Delivery</strong> (Pay cash at delivery)</span>
                    </div>
                  </div>

                  <div className="col-12 mt-3">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 700,
                        fontSize: '1.15rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <span>Payable Amount:</span>
                      <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      type="submit"
                      className="btn-aura-primary"
                      disabled={isCheckingOut}
                      style={{ width: '100%', padding: '0.85rem' }}
                    >
                      {isCheckingOut ? 'Placing Order...' : 'Confirm Order (Cash on Delivery)'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItems;
