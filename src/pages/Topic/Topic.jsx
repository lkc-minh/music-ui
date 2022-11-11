import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import "./Topic.scss";
import PlaylistInfo from "~/components/PlaylistInfo/PlaylistInfo";
import { toast } from "react-toastify";
import Skeleton from "~/components/Skeleton/Skeleton";

function Topic() {
    const [topic, setTopic] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getTopicDetail(id);
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
                return;
            }
            setTopic(res?.topic);
            setIsLoading(false);
        })();
    }, [id]);
    if (isLoading) return <Skeleton page="artist" />;

    return (
        <div className="Topic">
            <div className="Topic__cover">
                <img src={topic?.coverImageURL} alt="" />
                <p>{topic?.description}</p>
            </div>
            <div className="Topic__playlist">
                <PlaylistInfo playlist={topic?.playlist} title="TOP HITS 2022" />
            </div>
        </div>
    );
}

export default Topic;
