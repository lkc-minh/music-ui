import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongInfo from "~/components/SongInfo/SongInfo";
import "./Artist.scss";
import ArtistRecentSongs from "./ArtistRecentSongs/ArtistRecentSongs";

function Artist() {
    const [artistInfo, setArtistInfo] = useState();
    const { id } = useParams();
    console.log({ artistInfo });

    useEffect(() => {
        (async () => {
            const res = await NhacCuaTui.getArtistDetail(id);
            setArtistInfo(res);
        })();
    }, [id]);
    return (
        <div className="Artist">
            {id === "null" ? (
                <div>Artist not found</div>
            ) : (
                <>
                    <div className="Artist__banner">
                        <img src={artistInfo?.artist?.coverImageURL} alt="" />
                        <div className="Artist__banner-info">
                            <img src={artistInfo?.artist?.imageUrl} alt="" />
                            <span>{artistInfo?.artist?.name}</span>
                        </div>
                    </div>
                    <div className="Artist__container">
                        <div className="Artist__container-item">
                            <ArtistRecentSongs
                                songNearly={artistInfo?.songNearly}
                            />
                        </div>
                        <div className="Artist__container-item">
                            <SongInfo songs={artistInfo?.song?.song} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Artist;
