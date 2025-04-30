import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi } from "./authAPI";
import { isAxiosError } from "axios";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const user = await registerApi(userData);
    return user;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const user = await loginApi(userData);
    return user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Logout user
    logoutUser: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //Register User
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        if (isAxiosError(action.error)) {
          state.errorMessage =
            action.error?.response?.data?.error || action.error?.message;
        } else {
          state.errorMessage = action.error?.message;
        }
      })

      //Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error?.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
