import "./RankingPosition.scss";

function RankingPosition({ song }) {
    return (
        <div className="RankingPosition">
            <div className="RankingPosition-item">
                <b className="oldPosition">{song.oldPosition}</b>
                <span>LAST WEEK</span>
            </div>

            <div className="RankingPosition-item">
                <b className="highestPosition">{song.highestPosition}</b>
                <span>PEAK POSITION</span>
            </div>

            <div className="RankingPosition-item">
                <b className="totalWeekInRanked">{song.totalWeekInRanked}</b>
                <span>WEEKS IN CHART</span>
            </div>
        </div>
    );
}

export default RankingPosition;
