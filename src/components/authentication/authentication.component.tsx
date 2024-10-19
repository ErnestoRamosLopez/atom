import { FC, useEffect, useState } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";
import LoginForm from "../login-form/login-form.component";
import RegisterForm from "../register-form/register-form.component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { User } from "../../store/user/user.types";
import { setCurrentUser } from "../../store/user/user.action";
import { selectLoginFromIdentityProvider } from "../../store/login/login.selector";
import { generateNonce } from "../../utils/login.utils";

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
    const loginIP = useSelector(selectLoginFromIdentityProvider);

    useEffect(() => {
        if(loginIP.userData){
            setActiveTab(2 - 1);
        }else if(initialScreen){
            setActiveTab(initialScreen - 1);
        }
    }, [initialScreen, loginIP]);

    const handleUserLoginSuccess = (user: User, mensaje: string) => {
        toast(mensaje);
        modalFunction?.(CustomModalEnum.NO_ACTION);
        dispatch(setCurrentUser(user));
    }

    const startGoogleLogin = () => {
        const nonce = generateNonce();
        sessionStorage.setItem('nonce', nonce);
        const googleOAuthURL = `${process.env.REACT_APP_GOOGLE_OAUTH_URL}?client_id=${process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}&scope=${encodeURIComponent(process.env.REACT_APP_GOOGLE_OAUTH_SCOPES || "")}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&response_type=${process.env.REACT_APP_GOOGLE_RESPONSE_TYPE}&nonce=${nonce}&state=google`;
        window.location.href = googleOAuthURL;
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
                <LoginForm handleLoginSuccess={handleUserLoginSuccess} startGoogleLogin={startGoogleLogin}/>
            )}
            {activeTab === 1 && (
                <RegisterForm handleRegisterSuccess={handleUserLoginSuccess} startGoogleLogin={startGoogleLogin} preloadedUser={loginIP.userData}/>
            )}
            </div>
    )
}

export default Authentication;