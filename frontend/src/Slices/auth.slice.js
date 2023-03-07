import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../Services/auth.service";

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))?.user || null,
  isLoggedin: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(data, "dataaaaaaaaa");
      let response = await auth.register(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      let response = await auth.login(data);
      // console.log(response, "response: " );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (data, thunkAPI) => {
    const response = await auth.logout(data);
    return response.data;
  }
);




export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        console.log(payload, "REDUCE PAY");
        state.isLoggedin = true;
        state.user = payload?.user;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        // console.log(payload, "REGISTER PAY");
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
