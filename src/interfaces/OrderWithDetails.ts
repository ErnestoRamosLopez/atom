import { CartItem } from "../store/cart/cart.types";

export interface OrderWithDetails{
    id: number,
    userId: number,
    items: CartItem[],
    createdAt: string,
    total: number,
    shipmentId: number,
    shipmentCost: number,
    status: string
}