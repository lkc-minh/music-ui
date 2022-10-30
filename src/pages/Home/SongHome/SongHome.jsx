import { Link } from "react-router-dom";
import "./SongHome.scss";
import SongInfo from "../../../components/SongInfo/SongInfo";

function SongHome({ data }) {
    return (
        <div className="SongHome">
            <div className="SongHome__container">
                <SongInfo songs={data} />
            </div>
        </div>
    );
}

export default SongHome;
