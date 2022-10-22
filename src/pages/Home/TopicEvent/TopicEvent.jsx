import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "~/components/Card/Card";
import "./TopicEvent.scss";

function TopicEvent({ data }) {
    const newDataEnglish = data.map((item) => ({
        ...item,
        groupName: item.groupName.split("_")[1],
    }));
    return (
        <>
            {newDataEnglish.map((d) => (
                <div className="TopicEvent" key={d.groupName}>
                    <h3>{d.groupName}</h3>

                    <Swiper
                        slidesPerView={6}
                        spaceBetween={16}
                        slidesPerGroup={6}
                        navigation
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {d.listPlaylist.map((item) => (
                            <SwiperSlide key={item.title}>
                                <Card data={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ))}
        </>
    );
}

export default TopicEvent;
