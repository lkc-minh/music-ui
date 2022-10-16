import { Link } from "react-router-dom";
import { AiOutlineSetting } from "react-icons/ai";

import images from "~/assets/images";
import "./Sidebar.scss";
import Popper from "./Popper/Popper";
import { useRef, useState } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import SidebarItem from "./SidebarItem/SidebarItem";

function Sidebar() {
    const [showPopper, setShowPopper] = useState(false);
    const popperRef = useRef();
    useOnClickOutside(popperRef, () => setShowPopper(false));

    return (
        <div className="Sidebar">
            <div className="Sidebar__header">
                <Link to={"/"} className="Sidebar__header-logo">
                    <img src={images.logo} alt="logo" />
                </Link>
                <a
                    className="Sidebar__header-link"
                    href="https://www.nhaccuatui.com/nhaccuatui-vip/mua-vip"
                    target="_blank"
                    rel="noreferrer"
                >
                    upgrade
                </a>
            </div>

            <div className="Sidebar__account">
                <div className="Sidebar__account-content">
                    <span>Sign in</span>
                    <div>|</div>
                    <span>Sign up</span>
                </div>
                <div ref={popperRef} className="Sidebar__account-setting">
                    <AiOutlineSetting
                        className="icon"
                        onClick={() => setShowPopper(!showPopper)}
                    />
                    <Popper showPopper={showPopper} setShowPopper={setShowPopper} />
                </div>
            </div>

            <SidebarItem />
        </div>
    );
}

export default Sidebar;
