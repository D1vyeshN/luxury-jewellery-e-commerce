import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types';
import { authUtils, type AuthUser } from '../utils/auth';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
}

// Initialize user from localStorage
const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const authUser = authUtils.getUser();
    if (authUser) {
      return {
        id: authUser.id,
        name: authUser.name,
        email: authUser.email,
      };
    }
  }
  return null;
};

const initialState: UserState = {
  user: getInitialUser(),
  isAuthenticated: !!getInitialUser(),
  isLoading: false,
  token: null,
  error: null,
};

// Async thunks
export const loginAsync = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const authUser = authUtils.login(email, password);
      return {
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
        },
        token: 'local-token', // Since we're using localStorage, we don't need a real token
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerAsync = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const authUser = authUtils.register(name, email, password);
      return {
        user: {
          id: authUser.id,
          name: authUser.name,
          email: authUser.email,
        },
        token: 'local-token',
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      authUtils.logout();
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/update',
  async (userData: { name?: string; email?: string; phone?: string }, { rejectWithValue }) => {
    try {
      const currentUser = authUtils.getUser();
      if (!currentUser) {
        throw new Error('No user logged in');
      }

      const updatedUser: AuthUser = {
        ...currentUser,
        ...userData,
      };

      authUtils.setUser(updatedUser);

      return {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
        token: 'local-token',
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Update failed');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update User
      .addCase(updateUserAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectIsLoading = (state: { user: UserState }) => state.user.isLoading;
export const selectError = (state: { user: UserState }) => state.user.error;
