import { createSelector } from 'reselect';
import { LoginState } from './login.reducer';

const selectLoginReducer = (state: any): LoginState => state.login;

export const selectLoginFromIdentityProvider = createSelector(
  [selectLoginReducer],
  (login) => ({
    userData: login.userData,
    cancelRedirect: login.cancelRedirect 
  })
);