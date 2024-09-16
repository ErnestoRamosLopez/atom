import { Outlet } from "react-router-dom";
import Header from "../components/header/header.component";
import { openModalFn } from "../utils/modal.utils";
import { ReactComponent as LogoutIcon } from '@material-design-icons/svg/outlined/power_settings_new.svg';
import { ReactComponent as LoginIcon } from '@material-design-icons/svg/outlined/login.svg';
import SVG from 'react-inlinesvg';
import { sidebarOptions } from "../utils/constantes-test.utils";
import CustomModal from "../components/custom-modal/custom-modal.component";
import Authentication from "../components/authentication/authentication.component";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../store/user/user.selector";
import { setCurrentUser } from "../store/user/user.action";

const MainLayout = () => {
    const isLoggedIn = useSelector(selectIsUserLoggedIn);
    const dispatch = useDispatch();

    function handleLoginButton(){
        if(!isLoggedIn){
          openModal()
        }else{
            dispatch(setCurrentUser(null));
        }
    }
    
    function handleLoginSuccess(){
        //setIsLoggedIn(true);
    }

     // Function to open the modal
    const openModal = () => openModalFn('my_modal_1');

    return (
        <div className="App">
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <Header handleLogin={handleLoginButton}/>
                    <div className="h-min-full mx-16">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-5">
                    {/* Sidebar content here */}
                    <li>
                        <button className='btn grid grid-cols-1 h-20 pb-5' onClick={handleLoginButton}>
                        <label className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input type="checkbox" checked={ isLoggedIn } disabled/>
                            <div className="swap-on">
                                <LogoutIcon fontSize='large' className=' h-10 w-10'/>
                            </div>
                            <div className="swap-off">
                                <LoginIcon fontSize='large' className=' h-10 w-10'/>
                            </div>
                        </label>
                        <label>{isLoggedIn ? 'Cerrar' : 'Iniciar'} sesion</label>
                        </button>
                    </li>
                    {sidebarOptions.map((item, index) => (
                        <li key={index}>
                            <a href={item.link}>
                                <SVG src={require(`@material-design-icons/svg/outlined/${item.icono}.svg`)}/>
                                <span>{item.nombre}</span>
                            </a>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {
                !isLoggedIn && 
                <CustomModal modalActionClass="justify-center" closeEvent={handleLoginSuccess} hasCloseButton={true} id="my_modal_1">
                    <Authentication />
                </CustomModal>
            }
        </div>
    )
}

export default MainLayout;