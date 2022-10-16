import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout/Layout";
import routes from "./config/routes";
import Discover from "./pages/Discover/Discover";
import Home from "./pages/Home/Home";
import Playlist from "./pages/Playlist/Playlist";
import Search from "./pages/Search/Search";
import Singles from "./pages/Singles/Singles";
import Songs from "./pages/Songs/Songs";
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
                element: <Songs />,
            },
            {
                path: routes.videos,
                element: <Videos />,
            },
            {
                path: routes.singers,
                element: <Singles />,
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
