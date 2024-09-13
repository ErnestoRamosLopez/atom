import { FC, Fragment, useEffect, useState } from "react"
import { ReactComponent as AddIcon } from '@material-design-icons/svg/outlined/add_circle.svg';
import { ReactComponent as RemoveIcon } from '@material-design-icons/svg/outlined/do_not_disturb_on.svg';
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';
import { ReactComponent as ClearIcon } from '@material-design-icons/svg/outlined/clear_all.svg';
import { ReactComponent as ArrowIcon } from '@material-design-icons/svg/outlined/arrow_forward.svg';

interface ShoppingCartProps {
    isDropdown: boolean
}

const items = [
    {
        productId: 1,
        iconUrl: 'https://fastly.picsum.photos/id/845/200/200.jpg?hmac=KMGSD70gM0xozvpzPM3kHIwwA2TRlVQ6d2dLW_b1vDQ',
        name: 'Tele',
        price: 299.11,
        quantity: 15,
    },
    {
        productId: 2,
        iconUrl: 'https://fastly.picsum.photos/id/514/200/200.jpg?hmac=ywW8zoc6PM1wbLeZvKJPGczujmQgEM7QOTaWiOTjhjM',
        name: 'Nintendo switch',
        price: 25.11,
        quantity: 6,
    },
    {
        productId: 3,
        iconUrl: 'https://fastly.picsum.photos/id/841/200/200.jpg?hmac=jAPzaXgN_B37gVuIQvmtuRCmYEC0lJP86OZexH1yam4',
        name: 'Agua',
        price: 20,
        quantity: 2,
    },
    {
        productId: 4,
        iconUrl: 'https://fastly.picsum.photos/id/63/200/200.jpg?hmac=qWHuiJWhQdWUspXyFKWgfsomzV1IvMNFZQ0hlDl8RZc',
        name: 'Taza',
        price: 42,
        quantity: 2,
    },
    {
        productId: 5,
        iconUrl: 'https://fastly.picsum.photos/id/585/200/200.jpg?hmac=xPWUtHiddZixyCUwkNykuZcN4myA3sY2ewf9zFRc7oM',
        name: 'Memoria usb',
        price: 80,
        quantity: 1,
    },
];
const ShoppingCart: FC<ShoppingCartProps> = ({isDropdown}) => {
    const [shoppingItems, setShoppingItems] = useState(items);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let totalTemp = 0;
        shoppingItems.forEach((item) => {
            totalTemp += item.quantity * item.price;
        });
        setTotal(totalTemp);
    }, [shoppingItems]);

    function removeItem(item: any){

    }

    function clearItem(item: any){

    }

    function addItem(item: any){

    }

    return (
        <Fragment>
        {
            isDropdown && (
                <div className="card card-compact bg-base-100 shadow w-72 h-72">
                    <div className="card-body">
                        <div className="max-h-44 overflow-y-scroll overflow-x-hidden">
                            {
                                shoppingItems.map((item) => (
                                    <div key={item.productId} className="card card-side gap-x-3 flex items-center border my-2 max-h-14 w-full">
                                        <figure>
                                            <img
                                            src={item.iconUrl}
                                            alt="Item" 
                                            className="h-14 w-10"/>
                                        </figure>
                                        <span className="w-20 truncate text-left">{item.name}</span>
                                        <div className="grid grid-cols-3 w-20 justify-items-center gap-x-4">
                                            <span className="m-auto w-5 truncate">{item.quantity}</span>
                                            <div className="grid grid-cols-1">
                                                <AddIcon className="h-7 w-7 zoom" fill="oklch(var(--su))"/>
                                                <RemoveIcon className="h-7 w-7 zoom" fill="oklch(var(--wa))"/>
                                            </div>
                                            <DeleteIcon className="h-10 w-10 zoom my-auto" fill="oklch(var(--er))"/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <span className="text-info">Total: ${total}</span>
                        <div className="card-actions">
                            <button className="btn btn-outline btn-primary btn-block">Ver carrito</button>
                        </div>
                    </div>
                </div>
            )
        }
        {
            !isDropdown && (
                <div className="grid grid-cols-8 items-center mt-2">
                    <span className="col-span-6 text-left">Mi carrito</span>
                    <div className="col-span-2 flex justify-end">
                        <button className="btn w-fit">
                            <ClearIcon />
                            Vaciar
                        </button>
                    </div>
                    
                    <div className="col-span-full">
                        {
                            shoppingItems.map((item) => (
                                <div key={item.productId} className="card card-side gap-x-3 grid grid-cols-12 items-center border my-2 max-h-24">
                                    <figure className="col-span-2 w-fit">
                                        <img
                                        src={item.iconUrl}
                                        alt="Item"
                                        className="h-24"/>
                                    </figure>
                                    <span className="col-span-5 truncate text-left">{item.name}</span>
                                    <div className="col-span-5 flex justify-end">
                                        <div className="grid grid-cols-3 w-fit">
                                            <span className="m-auto truncate">{item.quantity}</span>
                                            <div className="grid grid-cols-1">
                                                <AddIcon className="h-10 w-10 zoom" fill="oklch(var(--su))"/>
                                                <RemoveIcon className="h-10 w-10 zoom" fill="oklch(var(--wa))"/>
                                            </div>
                                            <DeleteIcon className="h-14 w-14 zoom my-auto" fill="oklch(var(--er))"/>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-span-full flex justify-end my-2">
                        <span className="text-info text-3xl">Total: ${total}</span>
                    </div>
                    <div className="col-span-full justify-end card-actions my-2">
                        <button className="btn text-right btn-primary">
                            Continuar compra
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            )
        }
        </Fragment>
    );
}

export default ShoppingCart;