import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import images from "~/assets/images";
import Error from "~/components/Error/Error";
import Skeleton from "~/components/Skeleton/Skeleton";
import SongInfo from "~/components/SongInfo/SongInfo";
import "./Artist.scss";
import ArtistRecentSongs from "./ArtistRecentSongs/ArtistRecentSongs";

function Artist() {
    const [artistInfo, setArtistInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await NhacCuaTui.getArtistDetail(id);
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false);
                return;
            }
            setArtistInfo(res);
            setIsLoading(false);
        })();
    }, [id]);

    if (isLoading) return <Skeleton page="artist" />;
    if (!artistInfo) return <Error />;
    return (
        <div className="Artist">
            {id === "null" ? (
                <div>Artist not found</div>
            ) : (
                <>
                    <div className="Artist__banner">
                        <img
                            defaultValue={images.defaultArtist}
                            src={
                                artistInfo?.artist?.coverImageURL
                                    ? artistInfo?.artist?.coverImageURL
                                    : images.defaultArtist
                            }
                            alt=""
                        />
                        <div className="Artist__banner-info">
                            <img
                                src={artistInfo?.artist?.imageUrl}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = images.defaultArtist;
                                }}
                                alt={artistInfo?.artist?.name}
                            />
                            <span>{artistInfo?.artist?.name}</span>
                        </div>
                    </div>
                    <div className="Artist__container">
                        <div className="Artist__container-item">
                            <ArtistRecentSongs songNearly={artistInfo?.songNearly} />
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
