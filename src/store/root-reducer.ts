import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";
import { preferencesReducer } from "./preferences/preferences.reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    preferences: preferencesReducer
});