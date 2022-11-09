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
import { useAuthContext } from "~/contexts/authContext";
import { useGlobalContext } from "~/contexts/context";

const sidebarItem = [
    {
        id: 1,
        icon: <CiSearch className="SidebarItem__icon" style={{ color: "#2EC626" }} />,
        title: "Search",
        url: "/search",
    },
    {
        id: 2,
        icon: <AiTwotoneHome className="SidebarItem__icon" style={{ color: "#29A9F2" }} />,
        title: "Home",
        url: "/",
    },
    {
        id: 3,
        icon: <AiFillCompass className="SidebarItem__icon" style={{ color: "#FFC139" }} />,
        title: "Discovery",
        sub: [
            { title: "Song", url: "/song/Mgbb1byycZvy" },
            { title: "Playlist", url: "/playlist/iY1AnIsXedqE" },
            { title: "Artist", url: "/artist/va" },
        ],
    },
    {
        id: 4,
        icon: <FaHeadphones className="SidebarItem__icon" style={{ color: "#A03DE8" }} />,
        title: "What Listen Today",
        sub: [
            { title: "Topic", url: "/topics" },
            { title: "Collection", url: "/playlist/bxkenI7MAoFv" },
            { title: "Top 100", url: "/top100" },
        ],
    },
    {
        id: 5,
        icon: <BsFillBarChartFill className="SidebarItem__icon" style={{ color: "#FA8046" }} />,
        title: "NCT Chart",
        url: "/ranking",
    },
    {
        id: 6,
        icon: <FaHandHoldingHeart className="SidebarItem__icon" style={{ color: "#1BA9B0" }} />,
        title: "Music 4U",
        url: "/discover",
    },
];

function Sidebar() {
    const [showPopper, setShowPopper] = useState(false);
    const [isOpenSignIn, setIsOpenSignIn] = useState(false);
    const [isOpenSignUp, setIsOpenSignUp] = useState(false);
    const { showSidebar, setShowSidebar } = useGlobalContext();

    const { currentUser } = useAuthContext();
    console.log({ currentUser });

    const popperRef = useRef();
    useOnClickOutside(popperRef, () => setShowPopper(false));

    const sidebarRef = useRef();
    useOnClickOutside(sidebarRef, () => setShowSidebar(false));

    return (
        <div ref={sidebarRef} className={showSidebar ? "Sidebar expand" : "Sidebar"}>
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
                {currentUser ? (
                    <div className="Sidebar__account-content">
                        <img
                            src={currentUser.photoURL ? currentUser.photoURL : images.defaultAvatar}
                            alt=""
                            width={24}
                            style={{ marginRight: 8, borderRadius: "50%" }}
                        />

                        <span>{currentUser.displayName ? currentUser.displayName : "no name"}</span>
                    </div>
                ) : (
                    <div className="Sidebar__account-content">
                        <span onClick={() => setIsOpenSignIn(true)}>Sign in</span>

                        <div>|</div>

                        <span onClick={() => setIsOpenSignUp(true)}>Sign up</span>
                    </div>
                )}
                <div ref={popperRef} className="Sidebar__account-setting">
                    <AiOutlineSetting className="icon" onClick={() => setShowPopper(!showPopper)} />
                    <Popper
                        currentUser={currentUser}
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
