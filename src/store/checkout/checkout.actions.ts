import { Discount } from "../../interfaces/Discount";
import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CHECKOUT_ACTION_TYPES, CheckoutPaymentDetails, CheckoutShipmentDetails } from "./checkout.types";

export type SetShipmentInformation = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_SHIPMENT_INFORMATION,
  {isValid: boolean, shipmentDetails: CheckoutShipmentDetails | null}
>;

export type SetHasAcceptedOrderSummary = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_HAS_ACCEPTED_ORDER_SUMMARY,
  boolean
>;

export type SetIsOrderReady = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_IS_ORDER_READY,
  {isReady: boolean, paymentInformation: CheckoutPaymentDetails | null}
>;

export type SetCheckoutDiscounts = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_DISCOUNT,
  Discount[]
>;

export const initializeCheckout = withMatcher(() =>
    createAction(CHECKOUT_ACTION_TYPES.RESET_CHECKOUT)
);

export const setShipmentInformation = withMatcher((isValid: boolean, shipmentDetails: CheckoutShipmentDetails | null): SetShipmentInformation =>
    createAction(CHECKOUT_ACTION_TYPES.SET_SHIPMENT_INFORMATION, { isValid, shipmentDetails})
);

export const setHasAcceptedOrderSummary = withMatcher((accepted: boolean): SetHasAcceptedOrderSummary =>
    createAction(CHECKOUT_ACTION_TYPES.SET_HAS_ACCEPTED_ORDER_SUMMARY, accepted)
);

export const setIsOrderReady = withMatcher((isReady: boolean, paymentInformation: CheckoutPaymentDetails | null): SetIsOrderReady =>
  createAction(CHECKOUT_ACTION_TYPES.SET_IS_ORDER_READY, {isReady, paymentInformation})
);

export const setCheckoutDiscounts = withMatcher((discounts: Discount[]): SetCheckoutDiscounts =>
  createAction(CHECKOUT_ACTION_TYPES.SET_DISCOUNT, discounts)
);

export const removeCheckoutDiscount = (discounts: Discount[], id: number) => createAction(CHECKOUT_ACTION_TYPES.SET_DISCOUNT, discounts.filter(it => it.id !== id));

export const addCheckoutDiscount = (discounts: Discount[], discount: Discount) => {
  let alreadyExists = !!discounts.find(it => it.id === discount.id);
  let newDiscounts = [...discounts];
  if( !alreadyExists ){
    newDiscounts = [...discounts, discount];
  }
  return createAction(CHECKOUT_ACTION_TYPES.SET_DISCOUNT, newDiscounts);
}
