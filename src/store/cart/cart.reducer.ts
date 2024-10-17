import { UnknownAction } from 'redux';

import { CartItem } from './cart.types';
import { setIsCartOpen, setCartItems, setIsCartLoaded } from './cart.action';
import { resetState } from '../root-reducer';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  isCartLoaded: boolean;
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  isCartLoaded: false
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if(resetState.match(action)){
    return CART_INITIAL_STATE;
  }
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (setIsCartLoaded.match(action)) {
    return {
      ...state,
      isCartLoaded: action.payload,
    };
  }

  return state;
};