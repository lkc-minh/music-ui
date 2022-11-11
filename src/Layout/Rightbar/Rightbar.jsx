import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "rc-slider/assets/index.css";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import Controller from "./Controller/Controller";
import ListPlaying from "./ListPlaying/ListPlaying";
import "./Rightbar.scss";
import RightbarDefault from "./RightbarDefault/RightbarDefault";
import { toast } from "react-toastify";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import { useRef } from "react";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import RightbarFixed from "./RightbarFixed/RightbarFixed";

function Rightbar() {
    const [showPlaylist, setShowPlaylist] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const {
        playlistPlaying,
        showRightbar,
        setShowRightbar,
        currentSong,
        setCurrentSong,
        currentIndex,
        setCurrentIndex,
    } = useGlobalContext();

    const rightbarRef = useRef();
    useOnClickOutside(rightbarRef, () => setShowRightbar(false));

    useEffect(() => {
        (async () => {
            if (!playlistPlaying.songs) return;
            try {
                const res = await NhacCuaTui.getSong(
                    playlistPlaying?.songs?.[currentIndex]?.key ||
                        playlistPlaying?.songs?.[currentIndex]?.songKey
                );

                if (res.error) {
                    toast.error(res.error.message);
                    return;
                }

                if (res.song.streamUrls.length === 0) {
                    toast.error("This song not found. =((");
                    return;
                }

                setCurrentSong(res?.song);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [setCurrentSong, currentIndex, playlistPlaying]);

    return (
        <>
            <div className={showRightbar ? "Rightbar expand" : "Rightbar"} ref={rightbarRef}>
                {currentSong ? (
                    <>
                        <div className="Rightbar__top">
                            {showPlaylist ? (
                                <ListPlaying
                                    currentSong={currentSong}
                                    isPlaying={isPlaying}
                                    setShowPlaylist={setShowPlaylist}
                                    songsPlaylist={playlistPlaying?.songs}
                                    setCurrentIndex={setCurrentIndex}
                                />
                            ) : (
                                <>
                                    <div className="Rightbar__top-container">
                                        <img
                                            src={
                                                currentSong.thumbnail
                                                    ? currentSong.thumbnail
                                                    : images.playerDefault
                                            }
                                            alt={currentSong.title}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = images.playerDefault;
                                            }}
                                        />
                                        <Link
                                            to={"/song/" + currentSong.key}
                                            className="title link"
                                        >
                                            {currentSong.title}
                                        </Link>
                                        <div className="artists">
                                            <ArtistsRender artists={currentSong.artists} />
                                        </div>
                                    </div>
                                    {playlistPlaying?.title && (
                                        <Link
                                            className="link Rightbar__playlist-title"
                                            to={"/playlist/" + playlistPlaying.key}
                                        >
                                            {playlistPlaying.title}
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="Rightbar__bottom">
                            <Controller
                                currentSong={currentSong}
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                showPlaylist={showPlaylist}
                                setShowPlaylist={setShowPlaylist}
                                songsPlaylist={playlistPlaying?.songs}
                                currentIndex={currentIndex}
                                setCurrentIndex={setCurrentIndex}
                            />
                        </div>
                    </>
                ) : (
                    <RightbarDefault />
                )}
            </div>

            <RightbarFixed currentSong={currentSong} />
        </>
    );
}

export default Rightbar;
