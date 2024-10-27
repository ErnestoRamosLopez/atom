import { Link, Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/header.component";
import { openModalFn } from "../utils/modal.utils";
import { ReactComponent as LogoutIcon } from '@material-design-icons/svg/outlined/power_settings_new.svg';
import { ReactComponent as LoginIcon } from '@material-design-icons/svg/outlined/login.svg';
import SVG from 'react-inlinesvg';
import { sidebarOptions } from "../utils/constantes.utils";
import CustomModal from "../components/custom-modal/custom-modal.component";
import Authentication from "../components/authentication/authentication.component";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectIsUserLoggedIn } from "../store/user/user.selector";
import { Fragment } from "react/jsx-runtime";
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { selectTheme } from "../store/preferences/preferences.selector";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { selectCartItems, selectIsCartLoaded, selectShouldSaveCart } from "../store/cart/cart.selector";
import { selectLoginFromIdentityProvider } from "../store/login/login.selector";
import { logout } from "../utils/login.utils";
import { fetchUserCart, saveUserCart } from "../store/cart/cart.thunks";
import { useAppDispatch } from '../store/store';
import './Main.styles.css';
import { fetchUserWishlist, saveUserWishlist } from "../store/wishlist/wishlist.thunks";
import { selectIsWishlistLoaded, selectShouldSaveWishlist, selectWishlistItems } from "../store/wishlist/wishlist.selector";

const MainLayout = () => {
    //cart
    const shoppingItems = useSelector(selectCartItems);
    const currentUser = useSelector(selectCurrentUser);
    const isCartLoaded = useSelector(selectIsCartLoaded);
    const shouldSaveCart = useSelector(selectShouldSaveCart);

    //wishlist
    const wishlistItems = useSelector(selectWishlistItems);
    const isWishlistLoaded = useSelector(selectIsWishlistLoaded);
    const shouldSaveWishlist = useSelector(selectShouldSaveWishlist);

    const theme = useSelector(selectTheme);
    const isLoggedIn = useSelector(selectIsUserLoggedIn);
    const dispatch = useAppDispatch();
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
        let promise = [];
        if (currentUser) {
            promise.push( dispatch(fetchUserCart(currentUser.id as number)) );
            promise.push( dispatch(fetchUserWishlist()) );
        }

        // Cleanup function to cancel the request
        return () => {
            if( promise.length > 0)
                promise.forEach(it => it.abort());
        };
    }, [currentUser]);

    useEffect(() => {
        let promise = null;
        if (currentUser && isCartLoaded && shouldSaveCart) {
            promise = dispatch(saveUserCart({userId: currentUser.id as number, shoppingItems}));
        }

        // Cleanup function to cancel the request
        return () => {
            if( promise !== null)
                promise.abort();
        };
    }, [currentUser, shoppingItems, isCartLoaded, shouldSaveCart]);

    useEffect(() => {
        let promise = null;
        if (currentUser && isWishlistLoaded && shouldSaveWishlist) {
            promise = dispatch(saveUserWishlist(wishlistItems));
        }

        // Cleanup function to cancel the request
        return () => {
            if( promise !== null)
                promise.abort();
        };
    }, [currentUser, wishlistItems, isWishlistLoaded, shouldSaveWishlist]);

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
            logout(axios, navigate, dispatch, cancelRedirect);
        }
    }, [loginIP.cancelRedirect, navigate]);

    return (
        <div className="main-layout">
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
                    <div className="h-min-full mx-16 fill-page-without-header">
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