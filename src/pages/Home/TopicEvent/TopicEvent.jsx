import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./TopicEvent.scss";
import "swiper/scss";
function TopicEvent({ data }) {
    const newDataEnglish = data?.map((item) => ({
        ...item,
        groupName: item.groupName.split("_")[1],
    }));
    return (
        <>
            {newDataEnglish?.map((d, index) => (
                <div className="TopicEvent" key={index}>
                    <h3>{d.groupName}</h3>

                    <Swiper
                        slidesPerView={2}
                        spaceBetween={4}
                        slidesPerGroup={2}
                        breakpoints={{
                            480: {
                                slidesPerView: 3,
                                slidesPerGroup: 3,
                                spaceBetween: 8,
                            },
                            960: {
                                slidesPerView: 4,
                                slidesPerGroup: 4,
                                spaceBetween: 8,
                            },
                            1800: {
                                slidesPerView: 6,
                                slidesPerGroup: 6,
                                spaceBetween: 12,
                            },
                        }}
                        modules={[Navigation]}
                        className="mySwiper"
                        navigation={{
                            prevEl: ".prev-btn" + index,
                            nextEl: ".next-btn" + index,
                        }}
                    >
                        {d?.listPlaylist?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="TopicEvent__btns">
                        <div className={`prev-btn${index} TopicEvent-prev-btn`}>
                            <BsChevronLeft />
                        </div>
                        <div className={`next-btn${index} TopicEvent-next-btn`}>
                            <BsChevronRight />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default TopicEvent;
