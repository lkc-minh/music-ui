import { Link } from "react-router-dom";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import "./SongInfo.scss";

function SongInfo({ songs }) {
    const { setIsPlaying, setSongKey } = useGlobalContext();

    const handlePlaySong = (key) => {
        setSongKey(key);
        setIsPlaying(true);
    };
    return (
        <div className="SongInfo">
            <h2>Song</h2>
            <div className="SongInfo__container">
                {songs?.map((song) => (
                    <div className="SongInfo__container-item" key={song.key}>
                        <div className="SongInfo__container-item-img">
                            <img
                                src={
                                    song.thumbnail
                                        ? song.thumbnail
                                        : images.defaultSong
                                }
                                alt={song.title}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = images.defaultArtist;
                                }}
                                // onError={({ currentTarget }) => {
                                //     currentTarget.onerror = null; // prevents looping
                                //     currentTarget.src = images.defaultSong;
                                // }}
                            />
                        </div>
                        <div className="SongInfo__container-item-info">
                            <span
                                onClick={() => handlePlaySong(song.key)}
                                className="SongInfo__container-item-info-title link"
                            >
                                {song.title}
                            </span>

                            <div className="SongInfo__container-item-info-artists">
                                {song.artists.map((art, index) => (
                                    <span key={art.name}>
                                        {index > 0 ? ", " : ""}
                                        <Link
                                            to={"/artist/" + art.shortLink}
                                            className="link"
                                        >
                                            {art.name}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongInfo;
