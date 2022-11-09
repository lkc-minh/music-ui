import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./HomeTop100.scss";
import "swiper/scss";

function HomeTop100({ data }) {
    return (
        <div className="HomeTop100">
            <div>
                <h2>Top 100</h2>
            </div>
            <div className="HomeTop100__container">
                <Swiper
                    slidesPerView={2}
                    spaceBetween={4}
                    slidesPerGroup={2}
                    breakpoints={{
                        480: {
                            slidesPerView: 3,
                            slidesPerGroup: 3,
                            spaceBetween: 10,
                        },
                        960: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 10,
                        },
                        1800: {
                            slidesPerView: 6,
                            slidesPerGroup: 6,
                            spaceBetween: 12,
                        },
                    }}
                >
                    {data?.map((item) => (
                        <SwiperSlide key={item.key}>
                            <Card data={item} type="top100" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default HomeTop100;
