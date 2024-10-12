import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { AllowedThemes, PREFERENCES_ACTION_TYPES } from "./preferences.types";

export type SetTheme = ActionWithPayload<
  PREFERENCES_ACTION_TYPES.SET_THEME,
  AllowedThemes
>;

export const setTheme = withMatcher((theme: AllowedThemes): SetTheme =>
  createAction(PREFERENCES_ACTION_TYPES.SET_THEME, theme)
);