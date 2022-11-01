import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import SongInfo from "~/components/SongInfo/SongInfo";

import "./Home.scss";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";
import NewRelease from "./NewRelease/NewRelease";
import Showcase from "./Showcase/Showcase";
import HomeTop100 from "./HomeTop100/HomeTop100";
import TopicEvent from "./TopicEvent/TopicEvent";
import images from "~/assets/images";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showcase, setShowcase] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [song, setSong] = useState([]);
    const [top100, setTop100] = useState([]);
    const [error, setError] = useState({ status: false, message: "" });

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const data = await NhacCuaTui.getHome();
                data.error.message &&
                    setError({ status: true, message: data.error.message });
                setShowcase(data?.showcase);
                setTopicEvent(data?.topicEvent);
                setNewReleases(data?.newRelease?.song);
                setSong(data?.song);
                setTop100(data?.top100);
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        };
        fetchApi();
    }, []);
    return (
        <div className="Home">
            {isLoading ? (
                <HomeSkeleton />
            ) : error ? (
                <div className="Home__error">
                    <img src={images.iconNoData} alt="" />
                    <h1>{error.message}</h1>
                </div>
            ) : (
                <>
                    <Showcase data={showcase} />
                    <TopicEvent data={topicEvent} />
                    <NewRelease data={newReleases} />
                    <SongInfo songs={song} />
                    <HomeTop100 data={top100} />
                </>
            )}
        </div>
    );
}

export default Home;
