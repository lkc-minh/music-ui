import moment from "moment";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                className="mySwiper"
            >
                {data.map((song) => (
                    <SwiperSlide key={song.title}>
                        <div className="NewRelease__item">
                            <div className="NewRelease__item-showcase">
                                <div className="NewRelease-img">
                                    <img src={song.thumbnail} alt="" />
                                </div>
                                <div className="NewRelease-info">
                                    <Link className="NewRelease-info-title link">
                                        {song.title}
                                    </Link>

                                    <div className="NewRelease-info-artists">
                                        {song.artists.map((art) => (
                                            <img
                                                key={art.name}
                                                src={art.imageUrl}
                                                alt=""
                                                width={25}
                                            />
                                        ))}
                                        {song.artists.map((art) => (
                                            <Link key={art.name} className="link">
                                                {art.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="NewRelease-info-date">
                                        <HiOutlineCalendar />
                                        <span>Released date: </span>
                                        {moment(song.dateRelease).format("DD/MM/YYYY")}
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
