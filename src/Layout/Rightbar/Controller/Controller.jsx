import Slider from "rc-slider";
import React, { useEffect, useState } from "react";
import { BiVolumeFull, BiVolumeLow, BiVolumeMute } from "react-icons/bi";
import { FaFastBackward, FaFastForward, FaPlay } from "react-icons/fa";
import "./Controller.scss";
import { IoMdPause } from "react-icons/io";

import "rc-slider/assets/index.css";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { AiOutlineHeart } from "react-icons/ai";
import useLocalStorage from "~/hooks/useLocalStorage";

function Controller({ song, isPlaying, setIsPlaying, handlePlay, refAudio }) {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentVolume, setCurrentVolume] = useLocalStorage("volume", 99);

    function timeConvert(num) {
        const minutes = Math.floor(num / 60);
        const seconds = Math.floor(num % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    }

    useEffect(() => {
        setCurrentTime(0);
    }, [song, setCurrentTime]);

    useEffect(() => {
        if (refAudio) refAudio.current.volume = currentVolume / 100;
    }, [refAudio, currentVolume]);

    // useEffect(() => {
    //      if (refAudio) refAudio.current.currentTime = currentTime;
    // }, [refAudio, currentTime]);

    function timeStringToFloat(time) {
        const minuteSecond = time.split(/[.:]/);
        const minutes = parseInt(minuteSecond[0], 10);
        const seconds = minuteSecond[1] ? parseInt(minuteSecond[1], 10) : 0;
        return minutes * 60 + seconds;
    }

    console.log({ currentTime });
    console.log("current time: ", refAudio?.current?.currentTime);
    // console.log("volume: ", refAudio?.current?.volume * 100);

    useEffect(() => {
        console.log("change");
        let timeout;
        if (isPlaying) {
            timeout = setInterval(() => {
                // setCurrentTime(refAudio.current.currentTime);
                if (currentTime < refAudio?.current?.duration) {
                    setCurrentTime((prev) => prev + 1);
                } else {
                    setIsPlaying(false);
                }
            }, 1000);
        }

        return () => clearInterval(timeout);
    }, [refAudio, isPlaying, setCurrentTime, currentTime, setIsPlaying]);

    return (
        <div className="Controller">
            <div className="Controller__top">
                <div className="Controller__top-volume">
                    {currentVolume === 0 ? (
                        <BiVolumeMute
                            className="ic-volume"
                            onClick={() => setCurrentVolume(50)}
                        />
                    ) : currentVolume > 50 ? (
                        <BiVolumeFull
                            className="ic-volume"
                            onClick={() => setCurrentVolume(0)}
                        />
                    ) : (
                        <BiVolumeLow
                            className="ic-volume"
                            onClick={() => setCurrentVolume(0)}
                        />
                    )}

                    <div className="Controller__top-volume-control">
                        <Slider
                            vertical
                            min={0}
                            max={100}
                            value={currentVolume}
                            onChange={(e) => {
                                setCurrentVolume(e);
                                refAudio.current.volume = currentVolume / 100;
                                console.log({ e });
                            }}
                            className="Controller-volume-range"
                        />
                    </div>
                </div>

                <div className="Controller__top-list">Song list</div>
                <div className="Controller__top-heart">
                    <AiOutlineHeart />
                </div>
            </div>
            <div className="Controller__progress">
                <div className="Controller__progress-timer">
                    {timeConvert(currentTime)}
                </div>
                <Slider
                    min={0}
                    max={timeStringToFloat(song.duration)}
                    value={currentTime}
                    onChange={(e) => {
                        refAudio.current.currentTime = e;
                        setCurrentTime(e);
                    }}
                    className="Controller__progress-main"
                />
                <div className="Controller__progress-timer">{song.duration}</div>
            </div>
            <div className="Controller__control">
                <Tippy hideOnClick={false} placement="bottom" content="Previous">
                    <div className="Controller__control-icNext">
                        <FaFastBackward />
                    </div>
                </Tippy>
                <Tippy
                    hideOnClick={false}
                    placement="bottom"
                    content={isPlaying ? "Pause" : "Play"}
                >
                    <div className="Controller__control-icPlay" onClick={handlePlay}>
                        {isPlaying ? <IoMdPause /> : <FaPlay />}
                    </div>
                </Tippy>
                <Tippy hideOnClick={false} placement="bottom" content="Next">
                    <div className="Controller__control-icNext">
                        <FaFastForward />
                    </div>
                </Tippy>
            </div>
            <div className="Controller__bot">128Kbps</div>
        </div>
    );
}

export default Controller;
