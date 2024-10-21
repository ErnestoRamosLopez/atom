export enum CHECKOUT_ACTION_TYPES {
    RESET_CHECKOUT = 'checkout/RESET_CHECKOUT',
    SET_IS_SHIPMENT_INFORMATION_VALID = 'checkout/SET_IS_SHIPMENT_INFORMATION_VALID',
    SET_HAS_ACCEPTED_ORDER_SUMMARY = 'checkout/SET_HAS_ACCEPTED_ORDER_SUMMARY',
    UPDATE_USER_CART = 'checkout/UPDATE_USER_CART',
    SET_IS_ORDER_READY = 'checkout/SET_IS_ORDER_READY',
    CREATE_ORDER = 'checkout/CREATE_ORDER'
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
    shipmentId: number,
    shipmentPrice: number
}

export type CheckoutPaymentDetails = {
    cardNumber: string,
    expirationDate: string,
    cvv: string
}