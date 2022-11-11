import Slider from "rc-slider";
import { memo, useEffect, useRef, useState } from "react";
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import { FaFastBackward, FaFastForward, FaPlay } from "react-icons/fa";
import { IoMdPause } from "react-icons/io";
import "./Controller.scss";

import Tippy from "@tippyjs/react";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import "rc-slider/assets/index.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import "tippy.js/dist/tippy.css";
import { useAuthContext } from "~/contexts/authContext";
import { db } from "~/firebase";
import useLocalStorage from "~/hooks/useLocalStorage";

function Controller({
    currentSong,
    isPlaying,
    setIsPlaying,
    showPlaylist,
    setShowPlaylist,
    setCurrentIndex,
    songsPlaylist,
    currentIndex,
}) {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useLocalStorage("volume", 99);
    const { currentUser, favoritePlaylist, setFavoritePlaylist } = useAuthContext();

    const audioRef = useRef(new Audio());

    function timeConvert(num) {
        const minutes = Math.floor(num / 60);
        const seconds = Math.floor(num % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }

    function timeStringToFloat(time) {
        const minuteSecond = time.split(/[.:]/);
        const minutes = parseInt(minuteSecond[0], 10);
        const seconds = minuteSecond[1] ? parseInt(minuteSecond[1], 10) : 0;
        return minutes * 60 + seconds;
    }

    useEffect(() => {
        if (audioRef) audioRef.current.volume = currentVolume / 100;
    }, [audioRef, currentVolume]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && currentSong.streamUrls[0].streamUrl) {
            audioRef.current.src = currentSong?.streamUrls?.[0]?.streamUrl;
            // audioRef.current.play();
        }
    }, [currentSong]);

    // pause first render
    const prevSong = useRef(currentSong);

    useEffect(() => {
        if (prevSong.current.title !== currentSong.title) {
            audioRef.current.play();
        }
    }, [currentSong]);

    const handlePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleAudioUpdate = () => {
        if (!audioRef.current) {
            return;
        }

        setCurrentTime(audioRef.current.currentTime);
    };

    const handlePrevSong = () =>
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return songsPlaylist.length - 1;
            }

            return prev - 1;
        });

    const handleNextSong = () =>
        setCurrentIndex((prev) => {
            if (prev >= songsPlaylist?.length - 1) {
                return 0;
            }

            return prev + 1;
        });

    const handleFavoriteSong = async (song) => {
        if (!currentUser) {
            toast.warning("Login to use this feature.");
            return;
        }
        const checkExist = favoritePlaylist.find((item) => item.key === song.key);
        if (!checkExist) {
            try {
                const doc = await addDoc(collection(db, "favoritePlaylist"), {
                    ...song,
                    uid: currentUser?.uid,
                });
                setFavoritePlaylist((prev) => [
                    ...prev,
                    { ...song, uid: currentUser.uid, id: doc.id },
                ]);
                toast.success("Add song successfully.");
            } catch (error) {
                toast.error("Add song to favorite list failed!");
            }
        } else {
            deleteDoc(doc(db, "favoritePlaylist", checkExist?.id));
            setFavoritePlaylist((prev) => prev.filter((item) => item.key !== song.key));
            toast.info("Delete song successfully.");
        }
    };

    return (
        <div className="Controller">
            <audio
                ref={audioRef}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={handleNextSong}
                onTimeUpdate={handleAudioUpdate}
            />
            <div className="Controller__top">
                <div className="Controller__top-volume">
                    {currentVolume === 0 ? (
                        <BiVolumeMute className="ic-volume" onClick={() => setCurrentVolume(50)} />
                    ) : currentVolume > 50 ? (
                        <BiVolumeFull className="ic-volume" onClick={() => setCurrentVolume(0)} />
                    ) : (
                        <BiVolumeLow className="ic-volume" onClick={() => setCurrentVolume(0)} />
                    )}

                    <div className="Controller__top-volume-control">
                        <Slider
                            vertical
                            min={0}
                            max={100}
                            value={currentVolume}
                            onChange={(e) => {
                                setCurrentVolume(e);
                                audioRef.current.volume = currentVolume / 100;
                            }}
                            className="Controller-volume-range"
                        />
                    </div>
                </div>

                <div
                    className="Controller__top-list"
                    onClick={() => setShowPlaylist(!showPlaylist)}
                >
                    {showPlaylist ? "Now playing" : "Song list"}
                </div>
                <div
                    className="Controller__top-heart"
                    onClick={() => handleFavoriteSong(currentSong)}
                >
                    {favoritePlaylist.find((song) => song.key === currentSong.key) ? (
                        <AiFillHeart color="#f53737" />
                    ) : (
                        <AiOutlineHeart />
                    )}
                </div>
            </div>
            <div className="Controller__progress">
                <div className="Controller__progress-timer">{timeConvert(currentTime)}</div>
                <Slider
                    min={0}
                    max={timeStringToFloat(currentSong.duration)}
                    value={currentTime}
                    onChange={(e) => {
                        audioRef.current.currentTime = e;
                        setCurrentTime(e);
                    }}
                    className="Controller__progress-main"
                />
                <div className="Controller__progress-timer">{currentSong.duration}</div>
            </div>
            <div className="Controller__control">
                <Tippy touch={false} placement="bottom" content="Previous">
                    <div className="Controller__control-icNext" onClick={handlePrevSong}>
                        <FaFastBackward />
                    </div>
                </Tippy>
                <Tippy touch={false} placement="bottom" content={isPlaying ? "Pause" : "Play"}>
                    <div className="Controller__control-icPlay" onClick={handlePlay}>
                        {isPlaying ? <IoMdPause /> : <FaPlay />}
                    </div>
                </Tippy>
                <Tippy touch={false} placement="bottom" content="Next">
                    <div className="Controller__control-icNext" onClick={handleNextSong}>
                        <FaFastForward />
                    </div>
                </Tippy>
            </div>
            <div className="Controller__bot">128Kbps</div>
        </div>
    );
}

export default memo(Controller);
