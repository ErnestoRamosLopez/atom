import { useEffect, useState } from "react";
import { ReactComponent as SunIcon } from '@material-design-icons/svg/outlined/light_mode.svg';
import { ReactComponent as MoonIcon } from '@material-design-icons/svg/outlined/bedtime.svg';

const ThemeSwitch = () => {
    const initialTheme = window.localStorage.getItem('theme') || 'dark';
    const [theme, setTheme] = useState(initialTheme);
    useEffect(() => {
        const currentTheme = window.localStorage.getItem('theme') || 'dark';
        setTheme(currentTheme);
        document?.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);
    
    const handleThemeChange = () => {
        const currentTheme = theme;
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        window.localStorage.setItem('theme', newTheme);
        setTheme(newTheme);
    }
    return (
        <div className="p-2" role="button">
            <button className="btn btn-ghost btn-circle" onClick={handleThemeChange}>
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" checked={ theme === 'dark'} disabled className="theme-controller" value="dark" />

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