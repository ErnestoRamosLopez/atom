import { UnknownAction } from "@reduxjs/toolkit";

//src/store/cart/cart.reducer.ts
// has no side effect
export const cartReducer = (
    state = CART_INITIAL_STATE,
    action = {} as UnknownAction
) => {
    if(resetState.match(action)){
      return CART_INITIAL_STATE;
    }
    if (setIsCartOpen.match(action)) {
      return {
        ...state,
        isCartOpen: action.payload,
      };
    }
  
    if (setCartItems.match(action)) {
      return {
        ...state,
        cartItems: action.payload.cartItems,
        shouldSaveCart: action.payload.shouldSaveCart
      };
    }
  
    if (setIsCartLoaded.match(action)) {
      return {
        ...state,
        isCartLoaded: action.payload,
      };
    }
  
    if(fetchUserCart.fulfilled.match(action)){
      return {
        ...state,
        isCartLoaded: true,
        shouldSaveCart: false,
        cartItems: action.payload
      }
    }
  
    if(saveUserCart.fulfilled.match(action) || saveUserCart.rejected.match(action)){
      return {
        ...state,
        shouldSaveCart: false
      }
    }
  
    return state;
};