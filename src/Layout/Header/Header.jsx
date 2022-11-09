import { AiOutlineMenu } from "react-icons/ai";
import { SiBbciplayer } from "react-icons/si";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import "./Header.scss";

function Header() {
    const { setShowSidebar, setShowRightbar } = useGlobalContext();
    return (
        <div className="Header">
            <div className="Header__left" onClick={() => setShowSidebar(true)}>
                <AiOutlineMenu />
            </div>
            <div className="Header__center">
                <Link to={"/"}>
                    <img src={images.logo} alt="" />
                </Link>
            </div>

            <div className="Header__right" onClick={() => setShowRightbar(true)}>
                <SiBbciplayer />
            </div>
        </div>
    );
}

export default Header;
