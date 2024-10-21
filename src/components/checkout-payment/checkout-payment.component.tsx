import { FC } from "react";
import { CheckoutPaymentDetails } from "../../store/checkout/checkout.types";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { setHasAcceptedOrderSummary, setIsOrderReady, setIsShipmentInformationValid } from "../../store/checkout/checkout.actions";

interface CheckoutPaymentProps{
    setValuesFunction: (data: CheckoutPaymentDetails) => void
}

const DEFAULT_VALUES = {
    cardNumber: '',
    expirationDate: '',
    cvv: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<CheckoutPaymentDetails, any> | undefined} = {
    cardNumber: {
        required: 'Campo numero de tarjeta es requerido'
    },
    expirationDate: {
        required: 'Campo fecha de expiracion es requerido'
    },
    cvv: {
        required: 'Campo cvv es requerido'
    },
}

const CheckoutPayment: FC<CheckoutPaymentProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<CheckoutPaymentDetails>({
        defaultValues: DEFAULT_VALUES
    });

    const onSubmit: SubmitHandler<CheckoutPaymentDetails> = async (data) => {
        props.setValuesFunction(data);
        dispatch(setIsOrderReady(true));
    }

    const goBack = () => {
        dispatch(setHasAcceptedOrderSummary(false));
    }

    return (
        <div className={"checkout-payment mt-5 "+ props.className} hidden={props.hidden}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-left italic font-bold">Proporciona un metodo de pago</h3>
                <div className="grid grid-cols-12">
                    <div className="col-span-7 grid grid-cols-2 gap-x-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Numero de tarjeta</span>
                            </div>
                            <input  
                                id="cardNumber"
                                type="text"
                                placeholder="Numero de tarjeta" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("cardNumber", VALIDATIONS.cardNumber)}
                            />
                            <div className="label">
                                {errors.cardNumber && <span role="alert" className="label-text-alt text-error">{errors.cardNumber.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Fecha de expiracion</span>
                            </div>
                            <input  
                                id="expirationDate"
                                type="text"
                                placeholder="Fecha de expiracion" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("expirationDate", VALIDATIONS.expirationDate)}
                            />
                            <div className="label">
                                {errors.expirationDate && <span role="alert" className="label-text-alt text-error">{errors.expirationDate.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">CVV</span>
                            </div>
                            <input  
                                id="cvv"
                                type="text"
                                placeholder="CVV" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("cvv", VALIDATIONS.cvv)}
                            />
                            <div className="label">
                                {errors.cvv && <span role="alert" className="label-text-alt text-error">{errors.cvv.message}</span>}
                            </div>
                        </label>
                    </div>
                    <div className="col-span-1 divider divider-horizontal"></div>
                    <div className="col-span-4 grid">
                        <span className="mb-4">Metodos de pago externos</span>
                        <div className="grid gap-y-5 justify-center">
                            <label className="form-control w-full max-w-xs">
                                <button className="btn w-64 h-fit">
                                    <img src={require("../../assets/images/paypal-button.png")} alt="Pay with paypal" className="w-64 h-16"/>
                                </button>
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <button className="btn w-64 h-fit">
                                    <img src={require("../../assets/images/google-pay-button.png")} alt="Pay with google pay" className="w-64 h-16"/>
                                </button>
                            </label>
                        </div>
                    </div>
                    <div className="col-span-full flex justify-between my-5">
                        <button type="button" className="btn btn-info btn-outline" onClick={() => goBack()}>Atras</button>
                        <button className="btn btn-info">Continuar</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default CheckoutPayment;