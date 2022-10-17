import { Link } from "react-router-dom";
import images from "~/assets/images";
import { useGlobalContext } from "~/contexts/context";
import "./Rightbar.scss";

function Rightbar() {
    const { ranking } = useGlobalContext();
    const songTop1 = ranking[0];
    console.log({ songTop1 });
    return (
        <div className="Rightbar">
            <div className="Rightbar__top">
                <div className="Rightbar__top-img">
                    <img src={images.playerDefault} alt="playerDefault" />
                </div>
                <p>Enjoy the melody in your own way</p>

                <button>Play now</button>
            </div>

            <div className="Rightbar__bottom">
                {songTop1 && (
                    <>
                        <div className="Rightbar__bottom-img">
                            {<img src={songTop1.thumbnail} alt="" />}
                        </div>
                        <div className="Rightbar__bottom-info">
                            <p>Top pick these days</p>
                            <Link>
                                <h2>{songTop1.title}</h2>
                            </Link>
                            {songTop1.artists.map((artist) => (
                                <Link
                                    className="Rightbar__bottom-info-artists"
                                    key={artist.name}
                                    title={artist.name}
                                >
                                    {artist.name}
                                    <span>,</span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Rightbar;
