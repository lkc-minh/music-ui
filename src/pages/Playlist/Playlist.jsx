import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { BsHeadphones } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";

import "./Playlist.scss";

function Playlist() {
    const [playlist, setPlaylist] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeKey, setActiveKey] = useState(null);

    const { id } = useParams();

    const { setSongKey, setIsPlaying } = useGlobalContext();

    console.log({ playlist });
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const data = await NhacCuaTui.getPlaylistDetail(id);
                if (!data) return;
                data.playlist ? setPlaylist(data.playlist) : setPlaylist(null);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetch();
    }, [id]);

    const handleSong = (key) => {
        setSongKey(key);
        setActiveKey(key);
        setIsPlaying(true);
    };

    if (isLoading) return <div>loading...</div>;
    if (!playlist) return <div>No playlist to display</div>;
    return (
        <div className="Playlist">
            <div className="Playlist__info">
                <div className="Playlist__info-img">
                    <img src={playlist.thumbnail} alt="" />
                </div>
                <div className="Playlist__info-main">
                    <div className="title">
                        Playlist: <b>{playlist.title}</b>
                    </div>
                    <div className="artist">
                        <div className="artist-imgs">
                            {playlist.artists.map((artist) => (
                                <img
                                    src={
                                        artist.imageUrl
                                            ? artist.imageUrl
                                            : images.defaultArtist
                                    }
                                    key={artist.artistId}
                                    alt=""
                                    onError={(e) => {
                                        e.target.src = images.defaultArtist;
                                    }}
                                />
                            ))}
                        </div>

                        <div className="artist-name">
                            {playlist.artists.map((artist, index) => (
                                <div key={artist.artistId}>
                                    {index > 0 && ", "}
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
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="date">{playlist.dateModify}</div>
                    <div className="description">
                        Hãy cùng điểm danh những nữ ca sĩ cá tính, tài năng và
                        quyến rũ của V-Pop tạo được nhiều dấu ấn nhất trong lòng
                        khán giả qua những sản phẩm chất lượng nhất.
                    </div>
                    <div className="tags">
                        <span>Tags: </span>
                        {playlist.listTag.map((tag) => (
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
                {playlist.songs.map((song) => (
                    <div className="Playlist__song" key={song.key}>
                        <span
                            className={
                                activeKey === song.key
                                    ? "Playlist__song-title active"
                                    : "Playlist__song-title"
                            }
                            onClick={() => handleSong(song.key)}
                        >
                            {song.title}
                        </span>

                        <div className="Playlist__song-artists">
                            {song.artists.map((artist, index) => (
                                <div key={artist.artistId}>
                                    {index > 0 && ", "}
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
                                </div>
                            ))}
                        </div>
                        <div className="Playlist__song-listens">
                            <BsHeadphones /> {Math.floor(Math.random() * 100)}M
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
