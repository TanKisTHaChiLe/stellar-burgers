import { orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

type TNewOrderResponse = {
  order: TOrder;
  name: string;
};

interface IOrderState {
  orderRequest: boolean;
  orderModalData: TNewOrderResponse | null;
  error: string | null;
}

const initialState: IOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const fetchOrderBurger = createAsyncThunk(
  'order/post',
  async (data: string[]) => orderBurgerApi(data)
);

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
      });
  }
});

export const { getOrderState } = orderSlice.selectors;
export const { clearModalData } = orderSlice.actions;
export default orderSlice;
