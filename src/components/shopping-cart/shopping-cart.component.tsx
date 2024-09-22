import { FC, Fragment, useEffect, useRef, useState } from "react"
import { ReactComponent as AddIcon } from '@material-design-icons/svg/outlined/add_circle.svg';
import { ReactComponent as RemoveIcon } from '@material-design-icons/svg/outlined/do_not_disturb_on.svg';
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';
import { ReactComponent as ClearIcon } from '@material-design-icons/svg/outlined/clear_all.svg';
import { ReactComponent as ArrowIcon } from '@material-design-icons/svg/outlined/arrow_forward.svg';
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { addItemToCart, clearCart, clearItemFromCart, removeItemFromCart, setIsCartOpen } from "../../store/cart/cart.action";
import { Link } from "react-router-dom";
import { openModalFn } from "../../utils/modal.utils";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import './shopping-cart.styles.css';

interface ShoppingCartProps {
    isDropdown: boolean
}


const ShoppingCart: FC<ShoppingCartProps> = ({isDropdown}) => {
    const shoppingItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const cartCount = useSelector(selectCartCount);
    const isLoggedIn = useSelector(selectIsUserLoggedIn);

    const [removingRows, setRemovingRows] = useState<number[]>([]);

    const dispatch = useDispatch();
    const componentRef = useRef<HTMLDivElement>(null);

    const removeItem = (item: any) => {
        const count = shoppingItems.find(it => it.id === item.id)!.quantity;
        if(count === 1){
            setRemovingRows(prev => [...prev, item.id]);
            setTimeout(() => {
                dispatch(removeItemFromCart(shoppingItems, item));
                setRemovingRows(prev => prev.filter(it => it !== item.id));
            }, 500);
        }else{
            dispatch(removeItemFromCart(shoppingItems, item));
        }
    }

    const clearItem = (item: any) => {
        setRemovingRows(prev => [...prev, item.id]);

        setTimeout(() => {
            dispatch(clearItemFromCart(shoppingItems, item));
            setRemovingRows(prev => prev.filter(it => it !== item.id));
        }, 500);
    }

    const addItem = (item: any) => dispatch(addItemToCart(shoppingItems, item));

    const emptyCart = () => {
        const rowIds = shoppingItems.map((row) => row.id);
        setRemovingRows(rowIds);

        setTimeout(() => {
            dispatch(clearCart());
            setRemovingRows([]);
        }, 500);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            closeCart();
        }
    };

    const handleContinueClick = () => {
        if( isLoggedIn ){
            //magia
        }else{
            openModal();
        }
    }

    const closeCart = () => dispatch(setIsCartOpen(false));

    const openModal = () => openModalFn('my_modal_1');

    useEffect(() => {
        if (isDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          if (isDropdown) {
            document.removeEventListener('mousedown', handleClickOutside);
          }
        };
    }, [isDropdown]);

    return (
        <Fragment>
        {
            isDropdown && (
                <div ref={componentRef} className="card card-compact bg-base-100 shadow w-96 h-72 border border-2 h-fit">
                    <div className="card-body">
                            {
                                shoppingItems.length !== 0 &&
                                <div className="grid grid-cols-8">
                                    <span className="col-span-3">Nombre</span>
                                    <span className="">Precio</span>
                                    <span className="ms-2 text-right">Cantidad</span>
                                </div>
                            }
                        <div className="items-container max-h-44 overflow-y-auto overflow-x-hidden">
                            {
                                shoppingItems.map((item) => (
                                    <div key={item.id} className={"card card-side gap-x-3 flex items-center border my-2 max-h-16 w-full "+ (removingRows.includes(item.id) ? 'fade-out' : '')}>
                                        <figure>
                                            <img
                                            src={item.imageUrl}
                                            alt="Item" 
                                            className="h-16 w-10"/>
                                        </figure>
                                        <span className="w-20 truncate text-left">{item.name}</span>
                                        <div className="grid grid-cols-4 w-40 justify-items-center gap-x-4">
                                            <span className="m-auto w-12 text-left truncate">{item.price}</span>
                                            <span className="m-auto w-5 truncate">{item.quantity}</span>
                                            <div className="grid grid-cols-1">
                                                <ScalableDiv>
                                                    <button className="h-6 w-6" onClick={() => addItem(item)}>
                                                        <AddIcon className="h-7 w-7" fill="oklch(var(--su))"/>
                                                    </button>
                                                </ScalableDiv>
                                                <ScalableDiv>
                                                    <button className="h-6 w-6" onClick={() => removeItem(item)}>
                                                        <RemoveIcon className="h-7 w-7" fill="oklch(var(--wa))"/>
                                                    </button>
                                                </ScalableDiv>
                                            </div>
                                            <ScalableDiv>
                                                <button className="h-8 w-8" onClick={() => clearItem(item)}>
                                                    <DeleteIcon className="h-9 w-9 my-auto" fill="oklch(var(--er))"/>
                                                </button>
                                            </ScalableDiv>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <span className="text-info">Total: ${total}</span>
                        <div className="card-actions">
                            <Link to={"carrito"} className="btn btn-outline btn-primary btn-block" onClick={closeCart}>Ver carrito</Link>
                        </div>
                    </div>
                </div>
            )
        }
        {
            !isDropdown && (
                <div className="flex justify-center mt-2">
                    <div className="grid grid-cols-8 w-8/12">
                        <span className="col-span-6 text-left font-bold">Mi carrito</span>
                        <div className="col-span-2 flex justify-end">
                            <button className="btn w-fit" onClick={emptyCart} disabled={cartCount === 0}>
                                <ClearIcon />
                                Vaciar
                            </button>
                        </div>
                        <div className="col-span-full">
                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr className="space-between">
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                            <th className="ms-5">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="items-container">
                                        {
                                            shoppingItems.map((item) => (
                                                <tr key={item.id} className={"hover " + (removingRows.includes(item.id) ? 'fade-out' : '')}>
                                                    <td>
                                                        <img
                                                        src={item.imageUrl}
                                                        alt="Item"
                                                        className="h-24"/>
                                                    </td>
                                                    <td className="truncate">{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <div className="grid grid-cols-3 w-fit">
                                                            <div className="grid grid-cols-1">
                                                                <ScalableDiv>
                                                                    <button className="h-10 w-10" onClick={() => addItem(item)}>
                                                                        <AddIcon className="h-10 w-10" fill="oklch(var(--su))"/>
                                                                    </button>
                                                                </ScalableDiv>
                                                                <ScalableDiv>
                                                                    <button className="h-10 w-10" onClick={() => removeItem(item)}>
                                                                        <RemoveIcon className="h-10 w-10" fill="oklch(var(--wa))"/>
                                                                    </button>
                                                                </ScalableDiv>
                                                            </div>
                                                            <ScalableDiv scale={1.1}>
                                                                <button className="h-14 w-14" onClick={() => clearItem(item)}>
                                                                    <DeleteIcon className="h-14 w-14 zoom my-auto" fill="oklch(var(--er))"/>
                                                                </button>
                                                            </ScalableDiv>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="col-span-full flex justify-end my-2">
                            <span className="text-info text-3xl">Total: ${total}</span>
                        </div>
                        <div className="col-span-full justify-end card-actions my-2">
                            <button className="btn text-right btn-primary" disabled={cartCount === 0} onClick={handleContinueClick}>
                                Continuar compra
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        </Fragment>
    );
}

export default ShoppingCart;