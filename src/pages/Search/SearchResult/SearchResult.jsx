import images from "~/assets/images";
import PlaylistInfo from "~/components/PlaylistInfo/PlaylistInfo";
import Skeleton from "~/components/Skeleton/Skeleton";
import SongInfo from "~/components/SongInfo/SongInfo";
import "./SearchResult.scss";

function SearchResult({ searchResult, param, isLoading }) {
    if (isLoading) return <Skeleton page="searchResult" />;
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
                    <div className="SearchResult__item">
                        <img className="SearchResult__item-img" src={images.iconNoData} alt="" />
                        <p className="SearchResult__item-text">
                            No results for {param}. Please check the spelling of keyword
                        </p>
                    </div>
                )}
        </div>
    );
}

export default SearchResult;
