import Tippy from "@tippyjs/react";
import NhacCuaTui from "nhaccuatui-api-full";
import { Fragment, useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import Error from "~/components/Error/Error";
import Skeleton from "~/components/Skeleton/Skeleton";
import { useGlobalContext } from "~/contexts/context";

import "./Playlist.scss";

function Playlist() {
    const [playlist, setPlaylist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();
    const { setPlaylistPlaying, currentSong, setCurrentIndex } = useGlobalContext();

    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await NhacCuaTui.getPlaylistDetail(id);
                if (data.error) {
                    toast.error(data.error.message);
                    setIsLoading(false);
                    return;
                }
                data.playlist ? setPlaylist(data.playlist) : setPlaylist(null);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetch();
    }, [id]);

    const handleSong = (index) => {
        setCurrentIndex(index);
        setPlaylistPlaying(playlist);
    };

    if (isLoading) return <Skeleton page="detail" />;
    if (!playlist) return <Error message="No data to display" />;
    return (
        <div className="Playlist">
            <div className="Playlist__info">
                <div className="Playlist__info-img">
                    <img src={playlist.thumbnail} alt="" />
                    <Tippy touch={false} content="Play All" placement="bottom" arrow={false}>
                        <div
                            className="Playlist__info-img-play"
                            onClick={() => {
                                setPlaylistPlaying(playlist);
                                setCurrentIndex(0);
                            }}
                        >
                            <AiFillPlayCircle />
                        </div>
                    </Tippy>
                </div>
                <div className="Playlist__info-main">
                    <div className="title">
                        Playlist: <b>{playlist.title}</b>
                    </div>
                    <div className="artist">
                        <ArtistsRender isImg artists={playlist.artists} />
                    </div>
                    <div className="date">{playlist.dateModify}</div>
                    <div className="description">
                        Hãy cùng điểm danh những nữ ca sĩ cá tính, tài năng và quyến rũ của V-Pop
                        tạo được nhiều dấu ấn nhất trong lòng khán giả qua những sản phẩm chất lượng
                        nhất.
                    </div>
                    <div className="tags">
                        <span>Tags: </span>
                        {playlist.listTag?.map((tag) => (
                            <li key={tag.key} className="link">
                                {tag.name}
                            </li>
                        ))}
                    </div>
                </div>
            </div>

            <div className="Playlist__createBy">
                <img src={playlist.uploadBy.avatarUrl} alt="" />
                <div className="Playlist__createBy-info">
                    <span>Created by:</span>
                    <div className="name">{playlist.uploadBy.fullName}</div>
                </div>
            </div>

            <div className="Playlist__SongList">
                <h1>Song list</h1>
                <div className="Playlist__head">
                    <span className="Playlist__head-title">TITLE</span>
                    <span className="Playlist__head-artist">ARTIST</span>
                    <span className="Playlist__head-listens">LISTENS</span>
                    <span className="Playlist__head-duration">DURATION</span>
                </div>
                {playlist.songs?.map((song, index) => (
                    <div className="Playlist__song" key={song.key}>
                        <span
                            className={
                                currentSong?.key === song.key
                                    ? "Playlist__song-title active"
                                    : "Playlist__song-title"
                            }
                            onClick={() => handleSong(index)}
                        >
                            {song.title}
                        </span>

                        <div className="Playlist__song-artists">
                            {song.artists?.map((artist, index) => (
                                <Fragment key={artist.artistId}>
                                    {index > 0 && <span style={{ marginRight: 4 }}>,</span>}
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
                                </Fragment>
                            ))}
                        </div>
                        <div className="Playlist__song-listens">
                            <BsHeadphones /> {Math.ceil(Math.random() * 99)}M
                        </div>
                        <div className="Playlist__song-duration">
                            <span>{song.duration}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlist;
