import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import filterReducer from './filterSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    filter: filterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['cart/addToCart'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
