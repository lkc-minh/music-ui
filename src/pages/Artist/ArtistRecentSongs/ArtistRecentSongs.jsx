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
                    slidesPerView={6}
                    spaceBetween={16}
                    slidesPerGroup={6}
                    navigation
                    modules={[Navigation]}
                    className="mySwiper"
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
