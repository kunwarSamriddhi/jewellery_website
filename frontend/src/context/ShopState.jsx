import React, { useReducer, useEffect } from 'react';
import ShopContext from './ShopContext';
import cartReducer from './cartReducer';
import { products as initialProducts, categories } from '../data/products';

const LOCAL_STORAGE_CART_KEY = 'aura_jewellery_cart';
const LOCAL_STORAGE_WISHLIST_KEY = 'aura_jewellery_wishlist';

const loadFromStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.warn(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
};

const ShopState = (props) => {
  const initialState = {
    products: initialProducts,
    categories: categories,
    cart: loadFromStorage(LOCAL_STORAGE_CART_KEY, []),
    wishlist: loadFromStorage(LOCAL_STORAGE_WISHLIST_KEY, []),
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default'
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(state.cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(state.wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [state.wishlist]);

  const cartCount = state.cart.reduce((total, item) => total + (item.qty || 1), 0);
  const wishlistCount = state.wishlist.length;
  const cartSubtotal = state.cart.reduce(
    (total, item) => total + item.price * (item.qty || 1),
    0
  );
  const cartTotal = cartSubtotal;

  const isInWishlist = (productId) => {
    return state.wishlist.some((item) => item.id === productId);
  };

  const isInCart = (productId) => {
    return state.cart.some((item) => item.id === productId);
  };

  const addToCart = (product, qty = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, qty }
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product
    });
  };

  const updateCartQty = (id, qty) => {
    dispatch({
      type: 'UPDATE_CART_QTY',
      payload: { id, qty }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleWishlist = (product) => {
    dispatch({
      type: 'TOGGLE_WISHLIST',
      payload: product
    });
  };

  const setSearchQuery = (query) => {
    dispatch({
      type: 'SET_SEARCH_QUERY',
      payload: query
    });
  };

  const setSelectedCategory = (category) => {
    dispatch({
      type: 'SET_SELECTED_CATEGORY',
      payload: category
    });
  };

  const setSortBy = (sort) => {
    dispatch({
      type: 'SET_SORT_BY',
      payload: sort
    });
  };

  return (
    <ShopContext.Provider
      value={{
        state,
        dispatch,
        cartCount,
        wishlistCount,
        cartSubtotal,
        cartTotal,
        isInWishlist,
        isInCart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        setSearchQuery,
        setSelectedCategory,
        setSortBy
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopState;
