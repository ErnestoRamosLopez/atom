import { UnknownAction } from 'redux';
import { resetState } from '../root-reducer';
import { Product } from '../product/product.types';
import { setIsWishlistLoaded, setIsWishlistOpen, setWishlistItems } from './wishlist.action';
import { fetchUserWishlist, saveUserWishlist } from './wishlist.thunks';


export type WishlistState = {
  products: Product[],
  isWishlistOpen: boolean,
  isWishlistLoaded: boolean,
  shouldSaveWishlist: boolean
};

export const WISHLIST_INITIAL_STATE: WishlistState = {
  products: [],
  isWishlistOpen: false,
  isWishlistLoaded: false,
  shouldSaveWishlist: false
};

export const wishlistReducer = (
  state = WISHLIST_INITIAL_STATE,
  action = {} as UnknownAction
) => {
    if(resetState.match(action)){
        return WISHLIST_INITIAL_STATE;
    }
    if (setIsWishlistOpen.match(action)) {
        return {
            ...state,
            isWishlistOpen: action.payload,
        };
    }

    if (setWishlistItems.match(action)) {
        return {
            ...state,
            products: action.payload.wishlistItems,
            shouldSaveWishlist: action.payload.shouldSaveWishlist
        };
    }

    if (setIsWishlistLoaded.match(action)) {
        return {
            ...state,
            isWishlistLoaded: action.payload,
        };
    }

    if(fetchUserWishlist.fulfilled.match(action)){
        return {
            ...state,
            isWishlistLoaded: true,
            shouldSaveWishlist: false,
            products: action.payload
        }
    }

    if(saveUserWishlist.fulfilled.match(action) || saveUserWishlist.rejected.match(action)){
        return {
            ...state,
            shouldSaveWishlist: false
        }
    }

    return state;
};