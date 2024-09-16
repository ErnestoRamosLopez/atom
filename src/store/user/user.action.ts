import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { User, USER_ACTION_TYPES } from "./user.types";

export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  User | null
>;

export const setCurrentUser = withMatcher((user: User | null): SetCurrentUser =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
);