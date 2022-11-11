import Tippy from "@tippyjs/react";
import { Fragment } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsHeadphones } from "react-icons/bs";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import { useAuthContext } from "~/contexts/authContext";
import { useGlobalContext } from "~/contexts/context";
import "./Music4U.scss";

function Music4U() {
    const { currentUser, favoritePlaylist } = useAuthContext();
    const { setPlaylistPlaying, currentSong, setCurrentIndex, setIsOpenSignIn } =
        useGlobalContext();

    const getArtists = (arr) => {
        const allArtists = [];
        arr.forEach((item) => allArtists.push(...item.artists));
        const allUniqueArtists = [
            ...allArtists
                .reduce((a, c) => {
                    a.set(c.artistId, c);
                    return a;
                }, new Map())
                .values(),
        ];

        if (allUniqueArtists.length > 5) {
            return allUniqueArtists.slice(0, 5);
        }

        return allUniqueArtists;
    };

    const artists = getArtists(favoritePlaylist);

    const handleSong = (index) => {
        setCurrentIndex(index);
        setPlaylistPlaying({ songs: favoritePlaylist });
    };
    return (
        <div className="Music4U">
            <div className="Music4U__info">
                <div className="Music4U__info-img">
                    <img src={images.playerDefault} alt="" />
                    <Tippy touch={false} content="Play All" placement="bottom" arrow={false}>
                        <div
                            className="Music4U__info-img-play"
                            onClick={() => {
                                if (!currentUser || !favoritePlaylist.length) return;
                                setPlaylistPlaying({ songs: favoritePlaylist });
                                setCurrentIndex(0);
                            }}
                        >
                            <AiFillPlayCircle />
                        </div>
                    </Tippy>
                </div>
                <div className="Music4U__info-main">
                    <div className="title">
                        Playlist: <b>Music 4U</b>
                    </div>
                    {currentUser && (
                        <div className="artist">
                            <ArtistsRender isImg artists={artists} />
                        </div>
                    )}
                    {/* <div className="date">{favoritePlaylist.dateModify}</div> */}
                    {!currentUser ? (
                        <>
                            <div className="description">
                                Please login for a more enjoyable experience.
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpenSignIn(true);
                                }}
                            >
                                Login
                            </button>
                        </>
                    ) : (
                        <div className="description">
                            Thị trường âm nhạc trong nước và thế giới luôn có sự biến đổi nhanh
                            chóng trong những năm gần đây. Hàng loạt bài HIT mới xuất hiện như những
                            "cơn bão" mạnh mẽ tấn công vào các bảng xếp hạng. Những gương mặt mới
                            tài năng, xinh đẹp liên tục xuất hiện làm khuynh đảo các fan yêu nhạc.
                            Với loạt các tuyển tập "Music 4U", NhacCuaTui.Com xin giới thiệu đến các
                            bạn những ca khúc HIT chọn lọc từng "làm mưa làm gió" trên các trang
                            mạng, các bảng xếp hạng toàn cầu khiến các bạn trẻ phải điên đảo trong
                            năm.
                        </div>
                    )}
                </div>
            </div>

            {currentUser && (
                <>
                    <div className="Music4U__createBy">
                        <img src={images.logo} alt="" />
                        <div className="Music4U__createBy-info">
                            <span>Created by:</span>
                            <div className="name">NHACCUATUI</div>
                        </div>
                    </div>

                    {!!favoritePlaylist.length ? (
                        <div className="Music4U__SongList">
                            <h1>Song list</h1>
                            <div className="Music4U__head">
                                <span className="Music4U__head-title">TITLE</span>
                                <span className="Music4U__head-artist">ARTIST</span>
                                <span className="Music4U__head-listens">LISTENS</span>
                                <span className="Music4U__head-duration">DURATION</span>
                            </div>
                            {favoritePlaylist?.map((song, index) => (
                                <div className="Music4U__song" key={song.key}>
                                    <span
                                        className={
                                            currentSong?.key === song.key
                                                ? "Music4U__song-title active"
                                                : "Music4U__song-title"
                                        }
                                        onClick={() => handleSong(index)}
                                    >
                                        {song.title}
                                    </span>

                                    <div className="Music4U__song-artists">
                                        {song.artists?.map((artist, index) => (
                                            <Fragment key={artist.artistId}>
                                                {index > 0 && (
                                                    <span style={{ marginRight: 4 }}>,</span>
                                                )}
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
                                    <div className="Music4U__song-listens">
                                        <BsHeadphones /> {Math.ceil(Math.random() * 99)}M
                                    </div>
                                    <div className="Music4U__song-duration">
                                        <span>{song.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: "center", paddingTop: 20 }}>Empty Playlist!!!</p>
                    )}
                </>
            )}
        </div>
    );
}

export default Music4U;
