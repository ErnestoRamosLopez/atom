import { FC, useEffect, useState } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";
import LoginForm from "../login-form/login-form.component";
import RegisterForm from "../register-form/register-form.component";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { User } from "../../store/user/user.types";
import { setCurrentUser } from "../../store/user/user.action";

interface AuthenticationProps{
    modalFunction?: (event: number) => void,
    initialScreen?: number
}

const Authentication : FC<AuthenticationProps> = ({
    modalFunction = undefined,
    initialScreen = 1
}) => {
    const tabs = ['Iniciar sesion', 'Registrarse'];
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(initialScreen){
            setActiveTab(initialScreen - 1);
        }
    }, [initialScreen]);

    const handleUserLoginSuccess = (user: User, mensaje: string) => {
        toast(mensaje);
        modalFunction?.(CustomModalEnum.NO_ACTION);
        dispatch(setCurrentUser(user));
    }
    
    return (
        <div>
            <div role="tablist" className="tabs tabs-lg tabs-bordered">
                {tabs.map((tabName, index) => (
                    <a key={index} role="tab" className={"tab "+ (activeTab === index && 'tab-active ')} onClick={() => setActiveTab(index)}>
                        {tabName}
                    </a>
                ))}
            </div>
            {activeTab === 0 && (
                <LoginForm handleLoginSuccess={handleUserLoginSuccess}/>
            )}
            {activeTab === 1 && (
                <RegisterForm handleRegisterSuccess={handleUserLoginSuccess}/>
            )}
            </div>
    )
}

export default Authentication;