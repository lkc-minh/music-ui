import ArtistsRender from "~/components/ArtistsRender/ArtistsRender";
import { useGlobalContext } from "~/contexts/context";
import "./RightbarFixed.scss";

function RightbarFixed({ currentSong }) {
    const { setShowRightbar } = useGlobalContext();

    return (
        <div className="RightbarFixed" onClick={() => setShowRightbar(true)}>
            <p className="RightbarFixed-title">{currentSong?.title}</p>
            <ArtistsRender artists={currentSong?.artists} />
        </div>
    );
}

export default RightbarFixed;
