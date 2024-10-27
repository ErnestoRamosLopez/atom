import { createSelector } from 'reselect';
import { selectIsUserLoggedIn } from '../user/user.selector';
import { WishlistState } from './wishlist.reducer';

const selectWishlistReducer = (state: any): WishlistState => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistReducer],
  (wishlist) => wishlist.products
);

export const selectIsWishlistOpen = createSelector(
  [selectWishlistReducer],
  (wishlist) => wishlist.isWishlistOpen
);

export const selectIsWishlistLoaded = createSelector(
  [selectWishlistReducer],
  (wishlist) => wishlist.isWishlistLoaded
);

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (wishlistItems): number => wishlistItems.length
);


//used to trigger save
export const selectShouldSaveWishlist = createSelector(
  [selectWishlistReducer],
  (wishlist) => wishlist.shouldSaveWishlist
);

//used to check if the cart can be saved
export const selectCanSaveWishlist = createSelector(
  [selectWishlistReducer, selectIsUserLoggedIn],
  (wishlist, isLoggedIn) => isLoggedIn && wishlist.isWishlistLoaded
);