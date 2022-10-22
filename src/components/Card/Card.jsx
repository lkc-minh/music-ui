import { AiFillPlayCircle } from "react-icons/ai";
import "./Card.scss";

function Card({ data }) {
    return (
        <div className="Card">
            <div className="Card__img">
                <img src={data.thumbnail} alt="" width={205} />
                <div className="Card__img-overlay">
                    <AiFillPlayCircle className="Card__img-overlay-icon" />
                </div>
            </div>
            <h4>{data.title}</h4>
        </div>
    );
}

export default Card;
