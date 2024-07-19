import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState } from 'react';
import { CHANGE_THEME } from '@/redux/locale/actions';

export function useTheme() {

    const theme = useSelector((state) => state.locale.theme)

    const dispatch = useDispatch();

    const getSysPreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

    const [isDarkSystem, setIsDarkSystem] = useState(getSysPreference());

    const memoizedCssRootChangeHandler = useMemo(() => changeCssRootVariables(theme), [theme])

    // 
    function initTheme() {
        if (theme === "system") {
            isDarkSystem ? changeCssRootVariables('dark') : changeCssRootVariables('light');
        } else {
            changeCssRootVariables(theme);
        }
    };

    // 
    function sysPreferenceListner(event) {
        setIsDarkSystem(event?.matches);
        if (theme !== 'system') return;
        if (event?.matches)
            changeCssRootVariables('dark');
        else
            changeCssRootVariables('light');
    }

    function changeCssRootVariables(themePref) {
        // 
        if (!['dark', 'light', 'system'].includes(themePref))
            return;

        const theme = () => {
            if (themePref === 'system' && isDarkSystem) return 'dark';
            if (themePref === 'system' && !isDarkSystem) return 'light';
            return themePref;
        }

        // 
        const cssRoot = document.querySelector(':root');

        /* light theme */
        const lightRootVariables = {
            '--bg-color': '#e9f1fa',
            '--font-color': '#020d1a',
            '--font-color-opacity-half': 'rgba(2, 13, 26, 0.5)',
            '--ui-element-color': '#c8d9ec',
            '--ui-element-hover-color': '#22303c',
            '--ui-element-hover-font-color': '#ffffff',
            '--button-bg-color': '#4182cb',
            '--button-font-color': '#fafafa',
            '--title-box-title-color': '#15202b',
            '--title-box-title-bg-color': '#d5e1ed',
            '--movie-modal-bg-color': 'rgb(255, 255, 255)',
            '--seasons-bg-color': 'rgba(255, 255, 255, 0)',
            '--tooltip-background-color': 'rgb(7, 52, 88)',
            '--tooltip-font-color': '#ffffff',
        }

        /* dark theme */
        const darkRootVariables = {
            '--bg-color': '#15202b',
            '--font-color': '#ffffff',
            '--font-color-opacity-half': 'rgba(255, 255, 255, 0.5)',
            '--ui-element-color': '#22303c',
            '--ui-element-hover-color': '#c8d9ec',
            '--ui-element-hover-font-color': '#020d1a',
            '--button-bg-color': '#9400d3',
            '--button-font-color': '#fafafa',
            '--title-box-title-color': '#ffffff',
            '--title-box-title-bg-color': '#192734',
            '--movie-modal-bg-color': 'rgb(255, 255, 255)',
            '--seasons-bg-color': 'rgba(255, 255, 255, 0)',
            '--tooltip-background-color': 'rgb(236 238 240)',
            '--tooltip-font-color': '#020d1a',
        }

        switch (theme()) {
            case 'dark':
                // Update the CSS variables for dark theme
                for (const variable in darkRootVariables) {
                    cssRoot.style.setProperty(variable, darkRootVariables[variable]);
                }
                break;
            case 'light':
                // Update the CSS variables for light theme
                for (const variable in lightRootVariables) {
                    cssRoot.style.setProperty(variable, lightRootVariables[variable]);
                }
                break;
            default:
                break;
        }

    }

    useEffect(() => {
        initTheme();

        memoizedCssRootChangeHandler;

        document.body.setAttribute('data-theme', theme)

        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

        darkThemeMq.addEventListener('change', sysPreferenceListner)

        return () => {
            darkThemeMq.removeEventListener('change', sysPreferenceListner)
        }
    }, [theme])

    return {
        theme: theme,
        setTheme: (preference) => dispatch(CHANGE_THEME(preference)),
    }
}