import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { apiUrl } from "../../utils/constantes.utils";

export const fetchUserCart = createAsyncThunk(
    CART_ACTION_TYPES.FETCH_USER_CART,
    async (userId: number, thunkAPI) => {
        const source = axios.CancelToken.source()
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.get(`${apiUrl}/profile/carts`, {
            params: {
                userId: userId
            },
            cancelToken: source.token
        });
        return response.data as CartItem[];
    }
)

export const saveUserCart = createAsyncThunk(
    CART_ACTION_TYPES.SAVE_USER_CART,
    async (props: {userId: number, shoppingItems: CartItem[]}, thunkAPI) => {
        const source = axios.CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        await axios.post(`${apiUrl}/profile/carts`, {
            userId: props.userId,
            items: props.shoppingItems
        }, {
            cancelToken: source.token
        });
    }
)