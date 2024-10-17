import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { User } from "../user/user.types";
import { LOGIN_ACTION_TYPES } from "./login.types";

export type SetLoginUserData = ActionWithPayload<
  LOGIN_ACTION_TYPES.SET_USER_DATA,
  {userData: Partial<User> | null, cancelRedirect: string | null}
>;

export const setLoginUserData = withMatcher((data: {userData: Partial<User> | null, cancelRedirect: string | null}): SetLoginUserData =>
  createAction(LOGIN_ACTION_TYPES.SET_USER_DATA, data)
);