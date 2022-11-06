import { Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import "./SongInfo.scss";

function SongInfo({ songs }) {
    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();

    const handlePlaySong = (song) => {
        console.log({ song });
        if (!song) {
            toast.error("This song not found!!!");
            return;
        }
        setPlaylistPlaying({ songs: [song] });
        setCurrentIndex(0);
    };
    return (
        <div className="SongInfo">
            <h2>Song</h2>
            <div className="SongInfo__container">
                {songs?.map((song) => (
                    <div
                        className="SongInfo__container-item"
                        key={song.key}
                        onClick={() => handlePlaySong(song)}
                    >
                        <div className="SongInfo__container-item-img">
                            <img
                                src={song.thumbnail ? song.thumbnail : images.defaultSong}
                                alt={song.title}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = images.defaultArtist;
                                }}
                            />
                        </div>
                        <div className="SongInfo__container-item-info">
                            <span className="SongInfo__container-item-info-title link">
                                {song.title}
                            </span>

                            <div className="SongInfo__container-item-info-artists">
                                {song.artists.map((art, index) => (
                                    <Fragment key={art.name}>
                                        {index > 0 ? <span style={{ marginRight: 4 }}>,</span> : ""}
                                        <Link
                                            to={
                                                art.shortLink
                                                    ? "/artist/" + art.shortLink
                                                    : "/search?q=" + art.name
                                            }
                                            className="link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {art.name}
                                        </Link>
                                    </Fragment>
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
