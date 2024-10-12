import { createSelector } from 'reselect';
import { PreferencesState } from './preferences.reducer';

const selectPreferencesReducer = (state: any): PreferencesState => state.preferences;

export const selectTheme = createSelector(
  [selectPreferencesReducer],
  (preferences) => preferences.theme
);