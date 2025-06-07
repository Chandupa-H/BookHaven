import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { book: id, quantity: n }
  },
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
    },
    resetCart(state) {
      state.items = [];
    },
  },
});

export const { setCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
