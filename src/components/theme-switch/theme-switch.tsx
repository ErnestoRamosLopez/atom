import { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from '@material-design-icons/svg/outlined/light_mode.svg';
import { ReactComponent as MoonIcon } from '@material-design-icons/svg/outlined/bedtime.svg';
import { useDispatch, useSelector } from "react-redux";
import { selectTheme } from "../../store/preferences/preferences.selector";
import { setTheme } from "../../store/preferences/preferences.action";
import { AllowedThemes } from "../../store/preferences/preferences.types";

const ThemeSwitch = () => {
    const theme = useSelector(selectTheme);
    const dispatch = useDispatch();

    useEffect(() => {
        document?.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);
    
    const handleThemeChange = () => {
        const currentTheme = theme;
        let newTheme: AllowedThemes = currentTheme === 'dark' ? 'light' : 'dark';
        dispatch(setTheme(newTheme));
    }
    
    return (
        <div className="p-2" role="button">
            <button className="btn btn-ghost btn-circle" onClick={handleThemeChange}>
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input data-testid="theme-switcher-id" type="checkbox" checked={ theme === 'dark'} disabled className="theme-controller"/>

                    {/* sun icon */}
                    <SunIcon fill="currentColor" className="swap-off h-5 w-5"/>
                    {/* moon icon */}
                    <MoonIcon fill="currentColor" className="swap-on h-5 w-5"/>
                </label>
            </button>
        </div>
    );
}

export default ThemeSwitch;