import { toast } from "react-toastify";
import { Product } from "../../store/product/product.types";
import { setupStore } from "../../store/store";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import ProductItem from "./product-item.component";

const productTest: Product = {
    id: 1,
    imageUrl: '',
    name: '',
    price: 98
};
describe('Product item component tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should toggle favorite icons', async () =>{
        renderWithProviders(<ProductItem product={productTest}/>, {
            preloadedState: {
                cart: {
                    cartItems: [],
                    isCartOpen: false
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
                    cartItems: [],
                    isCartOpen: false
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