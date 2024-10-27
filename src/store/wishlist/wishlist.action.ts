import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { Product } from '../product/product.types';
import { WISHLIST_ACTION_TYPES } from './wishlist.types';

const addWishlistItem = (
  wishlistItems: Product[],
  productToAdd: Product
): Product[] => {
  const existingWishlistItem = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === productToAdd.id
  );

  if (existingWishlistItem) {
    return wishlistItems;
  }

  return [...wishlistItems, productToAdd];
};

const removeWishlistItem = (
    wishlistItems: Product[],
    wishlistItemToRemove: Product
): Product[] => {
    return wishlistItems.filter((wishlistItem) => wishlistItem.id !== wishlistItemToRemove.id);
};

export type SetIsWishlistOpen = ActionWithPayload<
    WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_OPEN,
    boolean
>;

export type SetWishlistItems = ActionWithPayload<
    WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS,
    {wishlistItems: Product[], shouldSaveWishlist: boolean}
>;

export type SetIsWishlistLoaded = ActionWithPayload<
    WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_LOADED,
    boolean
>;

export const setIsWishlistOpen = withMatcher((boolean: boolean): SetIsWishlistOpen =>
    createAction(WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_OPEN, boolean)
);

export const setWishlistItems = withMatcher((wishlistItems: Product[], shouldSaveWishlist: boolean): SetWishlistItems =>
    createAction(WISHLIST_ACTION_TYPES.SET_WISHLIST_ITEMS, {wishlistItems, shouldSaveWishlist})
);

export const setIsWishlistLoaded = withMatcher((boolean: boolean): SetIsWishlistLoaded =>
    createAction(WISHLIST_ACTION_TYPES.SET_IS_WISHLIST_LOADED, boolean)
);

export const addItemToWishlist = (
    wishlistItems: Product[],
    productToAdd: Product,
    shouldSaveWishlist: boolean
) => {
    const newWishlistItems = addWishlistItem(wishlistItems, productToAdd);
    return setWishlistItems(newWishlistItems, shouldSaveWishlist);
};

export const removeItemFromWishlist = (
    wishlistItems: Product[],
    wishlistItemToRemove: Product,
    shouldSaveWishlist: boolean
) => {
  const newWishlistItems = removeWishlistItem(wishlistItems, wishlistItemToRemove);
  return setWishlistItems(newWishlistItems, shouldSaveWishlist);
};

