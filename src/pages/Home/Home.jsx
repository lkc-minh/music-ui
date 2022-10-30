import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import SongInfo from "~/components/SongInfo/SongInfo";

import "./Home.scss";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";
import NewRelease from "./NewRelease/NewRelease";
import Showcase from "./Showcase/Showcase";
import HomeTop100 from "./HomeTop100/HomeTop100";
import TopicEvent from "./TopicEvent/TopicEvent";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showcase, setShowcase] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [song, setSong] = useState([]);
    const [top100, setTop100] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const data = await NhacCuaTui.getHome();
                // console.log({ data });
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
