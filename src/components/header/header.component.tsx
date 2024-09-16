import { FC, Fragment } from "react";
import ThemeSwitch from "../theme-switch/theme-switch";
import './header.styles.css';
import { ReactComponent as MenuIcon } from '@material-design-icons/svg/outlined/menu.svg';
import { ReactComponent as NotificationIcon } from '@material-design-icons/svg/outlined/notifications_none.svg';
import { ReactComponent as ShoppingCartIcon } from '@material-design-icons/svg/outlined/shopping_cart.svg';
import ShoppingCart from "../shopping-cart/shopping-cart.component";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";

interface HeaderProps{
    handleLogin: () => void
}

const Header: FC<HeaderProps> = (props) => {
    const isLoggedIn = useSelector(selectIsUserLoggedIn);

    return (
        <div className="navbar bg-base-100 sticky top-0 left-0 right-0 z-50">
            <div className="flex-1">
                <label htmlFor="my-drawer" className="btn drawer-button">
                    <MenuIcon />
                </label>
                <a className="btn btn-ghost text-xl" href="#">Atom</a>
            </div>
            <div className="flex-none">
                <ThemeSwitch />
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <NotificationIcon className="h-5 w-5"/>
                            <span className="badge badge-sm indicator-item badge-error"></span>
                        </div>
                    </div>
                    <div tabIndex={0} className="dropdown-content z-[1] mt-3 w-52">
                        <ShoppingCart isDropdown />
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <ShoppingCartIcon className="h-5 w-5"/>
                            <span className="badge badge-sm indicator-item red-text">8</span>
                        </div>
                    </div>
                    <div tabIndex={0} className="dropdown-content z-[1] mt-3">
                        <ShoppingCart isDropdown />
                    </div>
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
                                    <li><a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a></li>
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