import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Product } from "../../types/Product";

interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedSize: string;

}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.items.push(action.payload)
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(
                (item) => item.product._id === action.payload
            )
            if (item) {
                item.quantity += 1
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.items.find(
                (item) => item.product._id === action.payload
            )
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.product._id !== action.payload
            );
        },
  clearCart: (state) => {
      state.items = [];
    },

    },

});

export const { addToCart, increaseQuantity, decreaseQuantity, 
    removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;