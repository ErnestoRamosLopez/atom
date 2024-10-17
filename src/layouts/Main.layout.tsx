import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/header.component";
import { openModalFn } from "../utils/modal.utils";
import { ReactComponent as LogoutIcon } from '@material-design-icons/svg/outlined/power_settings_new.svg';
import { ReactComponent as LoginIcon } from '@material-design-icons/svg/outlined/login.svg';
import SVG from 'react-inlinesvg';
import { sidebarOptions } from "../utils/constantes-test.utils";
import CustomModal from "../components/custom-modal/custom-modal.component";
import Authentication from "../components/authentication/authentication.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectIsUserLoggedIn } from "../store/user/user.selector";
import { setCurrentUser } from "../store/user/user.action";
import { Fragment } from "react/jsx-runtime";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { selectTheme } from "../store/preferences/preferences.selector";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { selectCartItems, selectIsCartLoaded, selectShouldSaveCart } from "../store/cart/cart.selector";
import { selectLoginFromIdentityProvider } from "../store/login/login.selector";
import { setLoginUserData } from "../store/login/login.action";
import { logout } from "../utils/login.utils";
import { setCartItems, setIsCartLoaded } from "../store/cart/cart.action";

const MainLayout = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL ?? '';
    const shoppingItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectCurrentUser);
    const isCartLoaded = useSelector(selectIsCartLoaded);
    const theme = useSelector(selectTheme);
    const isLoggedIn = useSelector(selectIsUserLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginIP = useSelector(selectLoginFromIdentityProvider);
    const [closeModalFunction, setModalFunction] = useState<() => void>(() => {});

    function handleLoginButton(){
        if(!isLoggedIn){
          openModal()
        }else{
            logout(axios, navigate, dispatch);
        }
    }

     // Function to open the modal
    const openModal = () => openModalFn('my_modal_1');

    const closeDrawer = () => document.getElementById("my-drawer")?.click();

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (currentUser) {
            const fetchCart = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/profile/carts`, {
                        params: {
                            userId: currentUser.id
                        },
                        cancelToken: source.token
                    });
                    dispatch(setCartItems(response.data));
                    dispatch(setIsCartLoaded(true));
                    
                } catch (error) {
        
                }
                dispatch(setIsCartLoaded(true));
            };
            fetchCart();
        }

        // Cleanup function to cancel the request
        return () => {
            source.cancel("Operation canceled due to new request.");
        };
    }, [currentUser]);

    useEffect(() => {
        const source = axios.CancelToken.source();
        if (currentUser && isCartLoaded) {
            const saveCart = async () => {
                try {
                    await axios.post(`${apiUrl}/profile/carts`, {
                        userId: currentUser.id,
                        items: shoppingItems
                    }, {
                        cancelToken: source.token
                    });
                } catch (error) {
                    
                }
            };
            saveCart();
        }

        // Cleanup function to cancel the request
        return () => {
            source.cancel("Operation canceled due to new request.");
        };
    }, [currentUser, shoppingItems, isCartLoaded]);

    useEffect(() => {
        if( loginIP.userData ){
            setModalFunction(() => handleRedirectLogin);
            openModal();
        }else{
            setModalFunction(() => {});
        }
    }, [loginIP]);

    const handleRedirectLogin = useCallback(() => {
        if (loginIP.cancelRedirect) {
            let cancelRedirect = loginIP.cancelRedirect;
            dispatch(setLoginUserData({ cancelRedirect: null, userData: null}));
            navigate(cancelRedirect);
        }
    }, [loginIP.cancelRedirect, navigate]);

    return (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme={theme}
                transition={Bounce} />
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
                        <button className='btn-login-popup btn grid grid-cols-1 h-20 pb-5' onClick={() => {handleLoginButton();closeDrawer();}}>
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
                        <Fragment key={index}>
                            {
                                ((item.needsUser && isLoggedIn ) || !item.needsUser) &&
                                <li>
                                    <Link to={item.link} onClick={closeDrawer}>
                                        <SVG src={require(`@material-design-icons/svg/outlined/${item.icono}.svg`)}/>
                                        <span>{item.nombre}</span>
                                    </Link>
                                </li>
                            }
                        </Fragment>
                    ))}
                    </ul>
                </div>
            </div>
            {
                !isLoggedIn && 
                <CustomModal modalActionClass="justify-center" hasCloseButton={true} id="my_modal_1" closeEvent={closeModalFunction}>
                    <Authentication />
                </CustomModal>
            }
        </div>
    )
}

export default MainLayout;