import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NhacCuaTui from "nhaccuatui-api-full";
import "./Topic.scss";
import PlaylistInfo from "~/components/PlaylistInfo/PlaylistInfo";

function Topic() {
    const [topic, setTopic] = useState({});
    const { id } = useParams();
    console.log({ topic });

    useEffect(() => {
        (async () => {
            const res = await NhacCuaTui.getTopicDetail(id);
            setTopic(res?.topic);
        })();
    }, [id]);
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
