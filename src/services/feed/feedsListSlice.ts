import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { fetchFeeds } from './actions';
interface FeedsState {
  feed: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  feed: null,
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsState: (state) => state,
    getFeed: (state) => state.feed
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
        state.feed = action.payload;
      });
  }
});

export const { getFeedsState, getFeed } = feedsSlice.selectors;
export default feedsSlice;
