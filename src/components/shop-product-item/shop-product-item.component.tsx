import { FC, useState } from "react";
import { Product } from "../../store/product/product.types";
import {ReactComponent as StarIconActive} from '@material-design-icons/svg/outlined/star.svg';
import {ReactComponent as StarIconInactive} from '@material-design-icons/svg/outlined/star_border.svg';
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCanSaveCart, selectCartItems } from "../../store/cart/cart.selector";
import { toast } from "react-toastify";

interface ShopProductItemProps{
    product: Product
}

const ShopProductItem : FC<ShopProductItemProps> = ({product}) => {
    const shoppingItems = useSelector(selectCartItems);
    const canSaveCart = useSelector(selectCanSaveCart);
    const dispatch = useDispatch();
    
    const [isFavorite, setIsFavorite] = useState(false);

    //temp func
    const toggleIsFavorite = () =>{
        setIsFavorite(!isFavorite);
    }

    const addToCart = () => {
        dispatch(addItemToCart(shoppingItems, product, canSaveCart));
        toast.success('Producto agregado');
    }

    return (
        <div className="card border border-2">
            <div className="card-body">
                <div className="relative">
                    <ScalableDiv scale={1.3} className="absolute top-0 right-0">
                        <button className="btn btn-circle btn-ghost btn-xs hover:bg-base-300 hover:opacity-80 bg-base-200" onClick={toggleIsFavorite}>
                            {
                                isFavorite && <StarIconActive className="h-5 w-5"/>
                            }
                            {
                                !isFavorite && <StarIconInactive className="h-5 w-5"/>
                            }
                        </button>
                    </ScalableDiv>
                    
                    <img src={product.imageUrl} alt="" className="w-full" />
                </div>
                <div className="my-3 grid grid-cols-6">
                    <div className="col-span-4 grid grid-rows-2 text-left">
                        <div className="truncate product-name-container">
                            <span>{product.name}</span>
                        </div>
                        <div className="">
                            <span>${product.price}</span>
                        </div>
                    </div>
                    <div className="col-span-2">
                        <button className="btn btn-primary btn-outline" onClick={addToCart}>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopProductItem;