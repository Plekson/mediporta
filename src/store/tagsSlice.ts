import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags, Tag } from "../services/api";

interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: string | null;
}

const initialState: TagsState = {
  tags: [],
  loading: false,
  error: null,
};

export const fetchTagsAsync = createAsyncThunk<
  Tag[],
  {
    pageSize: number;
    page: number;
    sortOrder: "asc" | "desc";
    sortBy: "name" | "popular";
  }
>("tags/fetchTags", async ({ pageSize, page, sortOrder, sortBy }) => {
  return fetchTags(pageSize, page, sortOrder, sortBy);
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.tags = action.payload;
      })
      .addCase(fetchTagsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tags";
      });
  },
});

export default tagsSlice.reducer;
