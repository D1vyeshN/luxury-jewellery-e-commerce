import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { WishlistItem, Product } from '../types';

interface WishlistState {
  items: WishlistItem[];
  isOpen: boolean;
}

const initialState: WishlistState = {
  items: [],
  isOpen: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(item => item.productId === action.payload.id);
      if (!exists) {
        state.items.push({
          id: `wl-${action.payload.id}-${Date.now()}`,
          productId: action.payload.id,
          product: action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen;
    },
    openWishlist: (state) => { state.isOpen = true; },
    closeWishlist: (state) => { state.isOpen = false; },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, openWishlist, closeWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

export const selectWishlistItems = (state: { wishlist: WishlistState }) => state.wishlist.items;
export const selectWishlistOpen = (state: { wishlist: WishlistState }) => state.wishlist.isOpen;
export const selectIsWishlisted = (productId: string) => (state: { wishlist: WishlistState }) =>
  state.wishlist.items.some(item => item.productId === productId);
