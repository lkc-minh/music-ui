import { AiFillPlayCircle } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import images from "~/assets/images";
import "./PlaylistInfo.scss";

function PlaylistInfo({ playlist }) {
    const navigate = useNavigate();
    return (
        <div className="PlaylistInfo">
            <h2>Playlist</h2>
            <div className="PlaylistInfo__container">
                {playlist?.map((pl) => (
                    <div className="PlaylistInfo__container-item" key={pl.key}>
                        <Link
                            to={"/playlist/" + pl.key}
                            className="PlaylistInfo-img"
                        >
                            <img
                                src={
                                    pl.thumbnail
                                        ? pl.thumbnail
                                        : images.defaultSong
                                }
                                alt={pl.title}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = images.defaultArtist;
                                }}
                            />
                            <div className="PlaylistInfo-img-over">
                                <AiFillPlayCircle className="PlaylistInfo-img-over-ic" />
                            </div>
                        </Link>

                        <Link
                            className="link PlaylistInfo-title"
                            to={"/playlist/" + pl.key}
                        >
                            <span>{pl.title}</span>
                        </Link>
                        <div className="PlaylistInfo-artists">
                            {pl?.artists?.map((artist, index, artists) => (
                                <div
                                    className="PlaylistInfo-artist"
                                    key={artist.artistId}
                                >
                                    <Link
                                        className="link PlaylistInfo-artist-name"
                                        to={"/artist/" + artist.shortLink}
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < artists.length - 1 && (
                                        <span style={{ marginRight: 4 }}>
                                            ,
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlaylistInfo;
