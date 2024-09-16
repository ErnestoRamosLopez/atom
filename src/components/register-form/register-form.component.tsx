import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import { useEffect, useState } from "react";
import SwapState from "../swap-state/swap-state.component";
import axios from "axios";
import { User } from "../../store/user/user.types";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../store/user/user.action";

type Inputs = User & {
    passwordConfirm: string
}

const DEFAULT_VALUES = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    passwordConfirm: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<Inputs, any> | undefined} = {
    name: {
        required: 'Campo nombre es requerido',
        minLength: {
            value: 3,
            message: 'Campo nombre requiere de 3 caracteres'
        }
    },
    lastname: {
        required: 'Campo apellidos es requerido',
        minLength: {
            value: 3,
            message: 'Campo apellidos requiere de 3 caracteres'
        }
    },
    email: {
        required: 'Campo email es requerido'
    },
    password: {
        required: 'Campo contraseña es requerido',
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            message: 'Formato invalido'
        }
    },
    passwordConfirm: {
        validate: (value, formValues) => {
            return (!!value && !!formValues.password && value === formValues.password) || 'Las contraseñas no coinciden';
        }
    }
}

const RegisterForm = () => {
    const [hasMinLength, setHasMinLength] = useState(false);
    const [hasOneLowercase, setHasOneLowercase] = useState(false);
    const [hasOneUppercase, setHasOneUppercase] = useState(false);
    const [hasOneNumber, setHasOneNumber] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPassowrdValid] = useState(false);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm<Inputs>({
        defaultValues: DEFAULT_VALUES
    });

    // Callback version of watch.  It's your responsibility to unsubscribe when done.
    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(name === 'password'){
                setHasOneLowercase(/[a-z]/.test(value.password ?? ''));
                setHasOneUppercase(/[A-Z]/.test(value.password ?? ''));
                setHasOneNumber(/\d/.test(value.password ?? ''));
                setHasMinLength((value.password?.length ?? 0) >= 8);
            }
            if( name === 'password' || name === 'passwordConfirm'){
                let isValid: boolean = !!value.password && !!value.passwordConfirm && value.password === value.passwordConfirm;
                setIsConfirmPassowrdValid(isValid);
            }
        })
        return () => subscription.unsubscribe()
    }, [watch])

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        const { passwordConfirm, ...newUser } = data;
        const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';

        const validacionEmail = await axios.get(`${apiUrl}/users?email=${data.email}`);
        if(validacionEmail.data.length){
            alert('ya existe un usuario con ese email');
            return;
        }
        
        const registroResponse = await axios.post(`${apiUrl}/users`, newUser);
        if(registroResponse.status === 201){
           const {password, ...user} = registroResponse.data;
           dispatch(setCurrentUser(user));
           reset();
        }
    }

    return (
        <div className="grid justify-center overflow-y-auto">
            <form className="grid text-left gap-y-4 border-2 rounded-md p-4 my-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-80">
                    <label htmlFor="name" className="block text-sm font-medium leading-6">
                        Nombre
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="name"
                                type="text"
                                className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                {...register('name', VALIDATIONS.name)}
                            />
                        </div>
                        <div className="label">
                            {errors.name && <span role="alert" className="label-text-alt text-error">{errors.name.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-80">
                    <label htmlFor="lastname" className="block text-sm font-medium leading-6">
                        Apellidos
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="lastname"
                                type="text"
                                className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                {...register('lastname', VALIDATIONS.lastname)}
                            />
                        </div>
                        <div className="label">
                            {errors.lastname && <span role="alert" className="label-text-alt text-error">{errors.lastname.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-80">
                    <label htmlFor="email" className="block text-sm font-medium leading-6">
                        Email
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="email"
                                type="email"
                                className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                {...register('email', VALIDATIONS.email)}
                            />
                        </div>
                        <div className="label">
                            {errors.email && <span role="alert" className="label-text-alt text-error">{errors.email.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-80">
                    <label htmlFor="password" className="block text-sm font-medium leading-6">
                        Contraseña
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="password"
                                type="password"
                                className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                {...register('password', VALIDATIONS.password)}
                            />
                        </div>
                        <div className="label">
                            {errors.password && <span role="alert" className="label-text-alt text-error">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-80">
                    <label htmlFor="passwordConfirm" className="block text-sm font-medium leading-6">
                        Confirma la contraseña
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                id="passwordConfirm"
                                type="password"
                                className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                {...register('passwordConfirm', VALIDATIONS.passwordConfirm)}
                            />
                        </div>
                        <div className="label">
                            {errors.passwordConfirm && <span role="alert" className="label-text-alt text-error">{errors.passwordConfirm.message}</span>}
                        </div>
                    </div>
                </div>
                <div className="w-80 card border border-2">
                    <div className="card-body">
                        <h2 className="card-title">
                            Validacion de contraseña
                        </h2>
                        <ul>
                            <li><SwapState state={hasOneLowercase} message="Tiene por lo menos 1 letra minuscula"/></li>
                            <li><SwapState state={hasOneUppercase} message="Tiene por lo menos 1 letra mayuscula"/></li>
                            <li><SwapState state={hasOneNumber} message="Tiene por lo menos 1 numero"/></li>
                            <li><SwapState state={hasMinLength} message="Tiene por lo menos 8 caracteres"/></li>
                            <li><SwapState state={isConfirmPasswordValid} message="Las contraseñas coinciden"/></li>
                        </ul>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline">Registrarte</button>
                {/* <button onClick={finishAuthentication} className="btn btn-outline">Registrarse</button> */}
            </form>
            <div className="grid gap-y-4 border-2 rounded-md p-4 my-4">
                <span>Registrate con tus redes sociales</span>
                <div className="grid grid-cols-3 place-content-around justify-items-center">
                    <button className="">
                        <ScalableDiv>
                            <img className="h-10 w-10" src={require("../../assets/images/google-logo.png")} alt=""/>
                        </ScalableDiv>
                    </button>
                    <button className="">
                        <ScalableDiv>
                            <img className="h-10 w-10" src={require("../../assets/images/facebook-logo.png")} alt=""/>
                        </ScalableDiv>
                    </button>
                    <button>
                        <ScalableDiv>
                            <img className="h-10 w-10" src={require("../../assets/images/twitter-logo.png")} alt=""/>
                        </ScalableDiv>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;