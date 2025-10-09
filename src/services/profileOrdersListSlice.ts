import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';
import { fetchOrderBurger } from './orderSlice';

interface profileOrdersState {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: profileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fecthProfileOrders = createAsyncThunk(
  'get/profileOrders',
  async () => getOrdersApi()
);

const profileOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrdersState: (state) => state,
    getProfileOrders: (state) => state.orders
  },
  extraReducers: (build) => {
    build
      .addCase(fetchOrderBurger.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fecthProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(fecthProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const { getProfileOrdersState, getProfileOrders } =
  profileOrdersSlice.selectors;
export default profileOrdersSlice;
