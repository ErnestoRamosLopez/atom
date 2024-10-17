import { UnknownAction } from 'redux';
import { setLoginUserData } from './login.action';
import { User } from '../user/user.types';
import { resetState } from '../root-reducer';


export type LoginState = {
  userData: Partial<User> | null;
  cancelRedirect: string | null
};

export const LOGIN_INITIAL_STATE: LoginState = {
  userData: null,
  cancelRedirect: null
};

export const loginReducer = (
  state = LOGIN_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if(resetState.match(action)){
    return LOGIN_INITIAL_STATE;
  }
  if (setLoginUserData.match(action)) {
    return {
      ...state,
      userData: action.payload.userData,
      cancelRedirect: action.payload.cancelRedirect
    };
  }

  return state;
};