import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";

import { useGlobalContext } from "~/contexts/context";
import "./Rightbar.scss";
import RightbarDefault from "./RightbarDefault/RightbarDefault";
import { useRef } from "react";
import images from "~/assets/images";

function Rightbar() {
    const [song, setSong] = useState();
    const [songUrl, setSongUrl] = useState(null);
    const { ranking, songKey, isPlaying, setIsPlaying } = useGlobalContext();
    const songTop1 = ranking?.[0];

    // console.log({ songKey });
    console.log({ song });
    console.log({ songUrl });
    const ref = useRef(new Audio(songUrl));

    useEffect(() => {
        if (ref.current) {
            if (isPlaying) {
                ref.current.play();
            } else {
                ref.current.pause();
            }
        }
    }, [songUrl, isPlaying]);

    useEffect(() => {
        (async () => {
            try {
                const res = await NhacCuaTui.getSong(songKey);
                setSong(res?.song);
                setSongUrl(res?.song?.streamUrls?.[0]?.streamUrl);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [songKey]);
    return (
        <div className="Rightbar">
            {song ? (
                <>
                    <audio preload="auto" ref={ref} src={songUrl} />

                    <div className="Rightbar__top">
                        <div className="Rightbar__top-container">
                            <img
                                src={
                                    song.thumbnail
                                        ? song.thumbnail
                                        : images.playerDefault
                                }
                                alt={song.title}
                            />
                            <Link
                                to={"/songs/" + song.key}
                                className="title link"
                            >
                                {song.title}
                            </Link>
                            <div className="artists">
                                {song.artists.map((artist, index, artists) => (
                                    <div key={artist.artistId}>
                                        <Link
                                            to={"/artist/" + artist.shortLink}
                                            className="link"
                                        >
                                            {artist.name}
                                        </Link>
                                        {artists.length > 1 &&
                                            index < artists.length - 1 && (
                                                <span
                                                    style={{ marginRight: 4 }}
                                                >
                                                    {","}
                                                </span>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setIsPlaying(true)}>play</button>
                    <button onClick={() => setIsPlaying(false)}>pause</button>

                    <div className="Rightbar__bottom">
                        <progress max={100} value={70}>
                            70%
                        </progress>
                    </div>
                </>
            ) : (
                <RightbarDefault song={songTop1} />
            )}
        </div>
    );
}

export default Rightbar;
