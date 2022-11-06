import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import { toast } from "react-toastify";

import { useGlobalContext } from "~/contexts/context";
import images from "~/assets/images";
import "./RightbarDefault.scss";

function RightbarDefault() {
    const [songTop1, setSongTop1] = useState(null);

    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();

    useEffect(() => {
        const fetchApi = async () => {
            const data = await NhacCuaTui.getHome();
            if (data.error) toast.error(data.error.message);
            console.log({ data });
            setSongTop1(data?.ranking?.song[0]);
        };
        fetchApi();
    }, []);
    console.log({ songTop1 });
    if (!songTop1) return;
    return (
        <div className="RightbarDefault">
            <div className="RightbarDefault__top">
                <div className="RightbarDefault__top-img">
                    <img src={images.playerDefault} alt="playerDefault" />
                </div>
                <p>Enjoy the melody in your own way</p>

                <button
                    onClick={() => {
                        if (!songTop1) {
                            toast.error("This song not found!!!");
                            return;
                        }
                        setCurrentIndex(0);
                        setPlaylistPlaying({ songs: [songTop1] });
                    }}
                >
                    Play now
                </button>
            </div>

            <div className="RightbarDefault__bottom">
                <>
                    <div className="RightbarDefault__bottom-img">
                        {<img src={songTop1.thumbnail} alt="" />}
                    </div>
                    <div className="RightbarDefault__bottom-info">
                        <p>Top pick these days</p>
                        <Link to={"/song/" + songTop1.songKey}>
                            <h2>{songTop1.title}</h2>
                        </Link>
                        {songTop1.artists.map((artist) => (
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
