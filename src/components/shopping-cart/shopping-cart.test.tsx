import { CartState } from "../../store/cart/cart.reducer";
import { CartItem } from "../../store/cart/cart.types";
import { fireEvent, renderWithProviders, screen, waitFor } from "../../utils/test-utils";
import ShoppingCart from "./shopping-cart.component";
import * as router from 'react-router';


const navigate = jest.fn();

const testCartItems: CartItem[][] = [
    [
        { id: 1, imageUrl: '', name: 'test', price: 85.44, quantity: 4},
        { id: 2, imageUrl: '', name: 'test 2', price: 23, quantity: 1},
        { id: 3, imageUrl: '', name: 'test 3', price: 96, quantity: 2},
        { id: 4, imageUrl: '', name: 'test 4', price: 63, quantity: 6},
    ],
    [
        { id: 5, imageUrl: '', name: 'test', price: 43.05, quantity: 4},
        { id: 6, imageUrl: '', name: 'test 2', price: 77.12, quantity: 1},
        { id: 7, imageUrl: '', name: 'test 3', price: 22.49, quantity: 2},
        { id: 8, imageUrl: '', name: 'test 4', price: 87.05, quantity: 14},
    ],
    [
        { id: 5, imageUrl: '', name: 'test', price: 3100.00, quantity: 4},
        { id: 6, imageUrl: '', name: 'test 2', price: 2800, quantity: 1},
    ],
];

const INITIAL_STATE: CartState = {
    cartItems: [],
    isCartLoaded: true,
    isCartOpen: false,
    shouldSaveCart: false
}

describe('Shopping cart component tests', () => {
    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load an empty cart with a link when it is a dropdown', async () => {
        renderWithProviders(<ShoppingCart isDropdown={true}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE
                }
            }
        });

        const buttons = screen.getAllByRole('link');
        expect(buttons.length).toBe(1);
    });

    it('should redirect to cart page when clicking the link', async () => {
        renderWithProviders(<ShoppingCart isDropdown={true}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE
                }
            }
        });

        const button = screen.getByRole('link');
        expect(button).toBeInTheDocument();

        fireEvent.click(button);
        await waitFor(() => {
            expect(navigate).toHaveBeenCalledTimes(1);
        });

        expect(navigate).toHaveBeenCalledWith("carrito", expect.anything());
    });

    it('should not load a link when it is not a dropdown', async () => {
        renderWithProviders(<ShoppingCart isDropdown={false}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE
                }
            }
        });

        const buttons = screen.queryAllByRole('link');
        expect(buttons.length).toBe(0);
    });

    it.each([
        [true],
        [false]
    ])('should load an empty cart with a total 0, when isDropdown is %s', async (isDropdown) => {
        renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE
                }
            }
        });

        expect(screen.getByText("Total: $0")).toBeInTheDocument();
    });

    it.each`
        cart | expectedTotal | isDropdown
        ${testCartItems[0]} | ${934.76} | ${true}
        ${testCartItems[0]} | ${934.76} | ${false}
        ${testCartItems[1]} | ${1513} | ${true}
        ${testCartItems[1]} | ${1513} | ${false}
        ${testCartItems[2]} | ${15200} | ${true}
        ${testCartItems[2]} | ${15200} | ${false}
    `('should load an cart with items with a total $expectedTotal, when isDropdown is $isDropdown', async ({cart, expectedTotal, isDropdown}: {cart: CartItem[], expectedTotal: number, isDropdown: boolean}) => {
        const { container } = renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cart
                }
            }
        });

        // eslint-disable-next-line testing-library/no-container
        const itemsContainer = container.querySelector('.items-container');
        await waitFor(() => {
            expect(itemsContainer?.children.length).toBe(cart.length);
        });

        for(const cartItem of cart){
            expect(screen.getByText(`${cartItem.name}`)).toBeInTheDocument();
            expect(screen.getByText(`${cartItem.price}`)).toBeInTheDocument();
            expect(screen.getByText(`${cartItem.quantity}`)).toBeInTheDocument();
        }

        expect(screen.getByText(`Total: $${expectedTotal}`)).toBeInTheDocument();
    });

    it.each([
        [testCartItems[0], 934.76, true],
        [testCartItems[0], 934.76, false],
        [testCartItems[1], 1513, true],
        [testCartItems[1], 1513, false],
    ])('should remove an item when clicking remove icon, cartitem %s %s. When dropdown is %s', async (cartItems, expectedTotal, isDropdown) => {
        renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cartItems
                }
            }
        });
        
        const removeIcons = screen.getAllByText('do_not_disturb_on.svg');
        expect(removeIcons.length).toBe(cartItems.length);

        const cartItem = cartItems.reduce((prev, curr) => prev.quantity > curr.quantity ? prev : curr);
        const index = cartItems.findIndex(it => it.id === cartItem.id);
        
        fireEvent.click(removeIcons[index]);
        
        await waitFor(() => {
            expect(screen.getByText(cartItem.quantity - 1)).toBeInTheDocument();
        });

        const newTotal = Math.round( (expectedTotal - cartItem.price) * 100) / 100;
        expect(screen.getByText(newTotal, { exact: false })).toBeInTheDocument();
    });

    it.each([
        [testCartItems[0], 934.76, true],
        [testCartItems[0], 934.76, false],
        [testCartItems[1], 1513, true],
        [testCartItems[1], 1513, false],
    ])('should delete an item when clicking remove icon and it has 1 item, cartitem %s %s. When dropdown is %s', async (cartItems, expectedTotal, isDropdown) => {
        renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cartItems
                }
            }
        });
        
        const removeIcons = screen.getAllByText('do_not_disturb_on.svg');
        expect(removeIcons.length).toBe(cartItems.length);

        const cartItem = cartItems.find(it => it.quantity === 1)!;
        const index = cartItems.findIndex(it => it.id === cartItem.id);
        
        fireEvent.click(removeIcons[index]);
        
        await waitFor(() => {
            expect(screen.getAllByText('do_not_disturb_on.svg').length).toBe(cartItems.length - 1);
        });

        const newTotal = Math.round( (expectedTotal - cartItem.price) * 100) / 100;
        expect(screen.getByText(newTotal, { exact: false })).toBeInTheDocument();
    });

    it.each([
        [testCartItems[0], 934.76, true],
        [testCartItems[0], 934.76, false],
        [testCartItems[1], 1513, true],
        [testCartItems[1], 1513, false],
    ])('should add an item when clicking add icon, cartitem %s %s. When dropdown is %s', async (cartItems, expectedTotal, isDropdown) => {
        renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cartItems
                }
            }
        });
        
        const removeIcons = screen.getAllByText('add_circle.svg');
        expect(removeIcons.length).toBe(cartItems.length);

        const cartItem = cartItems.reduce((prev, curr) => prev.quantity > curr.quantity ? prev : curr);
        const index = cartItems.findIndex(it => it.id === cartItem.id);
        
        fireEvent.click(removeIcons[index]);
        
        await waitFor(() => {
            expect(screen.getByText(cartItem.quantity + 1)).toBeInTheDocument();
        });

        const newTotal = Math.round( (expectedTotal + cartItem.price) * 100) / 100;
        expect(screen.getByText(newTotal, { exact: false })).toBeInTheDocument();
    });

    it.each([
        [testCartItems[0], 934.76, true],
        [testCartItems[0], 934.76, false],
        [testCartItems[1], 1513, true],
        [testCartItems[1], 1513, false],
    ])('should delete an item when clicking delete icon, cartitem %s %s. When dropdown is %s', async (cartItems, expectedTotal, isDropdown) => {
        renderWithProviders(<ShoppingCart isDropdown={isDropdown}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cartItems
                }
            }
        });
        
        const removeIcons = screen.getAllByText('delete.svg');
        expect(removeIcons.length).toBe(cartItems.length);

        const cartItem = cartItems.reduce((prev, curr) => prev.quantity > curr.quantity ? prev : curr);
        const index = cartItems.findIndex(it => it.id === cartItem.id);
        
        fireEvent.click(removeIcons[index]);
        
        await waitFor(() => {
            expect(screen.getAllByText('delete.svg').length).toBe(cartItems.length - 1);
        });

        const newTotal = Math.round( (expectedTotal - (cartItem.price * cartItem.quantity)) * 100) / 100;
        expect(screen.getByText(newTotal, { exact: false })).toBeInTheDocument();
    });

    it.each([
        [testCartItems[0]],
        [testCartItems[1]],
    ])('should delete all items when clicking clear icon, cartitem', async (cartItems) => {
        renderWithProviders(<ShoppingCart isDropdown={false}/>, {
            preloadedState: {
                cart: {
                    ...INITIAL_STATE,
                    cartItems: cartItems,
                    isCartLoaded: true
                }
            }
        });
        
        const clearIcon = screen.getByText('clear_all.svg').parentElement! as HTMLButtonElement;
        
        expect(clearIcon).toBeInTheDocument();
        expect(clearIcon.disabled).toBe(false);
        
        fireEvent.click(clearIcon);
        
        await waitFor(() => {
            expect(clearIcon.disabled).toBe(true);
        });

        expect(screen.getByText("Total: $0", { exact: false })).toBeInTheDocument();
    });
});