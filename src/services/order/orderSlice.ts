import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderBurger, fetchOrderByNumber } from './actions';
type TNewOrderResponse = {
  order: TOrder;
  name: string;
};

interface IOrderState {
  orderRequest: boolean;
  orderModalData: TNewOrderResponse | null;
  currentOrder: TOrder | null;
  error: string | null;
}

const initialState: IOrderState = {
  orderRequest: false,
  orderModalData: null,
  currentOrder: null,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.currentOrder = action.payload;
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export const { clearModalData } = orderSlice.actions;
export default orderSlice;
