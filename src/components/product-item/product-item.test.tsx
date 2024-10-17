import { toast } from "react-toastify";
import { Product } from "../../store/product/product.types";
import { setupStore } from "../../store/store";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import ProductItem from "./product-item.component";
import { CartState } from "../../store/cart/cart.reducer";

const productTest: Product = {
    id: 1,
    imageUrl: '',
    name: '',
    price: 98
};
const CART_INITIAL_STATE: CartState = {
    cartItems: [],
    isCartLoaded: true,
    isCartOpen: false,
    shouldSaveCart: false
}
describe('Product item component tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should toggle favorite icons', async () =>{
        renderWithProviders(<ProductItem product={productTest}/>, {
            preloadedState: {
                cart: {
                    ...CART_INITIAL_STATE
                }
            }
        });

        const button = screen.getByRole('button', {name: 'star_border.svg'});
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.queryByRole('button', {name: 'star_border.svg'})).not.toBeInTheDocument();
        });

        fireEvent.click(button);
        await waitFor(() => {
            expect(screen.queryByRole('button', {name: 'star.svg'})).not.toBeInTheDocument();
        });
    });

    it('should add items to cart', async () =>{
        const store = setupStore();
        renderWithProviders(<ProductItem product={productTest}/>, {
            preloadedState: {
                cart: {
                    ...CART_INITIAL_STATE
                }
            },
            store: store
        });

        const button = screen.getByRole('button', {name: 'Agregar'});
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith('Producto agregado');
        });

        const currentItems = store.getState().cart.cartItems;
        expect(currentItems.length).toBe(1);
    });
});