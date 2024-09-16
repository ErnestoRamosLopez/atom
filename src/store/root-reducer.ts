import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer
});