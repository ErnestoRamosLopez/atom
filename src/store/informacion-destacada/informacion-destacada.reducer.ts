import { UnknownAction } from 'redux';

import { InformacionDestacada } from './informacion-destacada.types';
import { setItems } from './informacion-destacada.action';

export type InformacionDestacadaState = {
  items: InformacionDestacada[]
};

export const CART_INITIAL_STATE: InformacionDestacadaState = {
  items: []
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if (setItems.match(action)) {
    return {
      ...state,
      items: action.payload,
    };
  }

  return state;
};