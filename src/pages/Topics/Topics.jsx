import { useEffect, useState } from "react";
import NhacCuaTui from "nhaccuatui-api-full";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper";
import { toast } from "react-toastify";

import "./Topics.scss";
import "swiper/css";
import Skeleton from "~/components/Skeleton/Skeleton";

function Topics() {
    const [topics, setTopics] = useState([]);
    const [loadMore, setLoadMore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    console.log({ topics });
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getTopics();
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
                return;
            }
            setTopics(res?.topicCover);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) return <Skeleton page="artist" />;
    return (
        <div className="Topics">
            <div className="Topics__cover">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                >
                    {topics?.map((topic) => (
                        <SwiperSlide key={topic.key}>
                            <Link to={"/topic/" + topic.key}>
                                <img src={topic.coverImageURL} alt="" />
                            </Link>
                            <p className={loadMore ? "loadMore" : ""}>{topic.description}</p>
                            <div className="Topics__cover-btn ">
                                <button className="link" onClick={() => setLoadMore(!loadMore)}>
                                    {loadMore ? "Close" : "Load more"}
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="Topics__title">
                <h2>Topics</h2>
            </div>
            <div className="Topics__container">
                {topics?.map((topic) => (
                    <div className="Topics-item" key={topic.key}>
                        <Link to={"/topic/" + topic.key}>
                            <img src={topic.thumbURL} alt={topic.title} />
                            <div className="Topics-item-overlay"></div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Topics;
