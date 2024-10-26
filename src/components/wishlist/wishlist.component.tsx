import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCanSaveWishlist, selectWishlistItems } from "../../store/wishlist/wishlist.selector";
import { useAppDispatch } from "../../store/store";
import { Tooltip } from "react-tooltip";
import { removeItemFromWishlist, setIsWishlistOpen } from "../../store/wishlist/wishlist.action";
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { ReactComponent as DeleteIcon } from '@material-design-icons/svg/outlined/delete.svg';

const Wishlist: FC = () => {
    const wishlistItems = useSelector(selectWishlistItems);
    const canSaveWishlist = useSelector(selectCanSaveWishlist);

    const [removingRows, setRemovingRows] = useState<number[]>([]);

    const dispatch = useAppDispatch();
    const componentRef = useRef<HTMLDivElement>(null);

    const closeWishlist = () => dispatch(setIsWishlistOpen(false));

    const handleClickOutside = (event: MouseEvent) => {
        if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
            closeWishlist();
        }
    };

    const removeItem = (item: any) => {
        setRemovingRows(prev => [...prev, item.id]);
        setTimeout(() => {
            dispatch(removeItemFromWishlist(wishlistItems, item, canSaveWishlist));
            setRemovingRows(prev => prev.filter(it => it !== item.id));
        }, 500);
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={componentRef} className="card card-compact bg-base-100 shadow w-96 h-72 border border-2 h-fit">
            <div className="card-body">
                <h2 className="font-bold text-lg">Lista de deseados</h2>
                {
                    wishlistItems.length !== 0 &&
                    <div className="grid grid-cols-6">
                        <span className="col-span-1"></span>
                        <span className="col-span-1 text-left">Nombre</span>
                        <span className="text-right">Precio</span>
                    </div>
                }
                <div className="items-container max-h-44 overflow-y-auto overflow-x-clip">
                    {
                        wishlistItems.map((item) => (
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
                                <div className="grid grid-cols-4 w-40 justify-items-end gap-x-4">
                                    <span className="m-auto w-12 text-left truncate">{item.price}</span>
                                    <ScalableDiv className="col-span-3">
                                        <button id="clear-item-btn" className="h-8 w-8" onClick={() => removeItem(item)}>
                                            <DeleteIcon className="h-9 w-9 my-auto" fill="oklch(var(--er))"/>
                                        </button>
                                    </ScalableDiv>
                                    <Tooltip anchorSelect="#clear-item-btn" className="custom-tooltip">
                                        Remover
                                    </Tooltip>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Wishlist;