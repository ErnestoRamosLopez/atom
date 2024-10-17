import { UnknownAction } from 'redux';
import { setTheme } from './preferences.action';
import { AllowedThemes } from './preferences.types';


export type PreferencesState = {
  theme: AllowedThemes;
};

export const PREFERENCES_INITIAL_STATE: PreferencesState = {
  theme: 'light'
};

export const preferencesReducer = (
  state = PREFERENCES_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  //do not reset preferences!
  if (setTheme.match(action)) {
    return {
      ...state,
      theme: action.payload,
    };
  }

  return state;
};