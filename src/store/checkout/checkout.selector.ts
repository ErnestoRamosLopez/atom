import { createSelector } from "@reduxjs/toolkit";
import { CheckoutState } from "./checkout.reducer";
import { selectCartTotal } from "../cart/cart.selector";
import { Discount } from "../../interfaces/Discount";

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

export const selectShippingInformation = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.shippingInformation
);

export const selectPaymentInformation = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.paymentInformation
);

export const selectCheckoutDiscounts = createSelector(
  [selectCheckoutReducer],
  (checkout) => checkout.discounts
);

export const selectCheckoutTotalDiscounts = createSelector(
  [selectCartTotal, selectCheckoutDiscounts],
  (cartTotal, discounts) => calculateDiscount(cartTotal, discounts)
);


export const selectCheckoutTotal = createSelector(
  [selectCartTotal, selectShippingInformation, selectCheckoutTotalDiscounts],
  (cartTotal, shippingInformation, discounted) => {
    let shipmentCost = 0;
    if( shippingInformation !== null){
      shipmentCost = shippingInformation.shipmentCarrier?.price ?? 0;
    }

    return Math.round((cartTotal + shipmentCost - discounted) * 100) /100;
  }
);



//helper functions
const calculateDiscount = (cartTotal: number, discounts: Discount[]): number => {
  let currentPrice = cartTotal;
  let discounted = 0;
  //sugerencia, agregar descuento por categoria
  for(const discount of discounts){
    if( discount.type === '$'){
      discounted += discount.value;
      currentPrice -= discount.value;
    }
    if(discount.type === '%'){
      let tempDiscount = Math.round( currentPrice * discount.value * 100) / 100;
      discounted += tempDiscount;
      currentPrice -= tempDiscount;
    }
  }

  return discounted;
}