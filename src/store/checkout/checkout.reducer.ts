import { UnknownAction } from 'redux';

import { resetState } from '../root-reducer';
import { createOrder, updateUserCartCheckout } from './checkout.thunks';
import { initializeCheckout, setCheckoutDiscounts, setHasAcceptedOrderSummary, setIsOrderReady, setShipmentInformation } from './checkout.actions';
import { CheckoutPaymentDetails, CheckoutShipmentDetails } from './checkout.types';
import { Discount } from '../../interfaces/Discount';

export type CheckoutState = {
  //flags
  isCartUpdated: boolean,
  isShipmentInformationValid: boolean,
  hasAcceptedOrderSummary: boolean,
  isOrderReady: boolean,
  isOrderCompleted: boolean,

  //objects
  shippingInformation: CheckoutShipmentDetails | null,
  paymentInformation: CheckoutPaymentDetails | null,
  discounts: Discount[]
};

export const CHECKOUT_INITIAL_STATE: CheckoutState = {
  isCartUpdated: false,
  isShipmentInformationValid: false,
  hasAcceptedOrderSummary: false,
  isOrderReady: false,
  isOrderCompleted: false,
  shippingInformation: null,
  paymentInformation: null,
  discounts: []
};

export const checkoutReducer = (
  state = CHECKOUT_INITIAL_STATE,
  action = {} as UnknownAction
) => {
  if(resetState.match(action) || initializeCheckout.match(action)){
    return CHECKOUT_INITIAL_STATE;
  }
  if(setShipmentInformation.match(action)){
    return {
      ...state,
      isShipmentInformationValid: action.payload.isValid,
      shippingInformation: action.payload.shipmentDetails
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
      isOrderReady: action.payload.isReady,
      paymentInformation: action.payload.paymentInformation
    }
  }

  if(createOrder.fulfilled.match(action)){
    return {
      ...state,
      isOrderCompleted: true
    }
  }

  if(setCheckoutDiscounts.match(action)){
    return {
      ...state,
      discounts: action.payload
    }
  }
  
  return state;
};