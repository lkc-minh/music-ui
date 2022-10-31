import { Link } from "react-router-dom";
import images from "~/assets/images";
import "./SearchResultDeb.scss";

function SearchResultDeb({ searchResult }) {
    console.log({ searchResult });

    if (searchResult.playlist.playlist.length > 5) {
        var playlist = searchResult.playlist.playlist.slice(0, 5);
    } else {
        playlist = searchResult.playlist.playlist;
    }

    if (searchResult.song.song.length > 5) {
        var songs = searchResult.song.song.slice(0, 5);
    } else {
        songs = searchResult.song.song;
    }

    return (
        <div className="SearchResultDeb">
            <div className="SearchResultDeb__container">
                {!!searchResult.playlist.playlist.length && (
                    <div className="SearchResultDeb-item">
                        <h2>Playlist</h2>
                        <div className="SearchResultDeb-info">
                            {playlist.map((pl) => (
                                <Link
                                    to={"/playlist/" + pl.key}
                                    className="SearchResultDeb-info-item"
                                    key={pl.key}
                                >
                                    <img
                                        src={
                                            pl.thumbnail
                                                ? pl.thumbnail
                                                : images.defaultPlaylist
                                        }
                                        alt={pl.title}
                                    />
                                    <span>{pl.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {!!searchResult.song.song.length && (
                    <div className="SearchResultDeb-item">
                        <h2>Song</h2>
                        {songs.map((song) => (
                            <Link
                                to={"/songs/" + [song.key]}
                                className="SearchResultDeb-info-item"
                                key={song.key}
                            >
                                <img
                                    src={
                                        song.thumbnail
                                            ? song.thumbnail
                                            : images.defaultPlaylist
                                    }
                                    alt={song.title}
                                />
                                <span>{song.title}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchResultDeb;
