import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./TopicEvent.scss";

function TopicEvent({ data }) {
    const newDataEnglish = data?.map((item) => ({
        ...item,
        groupName: item.groupName.split("_")[1],
    }));
    return (
        <>
            {newDataEnglish?.map((d, index) => (
                <div className="TopicEvent" key={d.groupName}>
                    <h3>{d.groupName}</h3>

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={16}
                        slidesPerGroup={6}
                        modules={[Navigation]}
                        className="mySwiper"
                        navigation={{
                            prevEl: ".prev-btn" + index,
                            nextEl: ".next-btn" + index,
                        }}
                    >
                        {d?.listPlaylist?.map((item) => (
                            <SwiperSlide key={item.title}>
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
