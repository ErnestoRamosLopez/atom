import { UnknownAction } from 'redux';
import { User } from './user.types';
import { setCurrentUser } from './user.action';
import { resetState } from '../root-reducer';

export type UserState = {
  currentUser: User | null;
};

export const USER_INITIAL_STATE: UserState = {
    currentUser: null
};

export const userReducer = (
  state = USER_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if(resetState.match(action)){
    return USER_INITIAL_STATE;
  }
  if (setCurrentUser.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
    };
  }

  return state;
};