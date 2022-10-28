import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import "./SongPage.scss";
import images from "~/assets/images";

function SongPage() {
    const [song, setSong] = useState({});
    const [lyric, setLyric] = useState("");
    const { id } = useParams();

    console.log({ song });
    console.log({ lyric });
    useEffect(() => {
        (async () => {
            try {
                const res = await NhacCuaTui.getSong(id);
                console.log({ res });
                setSong(res.song);
                const resLyric = await NhacCuaTui.getLyric(id);
                setLyric(resLyric);
                // console.log({ resLyric });
            } catch (error) {}
        })();
    }, [id]);

    return (
        <div className="SongPage">
            <div className="SongPage__info">
                <div className="SongPage__info-img">
                    <img src={song?.thumbnail} alt="" />
                </div>
                <div className="SongPage__info-main">
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

                        {song?.artists?.map((artist, index) => (
                            <div key={artist.artistId}>
                                {index > 0 && ", "}
                                <span className="link">{artist.name}</span>
                            </div>
                        ))}
                    </div>
                    {/* <div className="date">{song.dateModify}</div> */}
                    <div className="description">
                        Hãy cùng điểm danh những nữ ca sĩ cá tính, tài năng và
                        quyến rũ của V-Pop tạo được nhiều dấu ấn nhất trong lòng
                        khán giả qua những sản phẩm chất lượng nhất.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SongPage;
