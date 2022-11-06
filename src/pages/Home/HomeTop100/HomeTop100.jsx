import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./HomeTop100.scss";

function HomeTop100({ data }) {
    return (
        <div className="HomeTop100">
            <div>
                <h2>Top 100</h2>
            </div>
            <div className="HomeTop100__container">
                <Swiper slidesPerView={6} spaceBetween={30}>
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
