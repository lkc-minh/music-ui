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
                path: routes.songs,
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
        ],
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
