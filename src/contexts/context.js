import { createContext, useContext, useEffect, useReducer, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
import reducer from "./reducer";

const AppContext = createContext();

const initialState = { theme: "light-theme" };

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [theme, setTheme] = useLocalStorage("theme", "light-theme");
    const [showSubSidebar, setShowSubSidebar] = useState({});

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <AppContext.Provider
            value={{
                ...state,
                theme,
                setTheme,
                showSubSidebar,
                setShowSubSidebar,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };