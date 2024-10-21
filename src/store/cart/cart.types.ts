import { Product } from '../product/product.types';

export enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
  SET_CART_COUNT = 'cart/SET_CART_COUNT',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
  SET_IS_CART_LOADED = 'cart/SET_IS_CART_LOADED',
  FETCH_USER_CART = 'cart/FETCH_USER_CART',
  SAVE_USER_CART = 'cart/SAVE_USER_CART',
  UPDATE_USER_CART = 'cart/UPDATE_USER_CART',
}

export type CartItem = {
  quantity: number;
} & Product;