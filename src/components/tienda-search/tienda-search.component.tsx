import { FC, useState } from "react";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import {ReactComponent as SearchIcon} from '@material-design-icons/svg/outlined/search.svg';
import {ReactComponent as FilterIcon} from '@material-design-icons/svg/outlined/tune.svg';
import {ReactComponent as ClearIcon} from '@material-design-icons/svg/outlined/clear_all.svg';

type Inputs = {
    precioMin: number | string,
    precioMax: number | string,
    nombre: string
}

const DEFAULT_VALUES = {
    precioMin: '',
    precioMax: '',
    nombre: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<Inputs, any> | undefined} = {
    precioMin: {
        required: false,
        min: {
            message: 'El valor minimo es cero',
            value: 0
        },
        deps: ['precioMax']
    },
    precioMax: {
        validate: (value, formValues) => {
            let isPrecioMinNumber = formValues.precioMin !== undefined && formValues.precioMin !== '';
            let isCurrentPrecioNumber = value !== undefined && value !== '';
            
            return (
                (!isPrecioMinNumber && !isCurrentPrecioNumber) || 
                (isPrecioMinNumber && !isCurrentPrecioNumber) || 
                (!isPrecioMinNumber && isCurrentPrecioNumber && Number(value) >= 0) || 
                (isPrecioMinNumber && isCurrentPrecioNumber && Number(value) >= Number(formValues.precioMin))
            ) || 'Proporciona un numero valido';
        }
    }
}

type TiendaSearchProps = {
    handleSearchComplete: (response: any) => void
}

const TiendaSearch : FC<TiendaSearchProps> = (props) => {
    const [expandFilters, setExpandFilters] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Inputs>({
        defaultValues: DEFAULT_VALUES
    });

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const search = {
            minPrecio: data.precioMin,
            maxPrecio: data.precioMax,
            nombre: data.nombre
        }
        props.handleSearchComplete(search);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"card my-3 "+ (expandFilters ? 'border border-1 bg-base-200 ' : '')}>
            {
                !expandFilters && 
                <div className={"grid grid-cols-2 "+ (expandFilters ? 'hidden' : '')}>
                    <div className="flex w-80">
                        <label className="input input-bordered flex items-center gap-2">
                            <input id="nombre" type="text" className="grow" placeholder="Buscar" {...register('nombre')}/>
                        </label>
                    </div>
                    <div className="flex justify-end gap-x-2">
                        <button type="submit" className="btn">
                            <SearchIcon className="h-4 w-4" />
                            Buscar
                        </button>
                        <button type="button" className="btn" onClick={() => {setExpandFilters(!expandFilters);}}>
                            <FilterIcon className="h-4 w-4" />
                            Mas filtros
                        </button>
                    </div> 
                </div>
            }
            
            <div className={"col-span-full duration-300 " + (expandFilters ? '' : 'hidden')}>
                <div className="card-body ">
                    <h2>Filtros</h2>
                    <div className="grid grid-cols-7 text-left" >
                        {
                            expandFilters &&
                            <div className="mt-2 col-span-full w-80">
                                <label htmlFor="nombre" className="block text-sm font-medium leading-6">
                                    Nombre
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <input
                                            id="nombre"
                                            type="text"
                                            className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                            {...register('nombre')}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="mt-2 col-span-3">
                            <label htmlFor="precioMin" className="block text-sm font-medium leading-6">
                                Precio Minimo
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="precioMin"
                                        type="number"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                        {...register('precioMin', VALIDATIONS.precioMin)}
                                    />
                                </div>
                                <div className="label">
                                    {errors.precioMin && <span role="alert" className="label-text-alt text-error">{errors.precioMin.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            -
                        </div>
                        <div className="mt-2 col-span-3">
                            <label htmlFor="precioMax" className="block text-sm font-medium leading-6">
                                Precio Maximo
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="precioMax"
                                        type="number"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                        {...register('precioMax', VALIDATIONS.precioMax)}
                                    />
                                </div>
                                <div className="label">
                                    {errors.precioMax && <span role="alert" className="label-text-alt text-error">{errors.precioMax.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-actions justify-end text-right">
                        <button type="submit" className="btn btn-primary">
                            <SearchIcon className="h-4 w-4" />
                            Buscar
                        </button>
                        <button type="button" className="btn btn-ghost" onClick={() => setExpandFilters(false)}>Cancelar</button>
                        <button type="button" className="btn btn-ghost" onClick={() => reset()}>
                            <ClearIcon className="h-4 w-4"/>
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>
            
            
        </form>
    )
}

export default TiendaSearch;