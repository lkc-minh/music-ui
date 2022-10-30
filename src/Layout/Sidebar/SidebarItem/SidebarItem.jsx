import { useState } from "react";
import { TfiAngleDown } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

import useLocalStorage from "~/hooks/useLocalStorage";
import "./SidebarItem.scss";

function SidebarItem({ sidebarItem }) {
    const [showSubSidebar, setShowSubSidebar] = useState({
        "What Listen Today": true,
    });
    const [titleActive, setTitleActive] = useLocalStorage("titleActive", "");

    const handleClick = (title) => {
        setShowSubSidebar((prev) => ({
            ...prev,
            [title]: !showSubSidebar[title],
        }));
    };

    return (
        <div className="SidebarItem">
            {sidebarItem.map((item) => {
                if (item.sub)
                    return (
                        <div key={item.title}>
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
                                        className={`SidebarItem__sub-link ${item.id}`}
                                        key={i.title}
                                        end
                                        onClick={() =>
                                            setTitleActive(item.title)
                                        }
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
                        key={item.title}
                        end
                        onClick={() => setTitleActive(item.title)}
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
