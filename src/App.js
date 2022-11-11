import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import routes from "./config/routes";
import { useGlobalContext } from "./contexts/context";
import Layout from "./Layout/Layout";
import Artist from "./pages/Artist/Artist";
import Home from "./pages/Home/Home";
import Music4U from "./pages/Music4U/Music4U";
import Playlist from "./pages/Playlist/Playlist";
import Ranking from "./pages/Ranking/Ranking";
import Search from "./pages/Search/Search";
import SongPage from "./pages/SongPage/SongPage";
import Top100 from "./pages/Top100/Top100";
import Topic from "./pages/Topic/Topic";
import Topics from "./pages/Topics/Topics";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: routes.home,
                element: <Home />,
            },
            {
                path: routes.search,
                element: <Search />,
            },
            {
                path: routes.song,
                element: <SongPage />,
            },
            {
                path: routes.artist,
                element: <Artist />,
            },
            {
                path: routes.playlist,
                element: <Playlist />,
            },
            {
                path: routes.top100,
                element: <Top100 />,
            },
            {
                path: routes.music4U,
                element: <Music4U />,
            },
            {
                path: routes.topics,
                element: <Topics />,
            },
            {
                path: routes.topic,
                element: <Topic />,
            },
            {
                path: routes.ranking,
                element: <Ranking />,
            },
        ],
    },
]);

function App() {
    const { theme } = useGlobalContext();

    return (
        <div className="App">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme === "light-theme" ? "light" : "dark"}
            />
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
