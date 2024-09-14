import { FC, Fragment, useEffect, useState } from "react"
import { ReactComponent as AddIcon } from '@material-design-icons/svg/outlined/add_circle.svg';
import { ReactComponent as RemoveIcon } from '@material-design-icons/svg/outlined/do_not_disturb_on.svg';
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';
import { ReactComponent as ClearIcon } from '@material-design-icons/svg/outlined/clear_all.svg';
import { ReactComponent as ArrowIcon } from '@material-design-icons/svg/outlined/arrow_forward.svg';
import { shoppingItemsList } from "../../utils/constantes-test.utils";
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";

interface ShoppingCartProps {
    isDropdown: boolean
}


const ShoppingCart: FC<ShoppingCartProps> = ({isDropdown}) => {
    const [shoppingItems, setShoppingItems] = useState(shoppingItemsList);
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
                <div className="card card-compact bg-base-100 shadow w-72 h-72 border border-2">
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
                                                <ScalableDiv>
                                                    <AddIcon className="h-7 w-7" fill="oklch(var(--su))"/>
                                                </ScalableDiv>
                                                <ScalableDiv>
                                                    <RemoveIcon className="h-7 w-7" fill="oklch(var(--wa))"/>
                                                </ScalableDiv>
                                            </div>
                                            <ScalableDiv>
                                                <DeleteIcon className="h-10 w-10 my-auto" fill="oklch(var(--er))"/>
                                            </ScalableDiv>
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
                                                <ScalableDiv>
                                                    <AddIcon className="h-10 w-10" fill="oklch(var(--su))"/>
                                                </ScalableDiv>
                                                <ScalableDiv>
                                                    <RemoveIcon className="h-10 w-10" fill="oklch(var(--wa))"/>
                                                </ScalableDiv>
                                            </div>
                                            <ScalableDiv scale={1.03}>
                                                <DeleteIcon className="h-14 w-14 zoom my-auto" fill="oklch(var(--er))"/>
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