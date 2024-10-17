import { createSelector } from 'reselect';
import { CartState } from './cart.reducer';
import { selectIsUserLoggedIn } from '../user/user.selector';

const selectCartReducer = (state: any): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectIsCartLoaded = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartLoaded
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems): number =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems): number =>{
    const total = cartItems.reduce( (total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    return Math.round( total * 100) / 100;
  }
);

//used to trigger save
export const selectShouldSaveCart = createSelector(
  [selectCartReducer],
  (cartItems) => cartItems.shouldSaveCart
);

//used to check if the cart can be saved
export const selectCanSaveCart = createSelector(
  [selectCartReducer, selectIsUserLoggedIn],
  (cartItems, isLoggedIn) => isLoggedIn && cartItems.isCartLoaded
)