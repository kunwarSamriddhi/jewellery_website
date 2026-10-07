export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      const addQty = action.payload.qty || 1;

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: Math.min(item.qty + addQty, item.inStock || 10) }
              : item
          )
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: addQty }]
      };
    }

    case "REMOVE_FROM_CART": {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id)
      };
    }

    case "UPDATE_CART_QTY": {
      const { id, qty } = action.payload;
      const parsedQty = Math.max(1, parseInt(qty, 10) || 1);
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, qty: parsedQty } : item
        )
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cart: []
      };
    }

    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.some((item) => item.id === action.payload.id);
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((item) => item.id !== action.payload.id)
          : [...state.wishlist, action.payload]
      };
    }

    case "SET_SEARCH_QUERY": {
      return {
        ...state,
        searchQuery: action.payload
      };
    }

    case "SET_SELECTED_CATEGORY": {
      return {
        ...state,
        selectedCategory: action.payload
      };
    }

    case "SET_SORT_BY": {
      return {
        ...state,
        sortBy: action.payload
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
