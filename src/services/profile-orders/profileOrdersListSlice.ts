import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fecthProfileOrders } from './actions';

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
      .addCase(fecthProfileOrders.pending, (state) => {
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
