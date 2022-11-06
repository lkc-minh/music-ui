import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import SongInfo from "~/components/SongInfo/SongInfo";

import "./Home.scss";
import HomeSkeleton from "./HomeSkeleton/HomeSkeleton";
import HomeTop100 from "./HomeTop100/HomeTop100";
import NewRelease from "./NewRelease/NewRelease";
import Showcase from "./Showcase/Showcase";
import TopicEvent from "./TopicEvent/TopicEvent";

import { toast } from "react-toastify";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [showcase, setShowcase] = useState([]);
    const [topicEvent, setTopicEvent] = useState([]);
    const [newReleases, setNewReleases] = useState([]);
    const [song, setSong] = useState([]);
    const [top100, setTop100] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            try {
                const data = await NhacCuaTui.getHome();

                if (data.error) {
                    toast.error(data.error.message);
                    setIsLoading(false);
                    return;
                }
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
                    {showcase && <Showcase data={showcase} />}
                    {topicEvent && <TopicEvent data={topicEvent} />}
                    {newReleases && <NewRelease data={newReleases} />}
                    {song && <SongInfo songs={song} />}
                    {top100 && <HomeTop100 data={top100} />}
                </>
            )}
        </div>
    );
}

export default Home;
