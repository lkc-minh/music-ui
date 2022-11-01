import React from "react";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./RightbarDefault.scss";

function RightbarDefault({ song }) {
    if (!song) return;
    return (
        <div className="RightbarDefault">
            <div className="RightbarDefault__top">
                <div className="RightbarDefault__top-img">
                    <img src={images.playerDefault} alt="playerDefault" />
                </div>
                <p>Enjoy the melody in your own way</p>

                <button>Play now</button>
            </div>

            <div className="RightbarDefault__bottom">
                <>
                    <div className="RightbarDefault__bottom-img">
                        {<img src={song.thumbnail} alt="" />}
                    </div>
                    <div className="RightbarDefault__bottom-info">
                        <p>Top pick these days</p>
                        <Link>
                            <h2>{song.title}</h2>
                        </Link>
                        {song.artists.map((artist) => (
                            <Link
                                className="RightbarDefault__bottom-info-artists"
                                key={artist.name}
                                title={artist.name}
                                to={"/artist/" + artist.shortLink}
                            >
                                {artist.name}
                            </Link>
                        ))}
                    </div>
                </>
            </div>
        </div>
    );
}

export default RightbarDefault;
