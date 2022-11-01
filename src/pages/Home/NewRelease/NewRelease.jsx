import moment from "moment";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import images from "~/assets/images";
import "./NewRelease.scss";

function NewRelease({ data }) {
    return (
        <div className="NewRelease">
            <Link className="NewRelease__title link">New Releases</Link>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {data?.map((song) => (
                    <SwiperSlide key={song.title}>
                        <div className="NewRelease__item">
                            <div className="NewRelease__item-showcase">
                                <div className="NewRelease-img">
                                    <img src={song.thumbnail} alt="" />
                                </div>
                                <div className="NewRelease-info">
                                    <Link
                                        to={"/songs/" + song.key}
                                        className="NewRelease-info-title link"
                                    >
                                        {song.title}
                                    </Link>

                                    <div className="NewRelease-info-artists">
                                        <div className="NewRelease-info-artists-img">
                                            {song.artists.map((art) => (
                                                <img
                                                    key={art.name}
                                                    src={
                                                        art.imageUrl
                                                            ? art.imageUrl
                                                            : images.defaultArtist
                                                    }
                                                    alt={art.name}
                                                    onError={(e) =>
                                                        (
                                                            e.target.onerror ===
                                                            null
                                                        )(
                                                            (e.target.src =
                                                                images.defaultArtist)
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                        {song.artists.map((art, index) => (
                                            <span key={art.name}>
                                                {index > 0 ? ", " : ""}
                                                <Link
                                                    to={
                                                        art.shortLink
                                                            ? "/artist/" +
                                                              art.shortLink
                                                            : "/search?q=" +
                                                              art.name
                                                    }
                                                    className="link"
                                                >
                                                    {art.name}
                                                </Link>
                                            </span>
                                        ))}
                                    </div>

                                    <div className="NewRelease-info-date">
                                        <HiOutlineCalendar />
                                        <span>Released date: </span>
                                        {moment(song.dateRelease).format(
                                            "DD/MM/YYYY"
                                        )}
                                    </div>
                                    <div className="NewRelease-info-hr"></div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default NewRelease;
