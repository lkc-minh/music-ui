import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Skeleton from "~/components/Skeleton/Skeleton";
import { useGlobalContext } from "~/contexts/context";
import RankingSongs from "../Ranking/RankingSongs/RankingSongs";
import "./Top100.scss";

function Top100() {
    const [top100, setTop100] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();
    console.log({ top100 });
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getTop100("m3liaiy6vVsF");
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
            }
            setTop100(res?.playlist);
            setIsLoading(false);
        })();
    }, []);

    const handlePlay = () => {
        setPlaylistPlaying(top100);
        setCurrentIndex(0);
    };

    return (
        <div className="Top100">
            <div className="Top100__header">
                <div className="Top100__header-title">Vietnam</div>
            </div>
           {isLoading ?(<Skeleton page='ranking'/>) :<>
                <div className="Top100__banner">
                    <div className="Top100__banner-left">
                        <h2>TOP 100</h2>
                        <p>NHẠC TRẺ - Updated: {top100?.dateModify}</p>
                    </div>

                    <div className="Top100__banner-right">
                        <button onClick={handlePlay}>Play All</button>
                    </div>
                </div>
                <RankingSongs songs={top100?.songs} />
            </>}
        </div>
    );
}

export default Top100;
