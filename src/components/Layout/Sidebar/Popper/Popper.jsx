import { BsChevronRight } from "react-icons/bs";
import "./Popper.scss";
import { TbMessageLanguage } from "react-icons/tb";
import { BsHeadset, BsMoonStarsFill } from "react-icons/bs";
import { useGlobalContext } from "~/contexts/context";

const settingsPopper = [
    {
        icon: <TbMessageLanguage className="icon" />,
        title: "Ngôn ngữ",
        subPopper: ["Tiếng Anh", "Tiếng Việt"],
    },
    {
        icon: <BsHeadset className="icon" />,
        title: "Hỗ trợ",
    },
    {
        icon: <BsMoonStarsFill className="icon" />,
        title: "Chủ đề",
        subPopper: ["Nền sáng", "Nền tối"],
    },
];

function Popper({ showPopper, setShowPopper }) {
    const { setTheme } = useGlobalContext();
    const handleClick = (item) => {
        setShowPopper(false);
        switch (item) {
            case "Nền sáng":
                setTheme("light-theme");
                break;

            case "Nền tối":
                setTheme("dark-theme");

                break;

            case "Tiếng Anh":
                console.log(item);
                break;

            case "Tiếng Việt":
                console.log(item);
                break;

            default:
                break;
        }
    };

    return (
        <div className={showPopper ? "Popper show" : "Popper"}>
            {settingsPopper.map((d, index) => {
                if (!d.subPopper)
                    return (
                        <a
                            href="https://www.nct.vn/ho-tro"
                            target="_blank"
                            rel="noreferrer"
                            className="Popper__item"
                            key={index}
                            onClick={() => setShowPopper(false)}
                        >
                            <div className="Popper__item-wrapper">
                                {d.icon}
                                <span>{d.title}</span>
                            </div>
                        </a>
                    );

                return (
                    <li className="Popper__item" key={index}>
                        <div className="Popper__item-wrapper">
                            {d.icon}
                            <span>{d.title}</span>
                        </div>
                        <BsChevronRight className="icon" />

                        <div className="Popper__item-sub">
                            {d.subPopper.map((item) => (
                                <div key={item} onClick={() => handleClick(item)}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </li>
                );
            })}
        </div>
    );
}

export default Popper;
