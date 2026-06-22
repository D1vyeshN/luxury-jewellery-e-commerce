import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
