import React from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./ArtistRecentSongs.scss";

function ArtistRecentSongs({ songNearly }) {
    return (
        <div className="ArtistRecentSongs">
            <h2>Recent</h2>
            <div className="ArtistRecentSongs__item">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={16}
                    slidesPerGroup={2}
                    navigation
                    modules={[Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        480: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                        },
                        960: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                        },
                        1800: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {songNearly?.map((song) => (
                        <SwiperSlide key={song.key}>
                            <Card data={song} key={song.key} type="artist" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ArtistRecentSongs;
