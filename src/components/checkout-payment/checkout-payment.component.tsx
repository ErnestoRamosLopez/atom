import { FC, useEffect, useState } from "react";
import { CheckoutPaymentDetails } from "../../store/checkout/checkout.types";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { setHasAcceptedOrderSummary, setIsOrderReady, setIsShipmentInformationValid } from "../../store/checkout/checkout.actions";
import { mesesList } from "../../utils/constantes.utils";

interface CheckoutPaymentProps{
    setValuesFunction: (data: CheckoutPaymentDetails) => void
}

const DEFAULT_VALUES = {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    expirationDate: '',
    cvv: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<CheckoutPaymentDetails, any> | undefined} = {
    cardNumber: {
        required: 'Campo numero de tarjeta es requerido'
    },
    expiryMonth: {
        required: 'Campo mes de expiracion es requerido'
    },
    expiryYear: {
        required: 'Campo año de expiracion es requerido'
    },
    cvv: {
        required: 'Campo cvv es requerido',
        minLength: {
            message: 'Campo cvv requiere de 3 numeros',
            value: 3
        },
        maxLength: {
            message: 'Campo cvv requiere de 3 numeros',
            value: 3
        },
        validate: (value) => {
            let cvvRegex = /^[0-9]{3}$/;
            let isValid = cvvRegex.test(value);
            return isValid || 'Formato de cvv invalido';
        }
    },
}

const CheckoutPayment: FC<CheckoutPaymentProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch();

    const [likeVisa, setLikeVisa] = useState(false);
    const [likeMastercard, setLikeMastercard] = useState(false);

    const monthNumbers = mesesList.map((_, index) => (index + 1) < 10 ? `0${index + 1}` : index + 1);
    const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() + i);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<CheckoutPaymentDetails & {expiryMonth: string, expiryYear: string}>({
        defaultValues: DEFAULT_VALUES
    });

    const onSubmit: SubmitHandler<CheckoutPaymentDetails & {expiryMonth: string, expiryYear: string}> = async (data) => {
        const { expiryMonth, expiryYear, ...usefulData} = data;

        props.setValuesFunction(usefulData);
        dispatch(setIsOrderReady(true));
    }

    const goBack = () => {
        dispatch(setHasAcceptedOrderSummary(false));
    }

    const validateCardNumber = (cardNumber: string | undefined) => {
        if(!cardNumber){
            return 'Proporciona una tarjeta visa o mastercard valida';
        }
        let mastercardRegex = /^5[1-5][0-9]{14}$/;
        let visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;

        let isMastercard = mastercardRegex.test(cardNumber);
        let isVisa = visaRegex.test(cardNumber);

        return isVisa || isMastercard || 'Proporciona una tarjeta visa o mastercard valida';
    }

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(name === 'cardNumber'){
                let likeMastercardRegex = /^5[1-5][0-9]{0,14}$/;
                let likeVisaRegex = /^4[0-9]{0,15}$/;

                let isLikeMastercard = likeMastercardRegex.test(value.cardNumber!);
                let isLikeVisa = likeVisaRegex.test(value.cardNumber!);

                setLikeMastercard(isLikeMastercard);
                setLikeVisa(isLikeVisa);
            }
            if(name === 'expiryMonth' || name === 'expiryYear'){
                let expiryMonth = value.expiryMonth;
                let expiryYear = value.expiryYear;
                setValue('expirationDate', `${expiryMonth}/${expiryYear}`);
            }
        })
        return () => subscription.unsubscribe()
    }, [watch]);

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
                            <label className="input input-bordered flex items-center gap-2">
                                <input  
                                    id="cardNumber"
                                    type="text"
                                    placeholder="Numero de tarjeta" 
                                    className="grow"
                                    {
                                        ...register("cardNumber", {
                                            ...VALIDATIONS.cardNumber,
                                            validate: (value) => validateCardNumber(value)
                                        })
                                    }
                                />
                                {
                                    !likeMastercard && !likeVisa && <img className="h-10" src={require("../../assets/images/visa-mastercard.png")} alt=""/>
                                }
                                {
                                    likeMastercard && <img className="h-10" src={require("../../assets/images/mastercard.png")} alt=""/>
                                }
                                {
                                    likeVisa && <img className="h-10 max-w-20" src={require("../../assets/images/visa.png")} alt=""/>
                                }
                            </label>
                            <div className="label">
                                {errors.cardNumber && <span role="alert" className="label-text-alt text-error">{errors.cardNumber.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Fecha de expiracion</span>
                            </div>
                            <div className="grid grid-cols-2 text-left">
                                <span className="label-text">Mes</span>
                                <span className="label-text">Año</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <select className="select select-bordered w-fit" {...register("expiryMonth", VALIDATIONS.expiryMonth)}>
                                    <option value={""}>Seleccionar</option>
                                    {
                                        monthNumbers.map((item, index) => <option key={index} value={item}>{item}</option>)
                                    }
                                </select>
                                <span>/</span>
                                <select className="select select-bordered w-fit" {...register("expiryYear", VALIDATIONS.expiryYear)}>
                                    <option value={""}>Seleccionar</option>
                                    {
                                        years.map((item, index) => <option key={index} value={item}>{item}</option>)
                                    }
                                </select>
                            </div>
                            
                            <div className="label">
                                {errors.expiryMonth && <span role="alert" className="label-text-alt text-error">{errors.expiryMonth.message}</span>}
                            </div>
                            <div className="label">
                                {errors.expiryYear && <span role="alert" className="label-text-alt text-error">{errors.expiryYear.message}</span>}
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