import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Card.scss";

function Card({ data, type }) {
    return (
        <div className="Card">
            <Link to={"/playlist/" + data.key} className="Card__img">
                <img src={data.thumbnail} alt="" width={205} />
                <div className="Card__img-overlay">
                    <AiFillPlayCircle className="Card__img-overlay-icon" />
                </div>
            </Link>
            {type !== "top100" && <h4>{data.title}</h4>}
        </div>
    );
}

export default Card;
