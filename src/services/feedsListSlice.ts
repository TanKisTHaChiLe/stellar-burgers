import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

interface FeedsState {
  feeds: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  feeds: null,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('get/feeds', async () =>
  getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload;
      });
  }
});

export const { getFeedsState } = feedsSlice.selectors;
export default feedsSlice;
