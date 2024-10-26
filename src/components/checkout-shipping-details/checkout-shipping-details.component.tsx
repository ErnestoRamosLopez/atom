import { FC, useEffect, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../../store/store";
import { setShipmentInformation } from "../../store/checkout/checkout.actions";
import { CheckoutShipmentDetails } from "../../store/checkout/checkout.types";
import axios, { CancelTokenSource } from "axios";
import { apiUrl } from "../../utils/constantes.utils";
import { ShipmentCarrier } from "../../interfaces/ShipmentCarrier";
import { Address } from "../../interfaces/Address";

interface CheckoutShippingDetailsProps {

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
    shipmentCarrier: null
}

const VALIDATIONS : {[key: string]: RegisterOptions<CheckoutShipmentDetails, any> | undefined} = {
    name: {
        required: 'Campo nombre es requerido',
        minLength: {
            value: 3,
            message: 'Campo nombre requiere de 3 caracteres'
        }
    },
    lastname: {
        required: 'Campo apellido es requerido',
        minLength: {
            value: 3,
            message: 'Campo apellido requiere de 3 caracteres'
        }
    },
    street: {
        required: 'Campo calle es requerido',
        minLength: {
            value: 3,
            message: 'Campo apellido requiere de 3 caracteres'
        }
    },
    streetNumber: {
        required: 'Campo numero exterior es requerido',
        minLength: {
            value: 3,
            message: 'Campo numero exterior requiere de 3 caracteres'
        }
    },
    postalCode: {
        required: 'Campo codigo postal es requerido',
        validate: (value) => {
            let regexPostalCodeMX = /^\d{5}$/;
            return regexPostalCodeMX.test(value) || 'Formato invalido';
        }
    },
    neighborhood: {
        required: 'Campo colonia es requerido',
        minLength: {
            value: 3,
            message: 'Campo colonia requiere de 3 caracteres'
        }
    },
    city: {
        required: 'Campo ciudad es requerido',
        minLength: {
            value: 3,
            message: 'Campo ciudad requiere de 3 caracteres'
        }
    },
    state: {
        required: 'Campo estado es requerido',
        minLength: {
            value: 3,
            message: 'Campo estado requiere de 3 caracteres'
        }
    },
    shipmentCarrier: {
        required: 'Campo metodo de envio es requerido',
    }
}

const CheckoutShippingDetails: FC<CheckoutShippingDetailsProps & React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch();

    const [shipmentOptions, setShipmentOptions] = useState<ShipmentCarrier[]>([]);
    const [addressOptions, setAddressOptions] = useState<Address[]>([]);
    const [isComponentReady, setIsComponentReady] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

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

    const handleShipmentCarrierChange = (id: string) => shipmentOptions.find(it => it.id === parseInt(`${id}`)) ?? null;

    const fetchShipmentCarriers = async (source: CancelTokenSource) => {
        try{
            const response = await axios.get(`${apiUrl}/shipping-carriers`, {
                cancelToken: source.token
            });
            setShipmentOptions(response.data);
        }catch{
            setShipmentOptions([]);
        }
    }

    const fetchAddresses = async (source: CancelTokenSource) => {
        try{
            const response = await axios.get(`${apiUrl}/profile/address`, {
                cancelToken: source.token
            });
            setAddressOptions(response.data);
        }catch{
            setAddressOptions([]);
        }
    }

    const initializeComponent = async (source: CancelTokenSource) => {
        try{
            const promiseArray = [];
            promiseArray.push( fetchShipmentCarriers(source) );
            promiseArray.push( fetchAddresses(source) );
            await Promise.all(promiseArray);
        }catch{

        }finally{
            //usuario tendra que recargar pagina en caso de estar fallando los servicios
            setIsComponentReady(true);
        }
    }

    useEffect(() => {
        const source = axios.CancelToken.source();
        initializeComponent(source);

        return () => {
            source.cancel("Operation canceled due to new request.");
        }
    }, []);

    const onSubmit: SubmitHandler<CheckoutShipmentDetails> = async (data) => {
        dispatch(setShipmentInformation(true, data));
    }

    const handleAddressChange = (event: React.FormEvent<HTMLSelectElement>) => {
        if(event.currentTarget.value){
            let selectedAddress = addressOptions.find(it => it.id === parseInt(event.currentTarget.value))!;
            setSelectedAddress( selectedAddress );
            setValue('label', selectedAddress.label);
            setValue('name', selectedAddress.name);
            setValue('lastname', selectedAddress.lastname);
            setValue('street', selectedAddress.street);
            setValue('streetNumber', selectedAddress.streetNumber);
            setValue('neighborhood', selectedAddress.neighborhood);
            setValue('city', selectedAddress.city);
            setValue('state', selectedAddress.state);
            setValue('postalCode', selectedAddress.postalCode);
        }else{
            setSelectedAddress( null );
            reset();
        }
    }

    return (
        <div className="shipping-details mt-5" hidden={props.hidden}>
            {
                !isComponentReady ? 
                (
                    <div>
                        Loading...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="text-left italic font-bold my-3">Proporciona tus datos</h3>
                        <div className="grid grid-cols-12">
                            <div className="col-span-7 grid grid-cols-2 gap-x-5">
                                {
                                    addressOptions.length > 0 &&
                                    <label className="col-span-full form-control w-full max-w-xs my-3">
                                        <div className="label">
                                            <span className="label-text">Direcciones guardadas</span>
                                        </div>
                                        <select className="select select-bordered w-full max-w-xs" onChange={(evt) => handleAddressChange(evt)}>
                                            <option value={""}>Seleccionar</option>
                                            {
                                                addressOptions.map(item => <option key={item.id} value={item.id}>{item.label}</option>)
                                            }
                                        </select>
                                    </label>
                                }
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Nombre</span>
                                    </div>
                                    <input  
                                        id="name"
                                        type="text"
                                        placeholder="Nombre" 
                                        className="input input-bordered w-full max-w-xs" 
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                        disabled={selectedAddress !== null}
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
                                    <select className="select select-bordered w-full max-w-xs" {...register("shipmentCarrier", {
                                            ...VALIDATIONS.shipmentCarrier,
                                            setValueAs: handleShipmentCarrierChange
                                        })}
                                    >
                                        <option value={""}>Seleccionar</option>
                                        {
                                            shipmentOptions.map(item => <option key={item.id} value={item.id}>{item.name} (${item.price})</option>)
                                        }
                                    </select>
                                    <div className="label">
                                        {errors.shipmentCarrier && <span role="alert" className="label-text-alt text-error">{errors.shipmentCarrier.message}</span>}
                                    </div>
                                </label>
                            </div>
                            <div className="col-span-full flex justify-end">
                                <button type="submit" className=" btn btn-info w-fit">Continuar</button>
                            </div>
                        </div>
                    </form>
                )
            }
            
        </div>
    )
}

export default CheckoutShippingDetails;