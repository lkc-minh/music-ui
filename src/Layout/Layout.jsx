import { Outlet } from "react-router-dom";

import "./Layout.scss";
import Rightbar from "./Rightbar/Rightbar";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "./Footer/Footer";

function Layout() {
    return (
        <div className="Layout">
            <Sidebar />
            <div className="Layout__content">
                <Outlet />
                <Footer />
            </div>
            <Rightbar />
        </div>
    );
}

export default Layout;
