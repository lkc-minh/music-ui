import { useState } from "react";
import { AiFillCompass, AiTwotoneHome } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaHandHoldingHeart, FaHeadphones } from "react-icons/fa";
import { TfiAngleDown } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

import { useGlobalContext } from "~/contexts/context";
import "./SidebarItem.scss";

const sidebarItem = [
    {
        icon: <CiSearch className="SidebarItem__icon" style={{ color: "#2EC626" }} />,
        title: "Search",
        url: "/search",
    },
    {
        icon: (
            <AiTwotoneHome className="SidebarItem__icon" style={{ color: "#29A9F2" }} />
        ),
        title: "Home",
        url: "/",
    },
    {
        icon: (
            <AiFillCompass className="SidebarItem__icon" style={{ color: "#FFC139" }} />
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
        icon: <FaHeadphones className="SidebarItem__icon" style={{ color: "#A03DE8" }} />,
        title: "What Listen Today",
        sub: [
            { title: "Topic", url: "/topics" },
            { title: "Collection", url: "/playlist/tags" },
            { title: "Top 100", url: "/top100/top100" },
        ],
    },
    {
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

function SidebarItem() {
    const [titleActive, setTitleActive] = useState("");
    const { showSubSidebar, setShowSubSidebar } = useGlobalContext();

    const handleClick = (title) => {
        setShowSubSidebar((prev) => ({ ...prev, [title]: !showSubSidebar[title] }));
    };

    const handleActive = (title) => {
        setTitleActive(title);
    };

    return (
        <div className="SidebarItem">
            {sidebarItem.map((item) => {
                if (item.sub)
                    return (
                        <div>
                            <div
                                className={
                                    titleActive === item.title
                                        ? "SidebarItem__container active"
                                        : "SidebarItem__container"
                                }
                                onClick={() => handleClick(item.title)}
                            >
                                <div className="SidebarItem__container-bar"></div>
                                <div className="SidebarItem__container-item">
                                    {item.icon}
                                    <p>{item.title}</p>
                                    <TfiAngleDown
                                        className={
                                            showSubSidebar[item.title]
                                                ? "icon-sub rotate"
                                                : "icon-sub"
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                className={
                                    showSubSidebar[item.title]
                                        ? "SidebarItem__sub show"
                                        : "SidebarItem__sub"
                                }
                            >
                                {item.sub.map((i) => (
                                    <NavLink
                                        to={i.url}
                                        className="SidebarItem__sub-link"
                                        key={i.title}
                                        end
                                        onClick={() => handleActive(item.title)}
                                    >
                                        <div className="circleActive"></div>
                                        {i.title}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    );
                return (
                    <NavLink
                        to={item.url}
                        className="SidebarItem__container"
                        end
                        onClick={() => setTitleActive(null)}
                    >
                        <div className="SidebarItem__container-bar"></div>
                        <div className="SidebarItem__container-item">
                            {item.icon}
                            <p>{item.title}</p>
                        </div>
                    </NavLink>
                );
            })}
        </div>
    );
}

export default SidebarItem;
