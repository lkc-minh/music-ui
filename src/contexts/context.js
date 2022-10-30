import NhacCuaTui from "nhaccuatui-api-full";
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
// import reducer from "./reducer";

const AppContext = createContext();

// const initialState = { theme: "light-theme" };

const AppProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [theme, setTheme] = useLocalStorage("theme", "light-theme");
    const [ranking, setRanking] = useState({});
    const [songKey, setSongKey] = useLocalStorage("players", null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await NhacCuaTui.getHome();
                setRanking(data?.ranking?.song);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    return (
        <AppContext.Provider
            value={{
                // ...state,
                theme,
                setTheme,
                setSongKey,
                songKey,
                ranking,
                setIsPlaying,
                isPlaying,
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
