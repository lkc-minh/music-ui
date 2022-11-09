import { Outlet } from "react-router-dom";

import "./Layout.scss";
import Rightbar from "./Rightbar/Rightbar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Layout() {
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
