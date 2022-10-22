import nhaccuatuiApi from "nhaccuatui-api";
import { useEffect, useState } from "react";

import "./Home.scss";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";
import HotTopic from "./HotTopic/HotTopic";
import NewRelease from "./NewRelease/NewRelease";
import Showcase from "./Showcase/Showcase";
import SongHome from "./SongHome/SongHome";
import TopicEvent from "./TopicEvent/TopicEvent";

function Home() {
    const [showcase, setShowcase] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [song, setSong] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const data = await nhaccuatuiApi.getHome();

                setShowcase(data.showcase);
                setTopicEvent(data.topicEvent);
                setNewReleases(data.newRelease.song);
                setSong(data.song);
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
                    <SongHome data={song} />
                    <HotTopic />
                </>
            )}
        </div>
    );
}

export default Home;
