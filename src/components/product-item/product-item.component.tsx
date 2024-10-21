import { FC, useEffect, useState } from "react"
import { CartItem } from "../../store/cart/cart.types"
import ScalableDiv from "../../utils/styled-components/scalable-div.styled"

interface ProductItemProps{
    product: Partial<CartItem>,
    scale?: number,
    enableHoverEffect?: boolean
}

const ProductItem: FC<ProductItemProps & React.HTMLAttributes<HTMLDivElement>> = ({
    product, 
    scale = 1, 
    enableHoverEffect = true,
    ...props
}) => {
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        if(product.price && product.quantity){
            setTotal(Math.round(product.price * product.quantity * 100)/100 );
        }else{
            setTotal(null);
        }
    }, [product])

    return (
        <ScalableDiv 
            className={"col-span-full card border border-2 " + (enableHoverEffect ? 'hover:bg-base-300 ' : '') + props.className} 
            scale={scale}
        >
            <div className="card-body grid grid-cols-9">
                <div className="col-span-2 flex ">
                    <img src={product.imageUrl} alt="" className="h-20" />
                </div>
                <div className="col-span-2 flex ">
                    <span className="my-auto">{product.name}</span>
                </div>
                {
                    product.quantity && 
                    <div className="col-span-2 flex ">
                        <span className="my-auto">{product.quantity}</span>
                    </div>
                }
                {
                    product.price && 
                    <div className="col-span-2 flex ">
                        <span className="my-auto">{product.price}</span>
                    </div>
                }
                {
                    total && 
                    <div className="col-span-1 flex ">
                        <span className="my-auto">{total}</span>
                    </div>
                }
            </div>
        </ScalableDiv>
    )
}

export default ProductItem;