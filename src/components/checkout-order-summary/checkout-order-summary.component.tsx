import { FC, Fragment } from "react"
import { useAppDispatch } from "../../store/store";
import { addCheckoutDiscount, removeCheckoutDiscount, setHasAcceptedOrderSummary, setShipmentInformation } from "../../store/checkout/checkout.actions";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTax, selectCartTotalWithoutTax } from "../../store/cart/cart.selector";
import ProductItem from "../product-item/product-item.component";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "../../utils/constantes.utils";
import { selectCheckoutDiscounts, selectCheckoutTotal, selectCheckoutTotalDiscounts, selectShippingInformation } from "../../store/checkout/checkout.selector";
import { ReactComponent as CloseIcon } from '@material-design-icons/svg/outlined/close.svg';
import { SubmitHandler, useForm } from "react-hook-form";

interface CheckoutOrderSummaryProps{
}

type Inputs = {
    name: string,
}

const DEFAULT_VALUES = {
    name: '',
}

const CheckoutOrderSummary: FC<CheckoutOrderSummaryProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const shoppingCartItems = useSelector(selectCartItems);
    const cartTotalWithoutTax = useSelector(selectCartTotalWithoutTax);
    const cartTax = useSelector(selectCartTax);
    const shippingInformation = useSelector(selectShippingInformation);
    const checkoutTotalDiscounts = useSelector(selectCheckoutTotalDiscounts);
    const checkoutTotal = useSelector(selectCheckoutTotal);
    const discounts = useSelector(selectCheckoutDiscounts);

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({
        defaultValues: DEFAULT_VALUES
    });

    const onSubmit = (forward: boolean) => {
        if(forward){
            dispatch(setHasAcceptedOrderSummary(forward));
        }else{
            dispatch(setShipmentInformation(forward, shippingInformation));
        }
    }

    const fetchDiscount = async (name: string) => {
        try{
            if( name === ''){
                throw Error('No puedes subir nombre vacio');
            }
            let response = await axios.get(`${apiUrl}/discounts/checkout-promotion`, {
                params: {
                    name
                }
            });
            let discount = response.data;
            let alreadyExists = !!discounts.find(it => it.id === discount.id);

            dispatch(addCheckoutDiscount(discounts, discount));

            if(alreadyExists){
                toast("Descuento ya se esta usando", {
                    type: 'warning'
                });
            }else{
                toast('Descuento aplicado', {
                    type: 'success'
                });
            }
        }catch{
            toast('No fue posible agregar el descuento', {
                type: 'error'
            });
        }
    }

    const onSubmitCode: SubmitHandler<Inputs> = async (data: Inputs) => {
        fetchDiscount(data.name);
        reset();
    }

    const handleDeleteDiscount = (id: number) => {
        dispatch(removeCheckoutDiscount(discounts, id));
    }

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
                    <div className="card max-h-96 overflow-x-auto border border-1 my-5">
                        <form className="card-body flex flex-row items-end" onSubmit={handleSubmit(onSubmitCode)}>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Tengo un codigo</span>
                                </div>
                                <input id="name"
                                    type="text" placeholder="Codigo" 
                                    className="input input-bordered w-full max-w-xs" 
                                    {...register('name')}
                                />
                            </label>
                            <button type="submit" className="btn btn-secondary">Aplicar</button>
                        </form>
                        <div className="card-body justify-start">
                            <div className="grid grid-cols-2 items-center gap-y-3">
                                {
                                    discounts.map(discount => 
                                        <div key={discount.id} className="col-span-full flex justify-start items-center space-x-5 border border-1 rounded-md w-fit p-3">
                                            <span className="min-w-40 text-left">{discount.name}</span>
                                            <button className="btn btn-circle btn-error w-fill" onClick={() => handleDeleteDiscount(discount.id)}>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-span-full grid grid-cols-10 justify-items-end my-5">
                        <span className="col-span-full w-fit">Subtotal: ${cartTotalWithoutTax}</span>
                        <span className="col-span-full w-fit">IVA: ${cartTax}</span>
                        { 
                            checkoutTotalDiscounts > 0 && 
                            <span className="col-span-full w-fit">Descuento: ${checkoutTotalDiscounts}</span>
                        }
                        <span className="col-span-full w-fit">Envio mediante {shippingInformation?.shipmentCarrier?.name}: ${shippingInformation?.shipmentCarrier?.price}</span>
                        <span className="col-span-full w-fit text-lg font-bold">Total: ${checkoutTotal}</span>
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