import { Link } from "react-router-dom";
import { AiFillCompass, AiTwotoneHome, AiOutlineSetting } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaHandHoldingHeart, FaHeadphones } from "react-icons/fa";

import images from "~/assets/images";
import "./Sidebar.scss";
import Popper from "./Popper/Popper";
import { useRef, useState } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import SidebarItem from "./SidebarItem/SidebarItem";
import Login from "./Login/Login";
import Register from "./Register/Register";

const sidebarItem = [
    {
        id: 1,
        icon: (
            <CiSearch
                className="SidebarItem__icon"
                style={{ color: "#2EC626" }}
            />
        ),
        title: "Search",
        url: "/search",
    },
    {
        id: 2,
        icon: (
            <AiTwotoneHome
                className="SidebarItem__icon"
                style={{ color: "#29A9F2" }}
            />
        ),
        title: "Home",
        url: "/",
    },
    {
        id: 3,
        icon: (
            <AiFillCompass
                className="SidebarItem__icon"
                style={{ color: "#FFC139" }}
            />
        ),
        title: "Discovery",
        sub: [
            { title: "Song", url: "/songs/newsongs" },
            { title: "Playlist", url: "/playlist/newplaylist" },
            { title: "Video", url: "/videos" },
            { title: "Artist", url: "/singers" },
        ],
    },
    {
        id: 4,
        icon: (
            <FaHeadphones
                className="SidebarItem__icon"
                style={{ color: "#A03DE8" }}
            />
        ),
        title: "What Listen Today",
        sub: [
            { title: "Topic", url: "/topics" },
            { title: "Collection", url: "/playlist/tags" },
            { title: "Top 100", url: "/top100/top100" },
        ],
    },
    {
        id: 5,
        icon: (
            <BsFillBarChartFill
                className="SidebarItem__icon"
                style={{ color: "#FA8046" }}
            />
        ),
        title: "NCT Chart",
        url: "/songs/weekly",
    },
    {
        id: 6,
        icon: (
            <FaHandHoldingHeart
                className="SidebarItem__icon"
                style={{ color: "#1BA9B0" }}
            />
        ),
        title: "Music 4U",
        url: "/discover",
    },
];

function Sidebar() {
    const [showPopper, setShowPopper] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);

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
                    <span onClick={() => setIsOpenSignIn(true)}>Sign in</span>

                    <div>|</div>

                    <span onClick={() => setIsOpenSignUp(true)}>Sign up</span>
                </div>
                <div ref={popperRef} className="Sidebar__account-setting">
                    <AiOutlineSetting
                        className="icon"
                        onClick={() => setShowPopper(!showPopper)}
                    />
                    <Popper
                        showPopper={showPopper}
                        setShowPopper={setShowPopper}
                    />
                </div>
            </div>

            <SidebarItem sidebarItem={sidebarItem} />
            <Login
                isOpen={isOpenSignIn}
                setIsOpen={setIsOpenSignIn}
                setIsOpenSignUp={setIsOpenSignUp}
            />
            <Register isOpen={isOpenSignUp} setIsOpen={setIsOpenSignUp} />
        </div>
    );
}

export default Sidebar;
