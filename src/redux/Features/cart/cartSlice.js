import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage when app starts
const savedCart = JSON.parse(localStorage.getItem("cart")) || {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalItems += 1;
      state.totalPrice += action.payload.price;

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);

      if (item) {
        state.totalItems -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
      }

      state.items = state.items.filter(i => i.id !== action.payload);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);

      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
        state.totalPrice += item.price;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        state.totalPrice -= item.price;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      localStorage.setItem("cart", JSON.stringify(state));
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
