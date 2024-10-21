import { FC, useEffect, useState } from "react"
import { useAppDispatch } from "../../store/store";
import { setHasAcceptedOrderSummary, setIsShipmentInformationValid } from "../../store/checkout/checkout.actions";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTax, selectCartTotal, selectCartTotalWithoutTax } from "../../store/cart/cart.selector";
import ProductItem from "../product-item/product-item.component";

interface CheckoutOrderSummaryProps{
    shipmentPrice: number | undefined,
    setValuesFunction: (data: number | null) => void
}

const CheckoutOrderSummary: FC<CheckoutOrderSummaryProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const shoppingCartItems = useSelector(selectCartItems);
    const cartTotalWithoutTax = useSelector(selectCartTotalWithoutTax);
    const cartTax = useSelector(selectCartTax);
    const cartTotal = useSelector(selectCartTotal);

    const [total, setTotal] = useState(0);

    const dispatch = useAppDispatch();

    const onSubmit = (forward: boolean) => {
        if(forward){
            dispatch(setHasAcceptedOrderSummary(forward));
            props.setValuesFunction(total);
        }else{
            dispatch(setIsShipmentInformationValid(forward));
            props.setValuesFunction(null);
        }
    }

    useEffect(() => {
        if( cartTotal !== null && cartTotal !== undefined && props.shipmentPrice !== null && props.shipmentPrice !== undefined){
            setTotal(cartTotal + props.shipmentPrice);
        }
    }, [cartTotal, props.shipmentPrice]);

    return (
        <div className="checkout-order-summary mt-5" hidden={props.hidden}>
            <h3 className="text-left italic font-bold">Revisa tus datos antes de continuar</h3>
            <div className="grid grid-cols-12 justify-center">
                <div className="col-span-full mb-10 grid justify-center">
                    <div className="grid grid-cols-10 col-span-full text-left card-body">
                        <h3 className="col-span-full font-bold text-left mb-10">Productos</h3>
                        <span className="col-span-2">Imagen</span>
                        <span className="col-span-2 ms-3">Nombre</span>
                        <span className="col-span-2 ms-3">Cantidad</span>
                        <span className="col-span-2 ms-5">Precio</span>
                        <span className="col-span-2 ms-10">Total</span>
                    </div>
                    <div className="h-96 grid gap-y-5 overflow-x-auto">
                        {
                            shoppingCartItems.map(it => 
                                <ProductItem key={it.id} product={it} enableHoverEffect={false} className="h-fit"/>
                            )
                        }
                    </div>
                    <div className="col-span-full grid grid-cols-10 justify-items-end my-5">
                        <span className="col-span-full w-fit">Subtotal: {cartTotalWithoutTax}</span>
                        <span className="col-span-full w-fit">IVA: {cartTax}</span>
                        <span className="col-span-full w-fit">Envio: {props.shipmentPrice}</span>
                        <span className="col-span-full w-fit text-lg font-bold">Total: {total}</span>
                    </div>
                    <div className="col-span-full flex justify-between my-5">
                        <button className="btn btn-info btn-outline" onClick={() => onSubmit(false)}>Atras</button>
                        <button className="btn btn-info" onClick={() => onSubmit(true)}>Continuar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutOrderSummary;