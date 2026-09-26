import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const {
  toggleWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;