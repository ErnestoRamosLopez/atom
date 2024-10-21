import { UnknownAction } from 'redux';

import { resetState } from '../root-reducer';
import { createOrder, updateUserCartCheckout } from './checkout.thunks';
import { initializeCheckout, setHasAcceptedOrderSummary, setIsOrderReady, setIsShipmentInformationValid } from './checkout.actions';

export type CheckoutState = {
  isCartUpdated: boolean,
  isShipmentInformationValid: boolean,
  hasAcceptedOrderSummary: boolean,
  isOrderReady: boolean,
  isOrderCompleted: boolean
};

export const CHECKOUT_INITIAL_STATE: CheckoutState = {
  isCartUpdated: false,
  isShipmentInformationValid: false,
  hasAcceptedOrderSummary: false,
  isOrderReady: false,
  isOrderCompleted: false
};

export const checkoutReducer = (
  state = CHECKOUT_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if(resetState.match(action) || initializeCheckout.match(action)){
    return CHECKOUT_INITIAL_STATE;
  }
  if(setIsShipmentInformationValid.match(action)){
    return {
      ...state,
      isShipmentInformationValid: action.payload
    }
  }
  if(setHasAcceptedOrderSummary.match(action)){
    return {
      ...state,
      hasAcceptedOrderSummary: action.payload
    }
  }
  if(updateUserCartCheckout.fulfilled.match(action)){
    return {
      ...state,
      isCartUpdated: true
    }
  }
  if(setIsOrderReady.match(action)){
    return {
      ...state,
      isOrderReady: action.payload
    }
  }

  if(createOrder.fulfilled.match(action)){
    return {
      ...state,
      isOrderCompleted: true
    }
  }
  return state;
};