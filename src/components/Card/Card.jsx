import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import ArtistsRender from "../ArtistsRender/ArtistsRender";
import "./Card.scss";

function Card({ data, type }) {
    return (
        <div className="Card">
            <Link
                to={type === "artist" ? "/song/" + data.key : "/playlist/" + data.key}
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
            {type !== "top100" && (
                <Link
                    className="Card__title link"
                    to={type === "artist" ? "/song/" + data.key : "/playlist/" + data.key}
                >
                    {data.title}
                </Link>
            )}
            {type === "artist" && <ArtistsRender artists={data?.artists} />}
        </div>
    );
}

export default Card;
