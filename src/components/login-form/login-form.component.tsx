import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import ScalableDiv from "../../utils/styled-components/scalable-div.styled";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { FC, useState } from "react";
import { ReactComponent as WarningIcon } from '@material-design-icons/svg/outlined/warning.svg';
import { ReactComponent as CloseIcon } from '@material-design-icons/svg/outlined/close.svg';
import { User } from "../../store/user/user.types";
import { apiUrl } from "../../utils/constantes.utils";

type Inputs = {
    email: string,
    password: string
}

const DEFAULT_VALUES = {
    email: '',
    password: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<Inputs, any> | undefined} = {
    email: {
        required: 'Campo email es requerido'
    },
    password: {
        required: 'Campo contraseña es requerido'
    }
}

type LoginFormProps = {
    handleLoginSuccess: (user: User, message: string) => void,
    startGoogleLogin: () => void
}

const LoginForm: FC<LoginFormProps> = (props) => {
    const [errorMessage, setErrorMessage] = useState('');
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

    const dismissErrorMessage = () => setErrorMessage('');

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try{
            const loginUser = await axios.post(`${apiUrl}/auth/login`, data);
            if(loginUser.status === 200){
                const user = loginUser.data;
                props.handleLoginSuccess(user, 'Inicio de sesion exitoso');
            }
        }catch(ex: any){
            if( ex instanceof AxiosError){
                const data = ex.response?.data;
                const message = data.message ?? '';
                setErrorMessage(message);
            }
        }
        
    }

    return (
        <div className="grid justify-center">
            <form className="grid text-left gap-y-4 border-2 rounded-md p-4 my-4" onSubmit={handleSubmit(onSubmit)}>
                {
                    errorMessage !== '' &&
                    <div role="alert" className="alert alert-warning w-80">
                        <WarningIcon />
                        <span>{errorMessage}</span>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => dismissErrorMessage()}>
                            <CloseIcon />
                        </button>
                    </div>
                }
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
                                {...register("email", VALIDATIONS.email)}
                            />
                        </div>
                    </div>
                    <div className="label">
                        {errors.email && <span role="alert" className="label-text-alt text-error">{errors.email.message}</span>}
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
                                {...register("password", VALIDATIONS.password)}
                            />
                        </div>
                        <div className="label">
                            {errors.password && <span role="alert" className="label-text-alt text-error">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn-login btn btn-outline">Iniciar sesión</button>
                <div className="w-80">
                    <a className="link w-min">Olvidaste tu contraseña?</a>
                </div>
            </form>
            <div className="grid gap-y-4 border-2 rounded-md p-4 my-4">
                <span>Inicia sesion con tus redes sociales</span>
                <div className="grid grid-cols-3 place-content-around justify-items-center">
                    <button className="" onClick={props.startGoogleLogin}>
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

export default LoginForm;