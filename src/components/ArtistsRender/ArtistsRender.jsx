import { Fragment } from "react";
import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./ArtistsRender.scss";
function ArtistsRender({ artists, isImg }) {
    return (
        <div className="ArtistsRender">
            {isImg && (
                <div className="ArtistsRender__imgs">
                    {artists?.map((artist) => (
                        <img
                            src={artist.imageUrl ? artist.imageUrl : images.defaultArtist}
                            key={artist.artistId}
                            alt=""
                            onError={(e) => {
                                e.target.src = images.defaultArtist;
                            }}
                        />
                    ))}
                </div>
            )}
            <div className="ArtistsRender__name">
                {artists?.map((artist, index) => (
                    <Fragment key={artist.artistId}>
                        <Link
                            to={
                                artist.shortLink
                                    ? "/artist/" + artist.shortLink
                                    : "/search?q=" + artist.name
                            }
                            className="link"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {artist.name}
                        </Link>
                        {artists.length > 1 && index < artists.length - 1 && (
                            <span style={{ marginRight: 4 }}>,</span>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ArtistsRender;
