import PlaylistInfo from "~/components/PlaylistInfo/PlaylistInfo";
import SongInfo from "~/components/SongInfo/SongInfo";
import "./SearchResult.scss";

function SearchResult({ searchResult }) {
    console.log({ searchResult });
    return (
        <div className="SearchResult">
            {searchResult?.song?.song.length > 0 && (
                <div className="SearchResult__item">
                    <SongInfo songs={searchResult?.song?.song} />
                </div>
            )}

            {searchResult?.playlist?.playlist.length > 0 && (
                <div className="SearchResult__item">
                    <PlaylistInfo playlist={searchResult?.playlist?.playlist} />
                </div>
            )}

            {searchResult?.song?.song.length === 0 &&
                searchResult?.playlist?.playlist.length === 0 && (
                    <div>No have data</div>
                )}
        </div>
    );
}

export default SearchResult;
