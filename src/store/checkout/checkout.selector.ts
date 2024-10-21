import { createSelector } from "@reduxjs/toolkit";
import { CheckoutState } from "./checkout.reducer";

const selectCheckoutReducer = (state: any): CheckoutState => state.checkout;

export const selectIsCartUpdated = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.isCartUpdated
);

export const selectIsShipmentInformationValid = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.isShipmentInformationValid
);

export const selectHasAcceptedOrderSummary = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.hasAcceptedOrderSummary
);

export const selectIsOrderReady = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.isOrderReady
);

export const selectIsOrderCompleted = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.isOrderCompleted
);