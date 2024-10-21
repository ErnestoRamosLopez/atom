import { createAsyncThunk } from "@reduxjs/toolkit";
import { CHECKOUT_ACTION_TYPES, CheckoutPaymentDetails, CheckoutShipmentDetails } from "./checkout.types";
import axios from 'axios'
import { apiUrl } from "../../utils/constantes.utils";
import { setCartItems } from "../cart/cart.action";
import { toast } from "react-toastify";

export const updateUserCartCheckout = createAsyncThunk(
    CHECKOUT_ACTION_TYPES.UPDATE_USER_CART,
    async (_, thunkAPI) => {
        const source = axios.CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.put(`${apiUrl}/profile/carts`, {
            cancelToken: source.token
        });
        if( response.data.hasChanged){
            thunkAPI.dispatch(setCartItems(response.data.items, false));
            toast('Los precios de tu carrito se han actualizado');
        }
    }
);

export const createOrder = createAsyncThunk(
    CHECKOUT_ACTION_TYPES.CREATE_ORDER,
    async (args: {
        shippingInformation: CheckoutShipmentDetails,
        total: number,
        paymentInformation: CheckoutPaymentDetails
    }, thunkAPI) => {
        const source = axios.CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        await axios.post(`${apiUrl}/orders`,
            {
            ...args
            }, 
            {
                cancelToken: source.token
            }
        );
    }
);