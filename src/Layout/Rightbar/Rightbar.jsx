import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "rc-slider/assets/index.css";
import { useRef } from "react";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import Controller from "./Controller/Controller";
import "./Rightbar.scss";
import RightbarDefault from "./RightbarDefault/RightbarDefault";

function Rightbar() {
    const [song, setSong] = useState();
    const [songUrl, setSongUrl] = useState(null);
    const { ranking, songKey, isPlaying, setIsPlaying } = useGlobalContext();
    const songTop1 = ranking?.[0];

    console.log({ song });
    console.log({ songUrl });
    const refAudio = useRef(new Audio(songUrl));

    useEffect(() => {
        if (refAudio.current) {
            if (isPlaying) {
                refAudio.current.play();
            } else {
                refAudio.current.pause();
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

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="Rightbar">
            {song ? (
                <>
                    <audio preload="auto" ref={refAudio} src={songUrl} />

                    <div className="Rightbar__top">
                        <div className="Rightbar__top-container">
                            <img
                                src={
                                    song.thumbnail ? song.thumbnail : images.playerDefault
                                }
                                alt={song.title}
                            />
                            <Link to={"/songs/" + song.key} className="title link">
                                {song.title}
                            </Link>
                            <div className="artists">
                                {song.artists.map((artist, index, artists) => (
                                    <div key={artist.artistId}>
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
                                        {artists.length > 1 &&
                                            index < artists.length - 1 && (
                                                <span style={{ marginRight: 4 }}>
                                                    {","}
                                                </span>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="Rightbar__bottom">
                        <Controller
                            song={song}
                            handlePlay={handlePlay}
                            isPlaying={isPlaying}
                            refAudio={refAudio}
                            setIsPlaying={setIsPlaying}
                        />
                    </div>
                </>
            ) : (
                <RightbarDefault song={songTop1} />
            )}
        </div>
    );
}

export default Rightbar;
