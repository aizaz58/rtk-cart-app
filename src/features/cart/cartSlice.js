import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async() => {
  const resp=await fetch(url)
    return(resp.json())
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    clearItem: (state, { payload }) => {
      const id = payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
        state.amount = amount;
        state.total = total;
      });
    },
  },
  extraReducers:{
      [getCartItems.pending]:(state)=>{
          state.isLoading=true
      },
      [getCartItems.fulfilled]:(state,action)=>{
          state.isLoading=false
          state.cartItems=action.payload
          
      },
      [getCartItems.rejected]:(state)=>{
          state.isLoading=false
      }
  }
});
export const { clearCart, clearItem, increase, decrease, calculateTotal } =
  cartSlice.actions;
export default cartSlice.reducer;
