import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import "./SongPage.scss";
import images from "~/assets/images";
import { AiFillPlayCircle } from "react-icons/ai";
import Tippy from "@tippyjs/react";
import { useRef } from "react";
import { useGlobalContext } from "~/contexts/context";

function SongPage() {
    const [song, setSong] = useState({});
    const [lyric, setLyric] = useState("");
    const [loadMore, setLoadMore] = useState(false);
    const { id } = useParams();
    const { getSongKey } = useGlobalContext();

    const lyricRef = useRef();
    useEffect(() => {
        (async () => {
            try {
                const res = await NhacCuaTui.getSong(id);
                console.log({ res });
                setSong(res.song);
                const resLyric = await NhacCuaTui.getLyric(id);
                setLyric(resLyric.lyric);
                // console.log({ resLyric });
            } catch (error) {}
        })();
    }, [id]);

    useEffect(() => {
        if (lyric?.lyric !== "") lyricRef.current.innerHTML = lyric?.lyric;
    }, [lyric]);

    return (
        <div className="SongPage">
            <div className="SongPage__info">
                <div className="SongPage__info-left">
                    <img src={song?.thumbnail} alt="" />
                    <Tippy content="Play" placement="bottom" arrow={false}>
                        <div
                            className="SongPage__info-left-play"
                            onClick={() => getSongKey(song.key)}
                        >
                            <AiFillPlayCircle />
                        </div>
                    </Tippy>
                </div>
                <div className="SongPage__info-right">
                    <div className="title">
                        Song: <b>{song?.title}</b>
                    </div>
                    <div className="artist">
                        <div className="artist-img">
                            {song?.artists?.map((artist) => (
                                <img
                                    src={
                                        artist.imageUrl
                                            ? artist.imageUrl
                                            : images.defaultArtist
                                    }
                                    key={artist.artistId}
                                    alt=""
                                />
                            ))}
                        </div>

                        <div className="artist-name">
                            {song?.artists?.map((artist, index) => (
                                <p key={artist.artistId}>
                                    {index > 0 && ", "}
                                    <Link
                                        to={"/artist/" + artist.artistId}
                                        className="link"
                                    >
                                        {artist.name}
                                    </Link>
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="date">2,463,499 listens • 18/08/2022</div>
                    <div className="updateBy">
                        Uploaded by: <span>M MUSIC RECORDS</span>
                    </div>
                    <div className="description">
                        Ca khúc {song?.title} do ca sĩ{" "}
                        {song?.artists?.map((artist, index) => (
                            <span key={artist.artistId}>
                                {index > 0 && ", "}
                                <span>{artist.name}</span>
                            </span>
                        ))}{" "}
                        thể hiện, thuộc thể loại Nhạc Trẻ. Các bạn có thể nghe,
                        download (tải nhạc) bài hát {song?.title} mp3,
                        playlist/album, MV/Video {song?.title} miễn phí tại
                        NhacCuaTui.com.
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

            {lyric?.lyric !== "" && (
                <div className="SongPage__lyric">
                    <div className="SongPage__lyric-top">
                        <h3>Lyric</h3>
                        <span>Edited by: {lyric?.userNameUpload}</span>
                        <hr />
                    </div>

                    <div
                        className={
                            loadMore
                                ? "SongPage__lyric-content readMore"
                                : "SongPage__lyric-content"
                        }
                        ref={lyricRef}
                    >
                        <p ref={lyricRef}></p>
                    </div>
                    <button onClick={() => setLoadMore(!loadMore)}>
                        {loadMore ? "Close" : "Load more"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default SongPage;
