import { useEffect, useState } from "react";
import NhacCuaTui from "nhaccuatui-api-full";
import "./Ranking.scss";
import { useGlobalContext } from "~/contexts/context";
import RankingPosition from "./RankingPosition/RankingPosition";
import RankingSongs from "./RankingSongs/RankingSongs";
import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";

function Ranking() {
    const [ranking, setRanking] = useState([]);
    const [songTop1, setSongTop1] = useState({});
    const { setPlaylistPlaying, setCurrentIndex } = useGlobalContext();

    console.log({ ranking });
    useEffect(() => {
        (async () => {
            const res = await NhacCuaTui.getChart();

            setRanking(res?.ranking);
            setSongTop1(res?.ranking.song[0]);
        })();
    }, []);

    const handlePlay = () => {
        setPlaylistPlaying({ songs: ranking?.song });
        setCurrentIndex(0);
    };
    return (
        <div className="Ranking">
            <div className="Ranking__header">
                <div className="Ranking__header-title">weekly chart</div>
            </div>
            <div className="Ranking__container">
                <div className="Ranking-week">
                    <h2>
                        Week {ranking.week} in {ranking.year}
                    </h2>
                </div>
                <div className="Ranking-top1">
                    <div className="Ranking-top1-left">
                        <img src={songTop1.thumbnail} alt="" />
                        <div className="Ranking-top1-left-badge">TOP 1</div>
                    </div>
                    <div className="Ranking-top1-right">
                        <div className="Ranking-top1-right-info">
                            <p>
                                Song: <b>{songTop1.title}</b>
                            </p>
                            <div className="Ranking-top1-artists">
                                <ArtistsRender artists={songTop1?.artists} isImg />
                            </div>
                        </div>

                        <RankingPosition song={songTop1} />
                    </div>
                </div>

                <div className="Ranking__btn">
                    <button onClick={handlePlay}>Play All</button>
                </div>
            </div>

            <RankingSongs songs={ranking.song} isRanking />
        </div>
    );
}

export default Ranking;
