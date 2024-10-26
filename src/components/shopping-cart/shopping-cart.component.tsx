import { FC, Fragment, useEffect, useRef, useState } from "react"
import { ReactComponent as AddIcon } from '@material-design-icons/svg/outlined/add_circle.svg';
import { ReactComponent as RemoveIcon } from '@material-design-icons/svg/outlined/do_not_disturb_on.svg';
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';
import { ReactComponent as ClearIcon } from '@material-design-icons/svg/outlined/clear_all.svg';
import { ReactComponent as ArrowIcon } from '@material-design-icons/svg/outlined/arrow_forward.svg';
import { ReactComponent as SearchIcon } from '@material-design-icons/svg/outlined/search.svg';
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectCanSaveCart, selectCartCount, selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";
import { addItemToCart, clearCart, clearItemFromCart, removeItemFromCart, setIsCartOpen } from "../../store/cart/cart.action";
import { Link, useNavigate } from "react-router-dom";
import { openModalFn } from "../../utils/modal.utils";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import './shopping-cart.styles.css';
import { Tooltip } from "react-tooltip";

interface ShoppingCartProps {
    isDropdown: boolean
}


const ShoppingCart: FC<ShoppingCartProps> = ({isDropdown}) => {
    const shoppingItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const cartCount = useSelector(selectCartCount);
    const isLoggedIn = useSelector(selectIsUserLoggedIn);
    const canSaveCart = useSelector(selectCanSaveCart);
    const navigate = useNavigate();

    const [removingRows, setRemovingRows] = useState<number[]>([]);
    const [selectedImage, setSelectedImage] = useState('');

    const dispatch = useDispatch();
    const componentRef = useRef<HTMLDivElement>(null);

    const removeItem = (item: any) => {
        const count = shoppingItems.find(it => it.id === item.id)!.quantity;
        if(count === 1){
            setRemovingRows(prev => [...prev, item.id]);
            setTimeout(() => {
                dispatch(removeItemFromCart(shoppingItems, item, canSaveCart));
                setRemovingRows(prev => prev.filter(it => it !== item.id));
            }, 500);
        }else{
            dispatch(removeItemFromCart(shoppingItems, item, canSaveCart));
        }
    }

    const clearItem = (item: any) => {
        setRemovingRows(prev => [...prev, item.id]);

        setTimeout(() => {
            dispatch(clearItemFromCart(shoppingItems, item, canSaveCart));
            setRemovingRows(prev => prev.filter(it => it !== item.id));
        }, 500);
    }

    const addItem = (item: any) => dispatch(addItemToCart(shoppingItems, item, canSaveCart));

    const emptyCart = () => {
        const rowIds = shoppingItems.map((row) => row.id);
        setRemovingRows(rowIds);

        setTimeout(() => {
            dispatch(clearCart(canSaveCart));
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
            navigate('/checkout');
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

    const viewImage = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        openModalFn('modal-product-image');
    }

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
                        <div className="items-container max-h-44 overflow-y-auto overflow-x-clip">
                            {
                                shoppingItems.map((item) => (
                                    <div key={item.id} className={"card card-side gap-x-3 flex items-center border my-2 max-h-16 w-full "+ (removingRows.includes(item.id) ? 'fade-out-effect' : '')}>
                                        <figure>
                                            <img
                                            src={item.imageUrl}
                                            alt="Item" 
                                            className="h-16 w-10"/>
                                        </figure>
                                        <div className="w-20">
                                            <div id={`item-name-text${item.id}`} className="truncate">
                                                <span className="text-left">{item.name}</span>
                                            </div>
                                            <Tooltip anchorSelect={`#item-name-text${item.id}`} className="custom-tooltip z-50" opacity={1}>
                                                {item.name}
                                            </Tooltip>
                                        </div>
                                        <div className="grid grid-cols-4 w-40 justify-items-center gap-x-4">
                                            <span className="m-auto w-12 text-left truncate">{item.price}</span>
                                            <span className="m-auto w-5 truncate">{item.quantity}</span>
                                            <div className="grid grid-cols-1">
                                                <ScalableDiv>
                                                    <button id="add-item-btn" className="h-6 w-6" onClick={() => addItem(item)}>
                                                        <AddIcon className="h-7 w-7" fill="oklch(var(--su))"/>
                                                    </button>
                                                </ScalableDiv>
                                                <Tooltip anchorSelect="#add-item-btn" className="custom-tooltip">
                                                    Agregar item
                                                </Tooltip>
                                                <ScalableDiv>
                                                    <button className="h-6 w-6" onClick={() => removeItem(item)}>
                                                        <RemoveIcon id="remove-item-btn" className="h-7 w-7" fill="oklch(var(--wa))"/>
                                                    </button>
                                                </ScalableDiv>
                                                <Tooltip anchorSelect="#remove-item-btn" className="custom-tooltip">
                                                    Remover un item
                                                </Tooltip>
                                            </div>
                                            <ScalableDiv>
                                                <button id="clear-item-btn" className="h-8 w-8" onClick={() => clearItem(item)}>
                                                    <DeleteIcon className="h-9 w-9 my-auto" fill="oklch(var(--er))"/>
                                                </button>
                                            </ScalableDiv>
                                            <Tooltip anchorSelect="#clear-item-btn" className="custom-tooltip">
                                                Remover todos
                                            </Tooltip>
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
                        <div className="col-span-full h-96">
                            <div className="overflow-x-auto h-96">
                                <table className="table table-lg table-pin-cols">
                                    {/* head */}
                                    <thead>
                                        <tr className="space-between sticky top-0">
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
                                                <tr key={item.id} className={"hover " + (removingRows.includes(item.id) ? 'fade-out-effect' : '')}>
                                                    <td>
                                                        <div className="relative product-image-container w-fit">
                                                            <img
                                                                src={item.imageUrl}
                                                                alt="Item"
                                                                className="h-24"
                                                            />
                                                            <div className="search-icon absolute top-0 right-0 left-0 bottom-0 m-auto w-1/2 h-1/2 text-center"
                                                                onClick={()=> viewImage(item.imageUrl)}
                                                            >
                                                                <button className="btn btn-circle">
                                                                    <SearchIcon />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="truncate">{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.price}</td>
                                                    <td>
                                                        <div className="grid grid-cols-2 w-fit gap-x-2">
                                                            <div className="grid grid-cols-1 gap-y-2">
                                                                <ScalableDiv>
                                                                    <button className="btn btn-success btn-outline" onClick={() => addItem(item)}>
                                                                        <AddIcon className="h-5 w-5"/>
                                                                        Agregar
                                                                    </button>
                                                                </ScalableDiv>
                                                                <ScalableDiv>
                                                                    <button className="btn btn-warning btn-outline" onClick={() => removeItem(item)}>
                                                                        <RemoveIcon className="h-5 w-5"/>
                                                                        Remover
                                                                    </button>
                                                                </ScalableDiv>
                                                            </div>
                                                            <div className="grid-cols-1 h-fit">
                                                                <ScalableDiv>
                                                                    <button className="btn btn-error btn-outline h-fit" onClick={() => clearItem(item)}>
                                                                        <DeleteIcon className="h-7 w-7 zoom my-auto"/>
                                                                        Limpiar
                                                                    </button>
                                                                </ScalableDiv>
                                                            </div>
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
            <dialog id="modal-product-image" className="modal">
                <div className="modal-box flex justify-center">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className="modal-action">
                        <img src={selectedImage} />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </Fragment>
    );
}

export default ShoppingCart;