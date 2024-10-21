import { UnknownAction } from 'redux';

import { CartItem } from './cart.types';
import { setIsCartOpen, setCartItems, setIsCartLoaded } from './cart.action';
import { resetState } from '../root-reducer';
import { fetchUserCart, saveUserCart } from './cart.thunks';
import { createOrder } from '../checkout/checkout.thunks';

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
  isCartLoaded: boolean;
  shouldSaveCart: boolean;
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
  isCartLoaded: false,
  shouldSaveCart: false
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
      cartItems: action.payload.cartItems,
      shouldSaveCart: action.payload.shouldSaveCart
    };
  }

  if (setIsCartLoaded.match(action)) {
    return {
      ...state,
      isCartLoaded: action.payload,
    };
  }

  if(fetchUserCart.fulfilled.match(action)){
    return {
      ...state,
      isCartLoaded: true,
      shouldSaveCart: false,
      cartItems: action.payload
    }
  }

  if(saveUserCart.fulfilled.match(action) || saveUserCart.rejected.match(action)){
    return {
      ...state,
      shouldSaveCart: false
    }
  }

  if(createOrder.fulfilled.match(action)){
    return {
      ...CART_INITIAL_STATE,
      isCartLoaded: true,
    }
  }

  return state;
};