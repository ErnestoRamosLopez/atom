import { FC, useEffect, useState } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";
import LoginForm from "../login-form/login-form.component";
import RegisterForm from "../register-form/register-form.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

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
    //const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if(initialScreen){
            setActiveTab(initialScreen - 1);
        }
    }, [initialScreen]);

    // TODO, pasar funcion a formularios para ejecutar funcion
    // useEffect(() => {
    //     if(currentUser){
    //         modalFunction?.(CustomModalEnum.NO_ACTION);
    //     }
    // }, [currentUser, modalFunction]);
    
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
                <LoginForm />
            )}
            {activeTab === 1 && (
                <RegisterForm />
            )}
            </div>
    )
}

export default Authentication;