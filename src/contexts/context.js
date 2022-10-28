import NhacCuaTui from "nhaccuatui-api-full";
import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";
// import reducer from "./reducer";

const AppContext = createContext();

// const initialState = { theme: "light-theme" };

const AppProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [theme, setTheme] = useLocalStorage("theme", "light-theme");
    const [showSubSidebar, setShowSubSidebar] = useState({
        "What Listen Today": true,
    });
    const [ranking, setRanking] = useState({});
    const [songKey, getSongKey] = useLocalStorage("players", null);
    const [isPlay, setIsPlay] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const data = await NhacCuaTui.getHome();
                setRanking(data.ranking.song);
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
                showSubSidebar,
                setShowSubSidebar,
                getSongKey,
                songKey,
                ranking,
                setIsPlay,
                isPlay,
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
