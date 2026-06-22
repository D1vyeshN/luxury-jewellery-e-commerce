import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product, MetalType, RingCustomization } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  couponCode: string;
}

const calculateTotals = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.totalPrice, 0);
};

const initialState: CartState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  discount: 0,
  couponCode: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{
      product: Product;
      selectedMetal?: MetalType;
      selectedSize?: number;
      quantity?: number;
      customization?: RingCustomization;
    }>) => {
      const { product, selectedMetal, selectedSize, quantity = 1, customization } = action.payload;
      const existingIndex = state.items.findIndex(
        item => item.productId === product.id && item.selectedMetal === selectedMetal && item.selectedSize === selectedSize
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
        state.items[existingIndex].totalPrice = state.items[existingIndex].unitPrice * state.items[existingIndex].quantity;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedMetal,
          selectedSize,
          customization,
          unitPrice: product.price,
          totalPrice: product.price * quantity,
        };
        state.items.push(newItem);
      }
      state.subtotal = calculateTotals(state.items);
      state.tax = state.subtotal * 0.08;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.subtotal = calculateTotals(state.items);
      state.tax = state.subtotal * 0.08;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.unitPrice * item.quantity;
      }
      state.subtotal = calculateTotals(state.items);
      state.tax = state.subtotal * 0.08;
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.tax = 0;
      state.discount = 0;
      state.couponCode = '';
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => { state.isOpen = true; },
    closeCart: (state) => { state.isOpen = false; },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, openCart, closeCart, applyCoupon } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) => state.cart.subtotal + state.cart.tax - state.cart.discount;
export const selectCartCount = (state: { cart: CartState }) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartOpen = (state: { cart: CartState }) => state.cart.isOpen;
