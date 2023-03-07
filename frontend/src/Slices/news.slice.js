import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import newsService from "../Services/news.service";

const initialState = {
  newsData: ''
};

export const getNewsUsingThunk = createAsyncThunk(
    "news/getNewsUsingThunk",
    async (data, { rejectWithValue }) => {
      try {
        // console.log(data);
        let response = await newsService.getNews();
        // console.log(response, "response: News");
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);


export const NewsSlice = createSlice({
    name: "news",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
      builder
        .addCase(getNewsUsingThunk.fulfilled, (state, { payload }) => {
            const news = payload.map((article,i) => ({ ...article, id: i }))
            state.newsData = news;
        })
    },
});
  
  // Action creators are generated for each case reducer function
export default NewsSlice.reducer;