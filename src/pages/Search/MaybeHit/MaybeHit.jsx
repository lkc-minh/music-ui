import moment from "moment";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./MaybeHit.scss";

function MaybeHit({ song }) {
    return (
        <div className="MaybeHit">
            <div className="MaybeHit-showcase">
                <div className="MaybeHit-img">
                    <img src={song?.thumbnail} alt="" />
                </div>
                <div className="MaybeHit-info">
                    <Link
                        to={"/songs/" + song?.key}
                        className="MaybeHit-info-title link"
                    >
                        {song?.title}
                    </Link>

                    <div className="MaybeHit-info-artists">
                        <div className="MaybeHit-info-artists-img">
                            {song?.artists?.map((art) => (
                                <img
                                    key={art.name}
                                    src={
                                        art.imageUrl ===
                                            "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/08/09/1/b/e/7/1470738154924_300.jpg" ||
                                        !art.imageUrl
                                            ? images.defaultArtist
                                            : art.imageUrl
                                    }
                                    alt={art.name}
                                    width={25}
                                />
                            ))}
                        </div>
                        {song?.artists?.map((art, index) => (
                            <span key={art.name}>
                                {index > 0 ? ", " : ""}
                                <Link
                                    to={"/artist/" + art.shortLink}
                                    className="link"
                                >
                                    {art.name}
                                </Link>
                            </span>
                        ))}
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
