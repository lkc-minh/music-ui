import React, { useEffect, useRef, useState } from "react";
import "./Lyric.scss";

function Lyric({ lyric }) {
    const [loadMore, setLoadMore] = useState(false);
    const lyricRef = useRef();

    useEffect(() => {
        if (lyric?.lyric !== "") lyricRef.current.innerHTML = lyric?.lyric;
    }, [lyric]);

    return (
        <div className="Lyric">
            <div className="Lyric__top">
                <h3>Lyric</h3>
                <span>Edited by: {lyric?.userNameUpload}</span>
                <hr />
            </div>

            <div
                className={
                    loadMore ? "Lyric__content readMore" : "Lyric__content"
                }
                ref={lyricRef}
            >
                <p ref={lyricRef}></p>
            </div>
            <button onClick={() => setLoadMore(!loadMore)}>
                {loadMore ? "Close" : "Load more"}
            </button>
        </div>
    );
}

export default Lyric;
