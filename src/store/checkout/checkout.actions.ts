import { ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CHECKOUT_ACTION_TYPES } from "./checkout.types";

export type SetIsShipmentInformationValid = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_IS_SHIPMENT_INFORMATION_VALID,
  boolean
>;

export type SetHasAcceptedOrderSummary = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_HAS_ACCEPTED_ORDER_SUMMARY,
  boolean
>;

export type SetIsOrderReady = ActionWithPayload<
  CHECKOUT_ACTION_TYPES.SET_IS_ORDER_READY,
  boolean
>;

export const initializeCheckout = withMatcher(() =>
    createAction(CHECKOUT_ACTION_TYPES.RESET_CHECKOUT)
);

export const setIsShipmentInformationValid = withMatcher((isValid: boolean): SetIsShipmentInformationValid =>
    createAction(CHECKOUT_ACTION_TYPES.SET_IS_SHIPMENT_INFORMATION_VALID, isValid)
);

export const setHasAcceptedOrderSummary = withMatcher((accepted: boolean): SetHasAcceptedOrderSummary =>
    createAction(CHECKOUT_ACTION_TYPES.SET_HAS_ACCEPTED_ORDER_SUMMARY, accepted)
);

export const setIsOrderReady = withMatcher((isReady: boolean): SetIsOrderReady =>
  createAction(CHECKOUT_ACTION_TYPES.SET_IS_ORDER_READY, isReady)
);