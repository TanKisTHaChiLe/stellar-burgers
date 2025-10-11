import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const fecthProfileOrders = createAsyncThunk(
  'get/profileOrders',
  async () => getOrdersApi()
);
