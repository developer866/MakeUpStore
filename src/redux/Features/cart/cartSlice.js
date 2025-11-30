// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.products.find(p => p.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeFromCart: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        state.total -= product.price * product.quantity;
        state.products = state.products.filter(p => p.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.products = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;