import moment from "moment";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import "./MaybeHit.scss";

function MaybeHit({ song }) {
    return (
        <div className="MaybeHit">
            <div className="MaybeHit-showcase">
                <div className="MaybeHit-img">
                    <img src={song?.thumbnail} alt="" />
                </div>
                <div className="MaybeHit-info">
                    <Link to={"/song/" + song?.key} className="MaybeHit-info-title link">
                        {song?.title}
                    </Link>

                    <div className="MaybeHit-info-artists">
                        <ArtistsRender isImg artists={song?.artists} imgCenter />
                    </div>

                    <div className="MaybeHit-info-date">
                        <HiOutlineCalendar />
                        <span>Released date: </span>
                        {moment(song?.dateRelease).format("DD/MM/YYYY")}
                    </div>
                    <div className="MaybeHit-info-hr"></div>
                </div>
            </div>
        </div>
    );
}

export default MaybeHit;
