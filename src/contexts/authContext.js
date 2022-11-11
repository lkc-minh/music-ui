import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [favoritePlaylist, setFavoritePlaylist] = useState([]);
    
    const getAllSongFavorite = async (uid) => {
        const results = [];
        const q = query(collection(db, "favoritePlaylist"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
        });
        return results;
    };
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setCurrentUser(null);
                setFavoritePlaylist([]);
                return;
            }
            setCurrentUser(user);
            const res = await getAllSongFavorite(user.uid);
            setFavoritePlaylist(res);
        });
        return () => {
            unsub();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, favoritePlaylist, setFavoritePlaylist }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};
