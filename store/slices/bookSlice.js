import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const res = await fetch("../api/getBooks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch books");
  const response = await res.json();
  return response.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default bookSlice.reducer;
