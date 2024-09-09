import { Product } from "../store/product/product.types";

export type CartItem = {
    quantity: number;
} & Product;