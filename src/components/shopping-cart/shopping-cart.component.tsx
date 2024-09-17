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

interface ShoppingCartProps {
    isDropdown: boolean
}


const ShoppingCart: FC<ShoppingCartProps> = ({isDropdown}) => {
    const shoppingItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const cartCount = useSelector(selectCartCount);
    const isLoggedIn = useSelector(selectIsUserLoggedIn);

    const dispatch = useDispatch();
    const componentRef = useRef<HTMLDivElement>(null);

    const removeItem = (item: any) => dispatch(removeItemFromCart(shoppingItems, item));

    const clearItem = (item: any) => dispatch(clearItemFromCart(shoppingItems, item));

    const addItem = (item: any) => dispatch(addItemToCart(shoppingItems, item));

    const emptyCart = () => dispatch(clearCart());

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
                <div ref={componentRef} className="card card-compact bg-base-100 shadow w-72 h-72 border border-2 h-fit">
                    <div className="card-body">
                        <div className="max-h-44 overflow-y-auto overflow-x-hidden">
                            {
                                shoppingItems.map((item) => (
                                    <div key={item.id} className="card card-side gap-x-3 flex items-center border my-2 max-h-16 w-full">
                                        <figure>
                                            <img
                                            src={item.imageUrl}
                                            alt="Item" 
                                            className="h-16 w-10"/>
                                        </figure>
                                        <span className="w-20 truncate text-left">{item.name}</span>
                                        <div className="grid grid-cols-3 w-20 justify-items-center gap-x-4">
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
                <div className="grid grid-cols-8 items-center mt-2">
                    <span className="col-span-6 text-left">Mi carrito</span>
                    <div className="col-span-2 flex justify-end">
                        <button className="btn w-fit" onClick={emptyCart} disabled={cartCount === 0}>
                            <ClearIcon />
                            Vaciar
                        </button>
                    </div>
                    
                    <div className="col-span-full">
                        {
                            shoppingItems.map((item) => (
                                <div key={item.id} className="card card-side gap-x-3 grid grid-cols-12 items-center border my-2 max-h-24">
                                    <figure className="col-span-2 w-fit">
                                        <img
                                        src={item.imageUrl}
                                        alt="Item"
                                        className="h-24"/>
                                    </figure>
                                    <span className="col-span-5 truncate text-left">{item.name}</span>
                                    <div className="col-span-5 flex justify-end">
                                        <div className="grid grid-cols-3 w-fit">
                                            <span className="m-auto truncate">{item.quantity}</span>
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
                                        
                                    </div>
                                </div>
                            ))
                        }
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
            )
        }
        </Fragment>
    );
}

export default ShoppingCart;