import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout/Layout";
import routes from "./config/routes";
import Discover from "./pages/Discover/Discover";
import Home from "./pages/Home/Home";
import Playlist from "./pages/Playlist/Playlist";
import Search from "./pages/Search/Search";
import Artist from "./pages/Artist/Artist";
import SongPage from "./pages/SongPage/SongPage";
import Top100 from "./pages/Top100/Top100";
import Topics from "./pages/Topics/Topics";
import Videos from "./pages/Videos/Videos";
import { ToastContainer } from "react-toastify";
import { useGlobalContext } from "./contexts/context";
import "react-toastify/dist/ReactToastify.css";
import Ranking from "./pages/Ranking/Ranking";
import Topic from "./pages/Topic/Topic";

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
                path: routes.videos,
                element: <Videos />,
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
                path: routes.discover,
                element: <Discover />,
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
