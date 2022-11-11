import React from "react";
import SongInfo from "~/components/SongInfo/SongInfo";

function ArtistSongs(songs) {
    return (
        <div className="ArtistSongs">
            <h2>Song</h2>
            <SongInfo songs={songs?.songs} />
        </div>
    );
}

export default ArtistSongs;
