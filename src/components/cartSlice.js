import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    profilesInCart: [],
  },
  reducers: {
    addProfileToCart(state, action) {
      const newProfile =  action.payload;
      const existingProfile = state.profilesInCart.find(profile => profile.id === newProfile.profileId);
      if (!existingProfile){
        state.profilesInCart.push(newProfile);
      } 
    },
    removeProfileFromCart(state, action) {
      const id = action.payload;
      const existingProfile = state.profilesInCart.find(profile => profile.id === id);
      if (existingProfile){
        state.profilesInCart = state.profilesInCart.filter(profile => profile.id !== id);
      } 
    },
  },
});

export const cartActions =  cartSlice.actions;

export default cartSlice.reducer;
