import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

export const fetchCategories = createAsyncThunk("api/categories", async () => {
  try {
    const response = await axiosClient.get("/categories?populate=images");
    return await response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        categories: [],
    },
     reducers:  {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
           
            state.categories = action.payload;
        })
    },
   
});

export default categorySlice.reducer;
