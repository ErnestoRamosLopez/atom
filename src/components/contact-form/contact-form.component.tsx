import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3-safe";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl } from "../../utils/constantes.utils";
import { useNavigate } from "react-router-dom";
import './contact-form.styles.css';

type Inputs = {
    email: string,
    title: string,
    description: string,
    userId: string
}

const DEFAULT_VALUES = {
    email: '',
    title: '',
    description: '',
    userId: ''
}

const VALIDATIONS : {[key: string]: RegisterOptions<Inputs, any> | undefined} = {
    email: {
        required: 'Campo email es requerido',
        minLength: {
            value: 3,
            message: 'Campo email requiere de 3 caracteres'
        },
    },
    title: {
        required: 'Campo titulo es requerido',
        minLength: {
            value: 3,
            message: 'Campo titulo requiere de 3 caracteres'
        }
    },
    description: {
        required: 'Campo descripcion es requerido',
        minLength: {
            value: 25,
            message: 'Campo descripcion requiere de 25 caracteres'
        },
        maxLength: {
            value: 150,
            message: 'Campo descripcion acepta hasta 150 caracteres'
        }
    },
}

const ContactForm: FC = () => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    //const [recaptchaToken, setRecaptchaToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [descriptionLength, setDescriptionLength] = useState(0);
    const navigate = useNavigate();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async (data: Inputs) => {
        if (!executeRecaptcha) {
            return;
        }

        const recaptchaToken = await executeRecaptcha('contact');
        if( !recaptchaToken || data.userId !== ''){
            toast.error('Ocurrio un error, intentalo mas tarde');
            setIsSubmitting(false);
            return;
        }
        try{
            const response = await axios.post(`${apiUrl}/tickets/contact`, {
                ...data,
                recaptchaToken
            });
            toast.success('Recibimos tu consulta, te contactaremos por email.');
            navigate('/tienda');
        }catch{
            toast.error('Ocurrio un error, intentalo mas tarde');
        }finally{
            setIsSubmitting(false);
            reset();
        }
        
        // Do whatever you want with the token
    }, [executeRecaptcha]);

    // You can use useEffect to trigger the verification as soon as the component being loaded
    // useEffect(() => {
    //     handleReCaptchaVerify();
    // }, [handleReCaptchaVerify]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm<Inputs>({
        defaultValues: DEFAULT_VALUES
    });

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if(name === 'description'){
                setDescriptionLength(value.description?.length ?? 0);
            }
        })
        return () => subscription.unsubscribe()
    }, [watch]);

    const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
        if( isSubmitting ){
            return;            
        }
        setIsSubmitting(true);
        handleReCaptchaVerify(data);
    }

    return (
        <div className="relative">
            {
                isSubmitting &&
                <div className="bg-black absolute top-0 left-0 right-0 bottom-0 opacity-60">
                    <span className="loading loading-spinner loading-lg absolute top-0 left-0 right-0 bottom-0 m-auto z-50"></span>
                    <span className="loading loading-spinner loading-md absolute top-0 left-0 right-0 bottom-0 m-auto z-50"></span>
                    <span className="absolute self-center mt-16 top-0 left-0 right-0 bottom-0 z-50">Cargando</span>
                </div>
               
            }
            <form onSubmit={handleSubmit(onSubmit)} className="grid justify-items-center">
                <label className="form-control w-full max-w-md" >
                    <div className="label">
                        <span className="label-text">Email de contacto</span>
                    </div>
                    <input  
                        id="email"
                        type="email"
                        placeholder="Email" 
                        className="input input-bordered w-full max-w-md" 
                        {...register("email", VALIDATIONS.email)}
                    />
                    <div className="label">
                        {errors.email && <span role="alert" className="label-text-alt text-error">{errors.email.message}</span>}
                    </div>
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Titulo</span>
                    </div>
                    <input  
                        id="title"
                        type="text"
                        placeholder="Titulo" 
                        className="input input-bordered w-full max-w-md" 
                        {...register("title", VALIDATIONS.title)}
                    />
                    <div className="label">
                        {errors.title && <span role="alert" className="label-text-alt text-error">{errors.title.message}</span>}
                    </div>
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Descripcion</span>
                    </div>
                    <textarea  
                        id="title"
                        placeholder="Descripcion" 
                        className="textarea textarea-bordered textarea-lg w-full  max-w-md" 
                        {...register("description", VALIDATIONS.description)}
                    ></textarea>
                    <div className="label">
                        <span role="alert" className="label-text-alt text-error">{errors.description?.message}</span>
                        <span className="label-text-alt">{descriptionLength}/150</span>
                    </div>
                </label>
                <input type="text" hidden {...register("userId")}/>
                <div className="w-full max-w-md">
                    <button className="btn btn-info btn-block" disabled={isSubmitting}>Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;