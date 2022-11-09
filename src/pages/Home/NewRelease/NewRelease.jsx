import moment from "moment";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import "./NewRelease.scss";

function NewRelease({ data }) {
    return (
        <div className="NewRelease">
            <div className="NewRelease__title ">New Releases</div>
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
                                        to={"/song/" + song.key}
                                        className="NewRelease-info-title link"
                                    >
                                        {song.title}
                                    </Link>

                                    <div className="NewRelease-info-artists">
                                        <ArtistsRender isImg imgCenter artists={song.artists} />
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
