import { Link } from "react-router-dom";
import "./SongHome.scss";
import SongInfo from "./SongInfo/SongInfo";

function SongHome({ data }) {
    return (
        <div className="SongHome">
            <Link className="SongHome__title">Song</Link>
            <div className="SongHome__container">
                {data.map((song) => (
                    <SongInfo song={song} key={song.key} />
                ))}
            </div>
        </div>
    );
}

export default SongHome;
