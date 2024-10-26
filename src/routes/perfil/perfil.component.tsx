import { FC, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ReactComponent as ProfileIcon } from '@material-design-icons/svg/outlined/person.svg';
import { ReactComponent as AddressIcon } from '@material-design-icons/svg/outlined/pin_drop.svg';
import { ReactComponent as TestIcon } from '@material-design-icons/svg/outlined/bug_report.svg';
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "../../store/user/user.selector";
import { logout } from "../../utils/login.utils";
import axios from "axios";
import { useAppDispatch } from "../../store/store";

const Perfil: FC = () => {
    const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isUserLoggedIn){
            logout(axios, navigate, dispatch, '/');
        }
    }, [isUserLoggedIn]);


    return (
        <div className="grid grid-cols-3">
            <div className="card">
                <div className="card-body">
                    <ul className="menu menu-lg bg-base-200 rounded-box w-56">
                        <li>
                            <Link to={"."}>
                                <ProfileIcon />
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link to={"direcciones"}>
                                <AddressIcon />
                                Mis direcciones
                            </Link>
                        </li>
                        <li>
                            <Link to={"."}>
                                <TestIcon />
                                Test
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-span-2">
                <Outlet />
            </div>
        </div>
    );
}

export default Perfil;