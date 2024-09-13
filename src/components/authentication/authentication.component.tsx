import { FC, useEffect, useState } from "react";
import { CustomModalEnum } from "../../enums/custom-modal.enum";

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

    useEffect(() => {
        if(initialScreen){
            setActiveTab(initialScreen - 1);
        }
    }, []);


    function finishAuthentication(){
        modalFunction?.(CustomModalEnum.NO_ACTION);
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
                <div className="grid justify-center">
                    <form className="grid text-left gap-y-4 border-2 rounded-md p-4 my-4">
                        <div className="w-80">
                            <label htmlFor="email" className="block text-sm font-medium leading-6">
                                Email
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
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
                                        name="password"
                                        type="password"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={finishAuthentication} className="btn btn-outline">Iniciar sesión</button>
                        <div className="w-80">
                            <a className="link w-min">Olvidaste tu contraseña?</a>
                        </div>
                    </form>
                    <div className="grid gap-y-4 border-2 rounded-md p-4 my-4">
                        <span>Inicia sesion con tus redes sociales</span>
                        <div className="grid grid-cols-3 place-content-around justify-items-center">
                            <button className="">
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/google-logo.png")} alt=""/>
                            </button>
                            <button className="">
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/facebook-logo.png")} alt=""/>
                            </button>
                            <button>
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/twitter-logo.png")} alt=""/> 
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 1 && (
                <div className="grid justify-center overflow-y-auto">
                    <form className="grid text-left gap-y-4 border-2 rounded-md p-4 my-4">
                        <div className="w-80">
                            <label htmlFor="name" className="block text-sm font-medium leading-6">
                                Nombre
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
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
                                        name="lastname"
                                        type="text"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
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
                                        name="email"
                                        type="email"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
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
                                        name="password"
                                        type="password"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-80">
                            <label htmlFor="password-confirm" className="block text-sm font-medium leading-6">
                                Confirma la contraseña
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="password-confirm"
                                        name="password-confirm"
                                        type="password"
                                        className="block flex-1 border-2-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={finishAuthentication} className="btn btn-outline">Registrarse</button>
                    </form>
                    <div className="grid gap-y-4 border-2 rounded-md p-4 my-4">
                        <span>Registrate con tus redes sociales</span>
                        <div className="grid grid-cols-3 place-content-around justify-items-center">
                            <button className="">
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/google-logo.png")} alt=""/>
                            </button>
                            <button className="">
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/facebook-logo.png")} alt=""/>
                            </button>
                            <button>
                                <img className="h-10 w-10 zoom" src={require("../../assets/images/twitter-logo.png")} alt=""/> 
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </div>
    )
}

export default Authentication;