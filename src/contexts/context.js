import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage("theme", "light-theme");
    const [playlistPlaying, setPlaylistPlaying] = useLocalStorage("playlistPlaying", {});

    const [currentSong, setCurrentSong] = useState();
    const [currentIndex, setCurrentIndex] = useLocalStorage("currentIndex", 0);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showRightbar, setShowRightbar] = useState(false);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <AppContext.Provider
            value={{
                theme,
                setTheme,
                playlistPlaying,
                setPlaylistPlaying,
                currentSong,
                setCurrentSong,
                currentIndex,
                setCurrentIndex,
                showSidebar,
                setShowSidebar,
                showRightbar,
                setShowRightbar,
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
