import nhaccuatuiApi from "nhaccuatui-api";
import { useEffect, useState } from "react";
import "./Slider.scss";
// Import Swiper React components
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Slider() {
    const [slide, setSlide] = useState([]);
    console.log(slide);
    console.log({ nhaccuatuiApi });
    useEffect(() => {
        const fetchApi = async () => {
            const res = await nhaccuatuiApi.getHome();
            console.log({ res });
            setSlide(res.showcase);
        };

        fetchApi();
    }, []);
    return (
        <div className="Slider">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {slide.map((item) => (
                    <SwiperSlide key={item.key}>
                        <Link to={`/songs/` + item.key}>
                            <img
                                title={item.title}
                                className="Slider__img"
                                src={item.thumbnail}
                                alt=""
                            />
                        </Link>
                    </SwiperSlide>
                ))}
                <div className="prev-btn">
                    <BsChevronLeft className="Slider__icon-slider" />
                </div>
                <div className="next-btn">
                    <BsChevronRight className="Slider__icon-slider" />
                </div>
            </Swiper>
        </div>
    );
}
