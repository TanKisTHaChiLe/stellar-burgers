import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';

interface IngredientsListState {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsListState = {
  ingredients: [],
  isLoading: true,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getState: (state) => state,
    isLoadingIngredients: (state) => state.isLoading,
    getIngridients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      });
  }
});

export const { getState, getIngridients, isLoadingIngredients } =
  ingredientsSlice.selectors;
export const reducer = ingredientsSlice.reducer;
export default ingredientsSlice;
