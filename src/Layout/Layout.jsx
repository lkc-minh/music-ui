import { Outlet, useLocation } from "react-router-dom";

import "./Layout.scss";
import Rightbar from "./Rightbar/Rightbar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useEffect } from "react";

function Layout() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.search, location.pathname]);

    return (
        <div className="Layout">
            <Sidebar />
            <div className="Layout__content">
                <Header />
                <Outlet />
                <Footer />
            </div>
            <Rightbar />
        </div>
    );
}

export default Layout;
