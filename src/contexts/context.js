import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "~/hooks/useLocalStorage";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage("theme", "light-theme");
    const [playlistPlaying, setPlaylistPlaying] = useLocalStorage("playlistPlaying", {});

    const [currentSong, setCurrentSong] = useState();
    const [currentIndex, setCurrentIndex] = useLocalStorage("currentIndex", 0);

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
