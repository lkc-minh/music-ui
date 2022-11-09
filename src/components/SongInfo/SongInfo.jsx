import { toast } from "react-toastify";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import ArtistsRender from "../ArtistsRender/ArtistsRender";
import "./SongInfo.scss";

function SongInfo({ songs }) {
    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();

    const handlePlaySong = (song) => {
        console.log({ song });
        if (!song) {
            toast.error("This song not found!!!");
            return;
        }
        setPlaylistPlaying({ songs: [song] });
        setCurrentIndex(0);
    };
    return (
        <div className="SongInfo">
            <h2>Song</h2>
            <div className="SongInfo__container">
                {songs?.map((song) => (
                    <div
                        className="SongInfo__container-item"
                        key={song.key}
                        onClick={() => handlePlaySong(song)}
                    >
                        <div className="SongInfo__container-item-img">
                            <img
                                src={song.thumbnail ? song.thumbnail : images.defaultSong}
                                alt={song.title}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = images.defaultArtist;
                                }}
                            />
                        </div>
                        <div className="SongInfo__container-item-info">
                            <span className="SongInfo__container-item-info-title link">
                                {song.title}
                            </span>

                            <ArtistsRender artists={song.artists} />
                            {/* </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongInfo;
