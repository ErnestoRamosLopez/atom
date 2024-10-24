import { ShipmentCarrier } from "../../interfaces/ShipmentCarrier"

export enum CHECKOUT_ACTION_TYPES {
    RESET_CHECKOUT = 'checkout/RESET_CHECKOUT',
    SET_SHIPMENT_INFORMATION = 'checkout/SET_SHIPMENT_INFORMATION',
    SET_HAS_ACCEPTED_ORDER_SUMMARY = 'checkout/SET_HAS_ACCEPTED_ORDER_SUMMARY',
    UPDATE_USER_CART = 'checkout/UPDATE_USER_CART',
    SET_IS_ORDER_READY = 'checkout/SET_IS_ORDER_READY',
    CREATE_ORDER = 'checkout/CREATE_ORDER',
    SET_DISCOUNT = 'checkout/SET_DISCOUNT'
}

export type CheckoutShipmentDetails = {
    name: string,
    lastname: string,
    street: string,
    streetNumber: number,
    postalCode: string,
    neighborhood: string,
    city: string,
    state: string,
    shipmentCarrier: ShipmentCarrier | null,
}

export type CheckoutPaymentDetails = {
    cardNumber: string,
    expirationDate: string,
    cvv: string
}