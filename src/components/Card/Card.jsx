import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./Card.scss";

function Card({ data, type }) {
    return (
        <div className="Card">
            <Link
                to={
                    type === "artist"
                        ? "/songs/" + data.key
                        : "/playlist/" + data.key
                }
                className="Card__img"
            >
                <img
                    src={data.thumbnail ? data.thumbnail : images.defaultArtist}
                    alt=""
                    width={205}
                />
                <div className="Card__img-overlay">
                    <AiFillPlayCircle className="Card__img-overlay-icon" />
                </div>
            </Link>
            {type !== "top100" && <h4>{data.title}</h4>}
            {type === "artist" && (
                <div className="Card__artists">
                    {data?.artists?.map((artist, index, artists) => (
                        <div key={artist?.artistId}>
                            <Link
                                to={"/artist/" + artist?.shortLink}
                                className="link"
                            >
                                {artist.name}
                            </Link>
                            {artists?.length > 1 &&
                                index < artists?.length - 1 && (
                                    <span style={{ marginRight: 4 }}>
                                        {","}
                                    </span>
                                )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Card;
