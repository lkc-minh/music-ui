import Tippy from "@tippyjs/react";
import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";
import images from "~/assets/images";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import Skeleton from "~/components/Skeleton/Skeleton";
import { useGlobalContext } from "~/contexts/context";
import Lyric from "./Lyric/Lyric";
import "./SongPage.scss";

function SongPage() {
    const [song, setSong] = useState({});
    const [lyric, setLyric] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getSong(id);
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
                return;
            }
            setSong(res.song);
            setIsLoading(false);
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getLyric(id);
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
                return;
            }
            setLyric(res?.lyric);
            setIsLoading(false);
        })();
    }, [id]);

    const handlePlaySong = () => {
        if (!song) {
            toast.error("This song not found!!!");
            return;
        }
        setCurrentIndex(0);
        setPlaylistPlaying({ songs: [song] });
    };

    if (isLoading) return <Skeleton page="detail" />;

    return (
        <div className="SongPage">
            <div className="SongPage__info">
                <div className="SongPage__info-left">
                    <img
                        src={song?.thumbnail ? song?.thumbnail : images.playerDefault}
                        alt={song?.title}
                        onError={(e) =>
                            (e.target.onerror === null)((e.target.src = images.playerDefault))
                        }
                    />
                    <Tippy content="Play" placement="bottom" arrow={false}>
                        <div className="SongPage__info-left-play" onClick={handlePlaySong}>
                            <AiFillPlayCircle />
                        </div>
                    </Tippy>
                </div>
                <div className="SongPage__info-right">
                    <div className="title">
                        Song: <b>{song?.title}</b>
                    </div>
                    <div className="artist">
                        <ArtistsRender isImg artists={song.artists} />
                    </div>
                    <div className="date">2,463,499 listens • 18/08/2022</div>
                    <div className="updateBy">
                        Uploaded by: <span>M MUSIC RECORDS</span>
                    </div>
                    <div className="description">
                        Ca khúc {song?.title} do ca sĩ{" "}
                        {song?.artists?.map((artist, index) => (
                            <span key={artist.artistId}>
                                {index > 0 && <span style={{ marginRight: 4 }}>,</span>}
                                <span>{artist.name}</span>
                            </span>
                        ))}{" "}
                        thể hiện, thuộc thể loại Nhạc Trẻ. Các bạn có thể nghe, download (tải nhạc)
                        bài hát {song?.title} mp3, playlist/album, MV/Video {song?.title} miễn phí
                        tại NhacCuaTui.com.
                    </div>
                </div>
            </div>

            <div className="SongPage__providedBy">
                <img
                    src="https://avatar-ex-swe.nixcdn.com/provider/2022/06/28/6/c/5/d/1656392106957.jpg"
                    alt=""
                />
                <div className="SongPage__providedBy-right">
                    <span>Provided by:</span>
                    <span>M MUSIC RECORDS</span>
                </div>
            </div>

            {lyric?.lyric !== "" && lyric?.lyric && <Lyric lyric={lyric} />}
        </div>
    );
}

export default SongPage;
