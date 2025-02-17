import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const searchBooks = createAsyncThunk("search/books", async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/get_books`);
    return response.data.books.filter((book) =>
      book.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Kitoblarni yuklashda xatolik.");
  }
});

export const searchAuthors = createAsyncThunk("search/authors", async (query, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/get_authors`);
    return response.data.authors.filter((author) =>
      author.name.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Mualliflarni yuklashda xatolik");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState: {
    books: [],
    authors: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearResults: (state) => {
      state.books = [];
      state.authors = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.loading = false;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAuthors.fulfilled, (state, action) => {
        state.authors = action.payload;
        state.loading = false;
      })
      .addCase(searchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
