import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import images from "~/assets/images";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import { useGlobalContext } from "~/contexts/context";
import RankingPosition from "../RankingPosition/RankingPosition";
import "./RankingSongs.scss";

function RankingSongs({ songs, isRanking }) {
    const [showDetail, setShowDetail] = useState({});
    const { setCurrentIndex, setPlaylistPlaying } = useGlobalContext();
    const handlePlay = (index) => {
        setCurrentIndex(index);
        setPlaylistPlaying({ songs: songs });
    };

    return (
        <div className="RankingSongs">
            {songs?.map((song, index) => (
                <div
                    className={
                        showDetail[song.title] ? "RankingSongs-song detail" : "RankingSongs-song"
                    }
                    key={index}
                >
                    <div className="RankingSongs-position">{index + 1}</div>
                    <div className="RankingSongs-info">
                        <div className="RankingSongs-info-left" onClick={() => handlePlay(index)}>
                            <div className="RankingSongs-info-left-wrapper">
                                <div className="RankingSongs-info-img">
                                    <img
                                        src={song.thumbnail ? song.thumbnail : images.defaultSong}
                                        alt=""
                                    />
                                </div>
                                <div className="RankingSongs-info-song">
                                    <p>{song.title}</p>
                                    <ArtistsRender artists={song.artists} />
                                </div>
                            </div>
                            {isRanking && <RankingPosition song={song} />}
                        </div>

                        {isRanking && (
                            <div
                                className="RankingSongs-info-right"
                                onClick={() =>
                                    setShowDetail((prev) => ({
                                        ...prev,
                                        [song.title]: !showDetail[song.title],
                                    }))
                                }
                            >
                                <BsChevronDown className="link" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RankingSongs;
