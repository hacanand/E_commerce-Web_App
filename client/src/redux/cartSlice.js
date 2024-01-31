import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload.attributes;
      const curItem = product
        ? {
            key: product.key,
            title: product.title,
            price: product.price,
            image: product.images.data.attributes.url,
          }
        : action.payload;

      const index = state.cart.findIndex((item) => item.key === curItem.key);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        state.cart.push({ ...curItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const curKey = action.payload?.attributes?.key || action.payload.key;
      const index = state.cart.findIndex((item) => item.key === curKey);
      if (index === -1) {
        return;
      }
      if (state.cart[index].quantity === 1) {
        state.cart = state.cart.filter((item) => item.key !== curKey);
      } else {
        state.cart[index].quantity -= 1;
      }
    },
    resetCart: (state) => {
      state.cart = [];
    },
    makeItemZero: (state,action) => {
      state.cart=state.cart.filter((item)=>item.key!==action.payload.key)
    }
  },
});
export const { addToCart, removeFromCart ,resetCart,makeItemZero} = cartSlice.actions;
export default cartSlice.reducer;
