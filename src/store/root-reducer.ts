import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/cart.reducer";
import { userReducer } from "./user/user.reducer";
import { preferencesReducer } from "./preferences/preferences.reducer";
import { loginReducer } from "./login/login.reducer";
import { Action, createAction, withMatcher } from "../utils/reducer/reducer.utils";

export enum ROOT_ACTION_TYPES {
    RESET_STATE = 'root/RESET_STATE',
}

export type ResetState = Action<
    ROOT_ACTION_TYPES.RESET_STATE
>;

export const resetState = withMatcher((): ResetState =>
  createAction(ROOT_ACTION_TYPES.RESET_STATE)
);

export const rootReducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    preferences: preferencesReducer,
    login: loginReducer
});