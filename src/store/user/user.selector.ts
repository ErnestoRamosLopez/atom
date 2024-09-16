import { createSelector } from "@reduxjs/toolkit";
import { UserState } from "./user.reducer";

const selectUserReducer = (state: any): UserState => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
);

export const selectIsUserLoggedIn = createSelector(
    [selectCurrentUser],
    (user) => !!user
);