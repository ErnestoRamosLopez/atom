import { createAsyncThunk } from "@reduxjs/toolkit";
import { WISHLIST_ACTION_TYPES } from "./wishlist.types";
import axios from "axios";
import { apiUrl } from "../../utils/constantes.utils";
import { Product } from "../product/product.types";

export const fetchUserWishlist = createAsyncThunk(
    WISHLIST_ACTION_TYPES.FETCH_USER_WISHLIST,
    async (_, thunkAPI) => {
        const source = axios.CancelToken.source()
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        const response = await axios.get(`${apiUrl}/profile/wishlist`, {
            cancelToken: source.token
        });
        return response.data as Product[];
    }
)

export const saveUserWishlist = createAsyncThunk(
    WISHLIST_ACTION_TYPES.SAVE_USER_WISHLIST,
    async (wishlistItems: Product[], thunkAPI) => {
        const source = axios.CancelToken.source();
        thunkAPI.signal.addEventListener('abort', () => {
            source.cancel()
        })
        let productsId = wishlistItems.map(it => it.id);
        await axios.post(`${apiUrl}/profile/wishlist`, {
            productsId
        }, {
            cancelToken: source.token
        });
    }
)