import { Link } from "react-router-dom";
import "./SongInfo.scss";

function SongInfo({ song }) {
    return (
        <div className="SongInfo">
            <div className="SongInfo__container">
                <div className="SongInfo__container-img">
                    <img src={song.thumbnail} alt={song.title} />
                </div>
                <div className="SongInfo__container-info">
                    <Link
                        to={"/songs/" + song.key}
                        className="SongInfo__container-info-title link"
                    >
                        {song.title}
                    </Link>

                    <div className="SongInfo__container-info-artists">
                        {song.artists.map((art, index) => (
                            <span key={art.name}>
                                {index > 0 ? ", " : ""}
                                <Link className="link">{art.name}</Link>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;
