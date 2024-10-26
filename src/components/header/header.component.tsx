import { FC, Fragment, useEffect, useState } from "react";
import ThemeSwitch from "../theme-switch/theme-switch";
import './header.styles.css';
import { ReactComponent as MenuIcon } from '@material-design-icons/svg/outlined/menu.svg';
import { ReactComponent as ShoppingCartIcon } from '@material-design-icons/svg/outlined/shopping_cart.svg';
import ShoppingCart from "../shopping-cart/shopping-cart.component";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { Link } from "react-router-dom";
import {ReactComponent as StarIconActive} from '@material-design-icons/svg/outlined/star.svg';
import Wishlist from "../wishlist/wishlist.component";
import { setIsWishlistOpen } from "../../store/wishlist/wishlist.action";
import { selectIsWishlistOpen } from "../../store/wishlist/wishlist.selector";

interface HeaderProps{
    handleLogin: () => void
}

const Header: FC<HeaderProps> = (props) => {
    const isLoggedIn = useSelector(selectIsUserLoggedIn);
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);
    const isWishlistOpen = useSelector(selectIsWishlistOpen);

    const [shouldCloseCart, setShouldCloseCart] = useState(false);
    const [isManualOpen, setIsManualOpen] = useState(false);

    const dispatch = useDispatch();

    const openWishlist = () => {
        dispatch(setIsWishlistOpen(true));
    }

    const openCart = (stayOpen = false) => {
        if(stayOpen)
            setIsManualOpen(true);
        dispatch(setIsCartOpen(true));
    }

    const closeCartOnDelay = () => {
        setShouldCloseCart(!isManualOpen);
        setIsManualOpen(false);
    }

    useEffect(() => {
        let timeout = null;
        if(shouldCloseCart && isCartOpen){
            timeout = setTimeout(() => {
                dispatch(setIsCartOpen(false));
                setShouldCloseCart(false);
            }, 400);
        }

        return () => {
            if(timeout)
                clearTimeout(timeout);
        };
    }, [shouldCloseCart, isCartOpen]);

    return (
        <div className="navbar bg-base-100 sticky top-0 left-0 right-0 z-50">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="btn drawer-button">
                    <MenuIcon />
                </label>
                <Link className="btn btn-ghost text-xl" to={"#"}>Atom</Link>
            </div>
            <div className="flex-none">
                <ThemeSwitch />
                {
                    isLoggedIn &&
                    <div className="dropdown dropdown-end dropdown-open">
                        <button tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => openWishlist()}>
                            <div className="indicator">
                                <StarIconActive className="h-5 w-5"/>
                            </div>
                        </button>
                        {
                            isWishlistOpen &&
                            <div tabIndex={0} className="dropdown-content z-[1] mt-3">
                                <Wishlist />
                            </div>
                        }
                    </div>
                }
                <div className="dropdown dropdown-end dropdown-open">
                    <button tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => openCart(true)} onMouseOver={() => openCart()} onMouseLeave={closeCartOnDelay}>
                        <div className="indicator">
                            <ShoppingCartIcon className="h-5 w-5"/>
                            <span className="cart-counter badge badge-sm indicator-item red-text">{cartCount}</span>
                        </div>
                    </button>
                    {
                        isCartOpen && 
                        <div tabIndex={0} className="dropdown-content z-[1] mt-3" onMouseEnter={() => setShouldCloseCart(false)}>
                            <ShoppingCart isDropdown />
                        </div>
                    }
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                !isLoggedIn &&
                                <Fragment>
                                    <li><button onClick={()=> props.handleLogin()}>
                                        Iniciar sesion
                                    </button></li>
                                </Fragment> 
                            }
                            {
                                isLoggedIn && 
                                <Fragment>
                                    <li>
                                        <Link to={"perfil"}>
                                            Perfil
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><a>Settings</a></li>
                                    <li><button onClick={()=> props.handleLogin()}>Logout</button></li>
                                </Fragment>
                            }
                        
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;