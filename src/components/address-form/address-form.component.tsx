import { FC, useEffect, useState } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";
import { Address } from "../../interfaces/Address";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";

interface AddressFormProps {
    modalFunction?: (event: CustomModalEnum, data: Address) => void,
    data?: Address | null,
    isEdit: boolean
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
    shipmentCarrier: null,
}

const VALIDATIONS : {[key: string]: RegisterOptions<Address, any> | undefined} = {
    label: {
        required: 'Campo etiqueta es requerido',
        minLength: {
            value: 3,
            message: 'Campo etiqueta requiere de 3 caracteres'
        },
        maxLength: {
            value: 20,
            message: 'Campo etiqueta tiene 20 caracteres como maximo'
        }
    },
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

const AddressForm: FC<AddressFormProps> = ({
    data,
    ...props
}) => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<Address>({
        defaultValues: DEFAULT_VALUES
    });

    useEffect(() => {
        if(data !== null){
            setValue('label', data?.label ?? '');
            setValue('name', data?.name ?? '');
            setValue('lastname', data?.lastname ?? '');
            setValue('neighborhood', data?.neighborhood ?? '');
            setValue('street', data?.street ?? '');
            setValue('streetNumber', data?.streetNumber ?? 0);
            setValue('postalCode', data?.postalCode ?? '');
            setValue('city', data?.city ?? '');
            setValue('state', data?.state ?? '');
        }
    }, [data, setValue]);

    const onSubmit: SubmitHandler<Address> = async (data) => {
        props.modalFunction?.(CustomModalEnum.SUBMIT_ACTION, data);
        reset();
    }


    return (
        <div>
            <h2 className="font-bold text-lg text-left">{props.isEdit ? 'Editar ' : 'Crear ' } direccion</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="col-span-7 grid grid-cols-2 gap-x-5">
                    <label className="col-span-full form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Etiqueta</span>
                        </div>
                        <input  
                            id="label"
                            type="text"
                            placeholder="Etiqueta" 
                            className="input input-bordered w-full max-w-xs" 
                            {...register("label", VALIDATIONS.label)}
                        />
                        <div className="label">
                            {errors.label && <span role="alert" className="label-text-alt text-error">{errors.label.message}</span>}
                        </div>
                    </label>
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
                <div className="col-span-full mt-10">
                    <button type="submit" className=" btn btn-primary btn-block">Guardar</button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm;