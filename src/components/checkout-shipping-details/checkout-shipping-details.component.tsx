import { FC, SetStateAction, useEffect, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { setIsShipmentInformationValid } from "../../store/checkout/checkout.actions";
import { CheckoutShipmentDetails } from "../../store/checkout/checkout.types";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/constantes.utils";

interface CheckoutShippingDetailsProps {
    setValuesFunction: (data: CheckoutShipmentDetails) => void
}

const DEFAULT_VALUES = {
    name: '',
    lastname: '',
    street: '',
    streetNumber: undefined,
    postalCode: '',
    neighborhood: '',
    city: '',
    state: '',
    shipmentId: undefined
}

const VALIDATIONS : {[key: string]: RegisterOptions<CheckoutShipmentDetails, any> | undefined} = {
    name: {
        required: 'Campo nombre es requerido'
    },
    lastname: {
        required: 'Campo apellido es requerido'
    },
    street: {
        required: 'Campo calle es requerido'
    },
    streetNumber: {
        required: 'Campo numero exterior es requerido'
    },
    postalCode: {
        required: 'Campo codigo postal es requerido'
    },
    neighborhood: {
        required: 'Campo colonia es requerido'
    },
    city: {
        required: 'Campo ciudad es requerido'
    },
    state: {
        required: 'Campo estado es requerido'
    },
    shipmentId: {
        required: 'Campo metodo de envio es requerido'
    }
}

const CheckoutShippingDetails: FC<CheckoutShippingDetailsProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch();
    const [shipmentOptions, setShipmentOptions] = useState<{id: number, name: string, price: number}[]>([]);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<CheckoutShipmentDetails>({
        defaultValues: DEFAULT_VALUES
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(name === 'shipmentId'){
                if(!value.shipmentId){
                    setValue('shipmentPrice', 0);
                }
                
                const shipment = shipmentOptions.find(it => it.id === parseInt(`${value.shipmentId}`))!;
                setValue('shipmentPrice', shipment.price);
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue, shipmentOptions]);

    useEffect(() => {
        const fetchShipmentCarriers = async () => {
            try{
                const response = await axios.get(`${apiUrl}/shipping-carriers`);
                setShipmentOptions(response.data);
            }catch{
                setShipmentOptions([]);
            }
        }
        fetchShipmentCarriers();
    }, []);

    const onSubmit: SubmitHandler<CheckoutShipmentDetails> = async (data) => {
        dispatch(setIsShipmentInformationValid(true));
        props.setValuesFunction(data);
    }

    return (
        <div className="shipping-details mt-5" hidden={props.hidden}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-left italic font-bold">Proporciona tus datos</h3>
                <div className="grid grid-cols-12">
                    <div className="col-span-7 grid grid-cols-2 gap-x-5">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Nombre</span>
                            </div>
                            <input  
                                id="name"
                                type="text"
                                placeholder="Nombre" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("name", VALIDATIONS.name)}
                            />
                            <div className="label">
                                {errors.name && <span role="alert" className="label-text-alt text-error">{errors.name.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Apellido</span>
                            </div>
                            <input  
                                id="lastname"
                                type="text"
                                placeholder="Apellido" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("lastname", VALIDATIONS.lastname)}
                            />
                            <div className="label">
                                {errors.lastname && <span role="alert" className="label-text-alt text-error">{errors.lastname.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Calle</span>
                            </div>
                            <input  
                                id="street"
                                type="text"
                                placeholder="Calle" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("street", VALIDATIONS.street)}
                            />
                            <div className="label">
                                {errors.street && <span role="alert" className="label-text-alt text-error">{errors.street.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Numero exterior</span>
                            </div>
                            <input  
                                id="streetNumber"
                                type="text"
                                placeholder="Numero exterior" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("streetNumber", VALIDATIONS.streetNumber)}
                            />
                            <div className="label">
                                {errors.streetNumber && <span role="alert" className="label-text-alt text-error">{errors.streetNumber.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Codigo postal</span>
                            </div>
                            <input  
                                id="postalCode"
                                type="text"
                                placeholder="Codigo postal" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("postalCode", VALIDATIONS.postalCode)}
                            />
                            <div className="label">
                                {errors.postalCode && <span role="alert" className="label-text-alt text-error">{errors.postalCode.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Colonia</span>
                            </div>
                            <input  
                                id="neighborhood"
                                type="text"
                                placeholder="Colonia" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("neighborhood", VALIDATIONS.neighborhood)}
                            />
                            <div className="label">
                                {errors.neighborhood && <span role="alert" className="label-text-alt text-error">{errors.neighborhood.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Ciudad</span>
                            </div>
                            <input  
                                id="city"
                                type="text"
                                placeholder="Ciudad" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("city", VALIDATIONS.city)}
                            />
                            <div className="label">
                                {errors.city && <span role="alert" className="label-text-alt text-error">{errors.city.message}</span>}
                            </div>
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Estado</span>
                            </div>
                            <input  
                                id="state"
                                type="text"
                                placeholder="Estado" 
                                className="input input-bordered w-full max-w-xs" 
                                {...register("state", VALIDATIONS.state)}
                            />
                            <div className="label">
                                {errors.state && <span role="alert" className="label-text-alt text-error">{errors.state.message}</span>}
                            </div>
                        </label>
                    </div>
                    <div className="col-span-1 divider divider-horizontal"></div>
                    <div className="col-span-4">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-bold">Metodo de envio</span>
                            </div>
                            <select className="select select-bordered w-full max-w-xs" {...register("shipmentId", VALIDATIONS.shipmentId)}>
                                <option value={""}>Seleccionar</option>
                                {
                                    shipmentOptions.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
                                }
                            </select>
                            <div className="label">
                                {errors.shipmentId && <span role="alert" className="label-text-alt text-error">{errors.shipmentId.message}</span>}
                            </div>
                        </label>
                    </div>
                    <div className="col-span-full flex justify-end">
                        <button type="submit" className=" btn btn-info w-fit">Continuar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CheckoutShippingDetails;