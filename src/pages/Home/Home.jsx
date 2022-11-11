import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import SongInfo from "~/components/SongInfo/SongInfo";

import "./Home.scss";
import HomeTop100 from "./HomeTop100/HomeTop100";
import NewRelease from "./NewRelease/NewRelease";
import Showcase from "./Showcase/Showcase";
import TopicEvent from "./TopicEvent/TopicEvent";

import { toast } from "react-toastify";
import Skeleton from "~/components/Skeleton/Skeleton";

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

                if (data.error) {
                    toast.error(data.error.message);
                    setIsLoading(false);
                    return;
                }

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
                <Skeleton page={"home"} />
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
