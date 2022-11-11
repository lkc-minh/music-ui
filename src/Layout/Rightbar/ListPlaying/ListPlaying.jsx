import { Fragment, memo } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./ListPlaying.scss";

function ListPlaying({ currentSong, isPlaying, setShowPlaylist, songsPlaylist, setCurrentIndex }) {
    return (
        <div className="ListPlaying">
            <div className="ListPlaying__playing">
                <div className="ListPlaying__playing-header">
                    <h3>Playing</h3>
                    <BsChevronDown onClick={() => setShowPlaylist(false)} />
                </div>
                <div className="ListPlaying__playing-song">
                    <div className="song-img">
                        <img
                            src={currentSong.thumbnail ? currentSong.thumbnail : images.defaultSong}
                            alt=""
                        />
                        <div className="song-status">{isPlaying ? <IoMdPause /> : <FaPlay />}</div>
                    </div>

                    <div className="song-info">
                        <h4>{currentSong.title}</h4>
                        <div className="song-artists">
                            {currentSong.artists.map((artist, index, artists) => (
                                <Fragment key={index}>
                                    <Link
                                        to={
                                            artist.shortLink
                                                ? "/artist/" + artist.shortLink
                                                : "/search?q=" + artist.name
                                        }
                                        className="link"
                                    >
                                        {artist.name}
                                    </Link>
                                    {index < artists.length - 1 && (
                                        <span style={{ marginRight: 4 }}>,</span>
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {!!songsPlaylist?.length && (
                <div className="ListPlaying__list">
                    <div className="ListPlaying__list-title">Song list</div>
                    <div className="ListPlaying__list-container">
                        {songsPlaylist.map((item, index) => (
                            <div
                                className={
                                    item.key === currentSong.key
                                        ? "ListPlaying__list-item playing"
                                        : "ListPlaying__list-item"
                                }
                                key={item.key}
                                onClick={() => {
                                    setCurrentIndex(index);
                                }}
                            >
                                <span className="ListPlaying__list-song-title">{item.title}</span>
                                <div className="ListPlaying__list-artists">
                                    {item.artists.map((artist, index, artists) => (
                                        <Fragment key={index}>
                                            <Link
                                                to={
                                                    artist.shortLink
                                                        ? "/artist/" + artist.shortLink
                                                        : "/search?q=" + artist.name
                                                }
                                                className="link"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                {artist.name}
                                            </Link>
                                            {index < artists.length - 1 && (
                                                <span style={{ marginRight: 4 }}>,</span>
                                            )}
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(ListPlaying);
