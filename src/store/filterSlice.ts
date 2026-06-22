import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ProductFilter, ProductCategory, MetalType, DiamondShape } from '../types';

const initialState: ProductFilter = {
  categories: [],
  metals: [],
  shapes: [],
  priceMin: 0,
  priceMax: 50000,
  sortBy: 'featured',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleCategory: (state, action: PayloadAction<ProductCategory>) => {
      const idx = state.categories.indexOf(action.payload);
      if (idx >= 0) state.categories.splice(idx, 1);
      else state.categories.push(action.payload);
    },
    toggleMetal: (state, action: PayloadAction<MetalType>) => {
      const idx = state.metals.indexOf(action.payload);
      if (idx >= 0) state.metals.splice(idx, 1);
      else state.metals.push(action.payload);
    },
    toggleShape: (state, action: PayloadAction<DiamondShape>) => {
      const idx = state.shapes.indexOf(action.payload);
      if (idx >= 0) state.shapes.splice(idx, 1);
      else state.shapes.push(action.payload);
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceMin = action.payload.min;
      state.priceMax = action.payload.max;
    },
    setSortBy: (state, action: PayloadAction<ProductFilter['sortBy']>) => {
      state.sortBy = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const { toggleCategory, toggleMetal, toggleShape, setPriceRange, setSortBy, setSearchQuery, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
