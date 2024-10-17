//src/store/cart/cart.selector.ts
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