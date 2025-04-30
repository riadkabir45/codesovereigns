import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addQuantity,
  addToCarts,
  getCartItems,
  removeQuantity,
} from "./cartAPI";

const initialState = {
  value: {
    id: "",
    userId: "",
    status: "UNPAID",
    total: 0,
    createdAt: "",
    updatedAt: "",
    cart: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await getCartItems(userId);
  return response;
});

export const postToCart = createAsyncThunk("cart/postToCart", async (item) => {
  const response = await addToCarts(item);
  return response;
});

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (cartId, updateType) => {
    const response =
      updateType === "add"
        ? await addQuantity(cartId)
        : await removeQuantity(cartId);
    return response;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })
      // Add item to cart
      .addCase(postToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(postToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.quantity === 1) {
          state.value.cart.push(action.payload);
        } else {
          state.value.cart = state.value.cart.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          });
        }
        state.value.total = state.value.cart.reduce(
          (total, item) => total + item.price,
          0
        );
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(postToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      })

      // Add cart quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value.cart = state.value.cart.map((item) => {
          if (item.id === action.payload.updatedCartItem.id) {
            return action.payload.updatedCartItem;
          }
          return item;
        });
        state.value = {
          ...state.value,
          ...action.payload.updatedOrder,
        };
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error.message;
      });
  },
});

export default cartSlice.reducer;
