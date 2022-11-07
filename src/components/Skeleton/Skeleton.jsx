import "./Skeleton.scss";

function Skeleton({ page }) {
    if (page === "home")
        return (
            <div className="SkHome">
                <div className="SkHome-showcase" />
                <div className="SkHome-topEvent">
                    <div className="SkHome-topEvent-item">
                        <div className="SkHome-topEvent-item-img" />
                        <div className="SkHome-topEvent-item-title" />
                        <div className="SkHome-topEvent-item-singer" />
                    </div>
                    <div className="SkHome-topEvent-item">
                        <div className="SkHome-topEvent-item-img" />
                        <div className="SkHome-topEvent-item-title" />
                        <div className="SkHome-topEvent-item-singer" />
                    </div>
                    <div className="SkHome-topEvent-item">
                        <div className="SkHome-topEvent-item-img" />
                        <div className="SkHome-topEvent-item-title" />
                        <div className="SkHome-topEvent-item-singer" />
                    </div>
                    <div className="SkHome-topEvent-item">
                        <div className="SkHome-topEvent-item-img" />
                        <div className="SkHome-topEvent-item-title" />
                        <div className="SkHome-topEvent-item-singer" />
                    </div>
                </div>
                <div className="SkHome-video">
                    <div className="SkHome-video-item">
                        <div className="SkHome-video-item-img" />
                        <div className="SkHome-video-item-title" />
                        <div className="SkHome-video-item-singer" />
                    </div>
                    <div className="SkHome-video-item">
                        <div className="SkHome-video-item-img" />
                        <div className="SkHome-video-item-title" />
                        <div className="SkHome-video-item-singer" />
                    </div>
                    <div className="SkHome-video-item">
                        <div className="SkHome-video-item-img" />
                        <div className="SkHome-video-item-title" />
                        <div className="SkHome-video-item-singer" />
                    </div>
                </div>
            </div>
        );

    if (page === "search")
        return (
            <div className="SkSearch">
                <div className="SkSearch__topkey">
                    <div className="SkSearch-heading" />
                    <div className="SkSearch__topkey-wrapper">
                        <div className="SkSearch__topkey-item" />
                        <div className="SkSearch__topkey-item" />
                        <div className="SkSearch__topkey-item" />
                        <div className="SkSearch__topkey-item" />
                        <div className="SkSearch__topkey-item" />
                    </div>
                </div>

                <div className="SkSearch__history">
                    <div className="SkSearch-heading" />
                    <div className="SkSearch__history-wrapper">
                        <div className="SkSearch__history-item" />
                        <div className="SkSearch__history-item" />
                        <div className="SkSearch__history-item" />
                        <div className="SkSearch__history-item" />
                        <div className="SkSearch__history-item" />
                    </div>
                </div>

                <div className="SkSearch__hit">
                    <div className="SkSearch-heading" />
                    <div className="SkSearch__hit-wrapper"></div>
                </div>
            </div>
        );

    if (page === "searchResult")
        return (
            <div className="SkSearchResult">
                <div className="SkSearchResult__songs">
                    <div className="SkSearchResult-heading" />
                    <div className="SkSearchResult__songs-wrapper">
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                        <div className="SkSearchResult__songs-item" />
                    </div>
                </div>

                <div className="SkSearchResult__playlists">
                    <div className="SkSearchResult-heading" />
                    <div className="SkSearchResult__playlists-wrapper">
                        <div className="SkSearchResult__playlists-item">
                            <div className="SkSearchResult__playlists-img" />
                            <div className="SkSearchResult__playlists-title" />
                            <div className="SkSearchResult__playlists-singer" />
                        </div>
                        <div className="SkSearchResult__playlists-item">
                            <div className="SkSearchResult__playlists-img" />
                            <div className="SkSearchResult__playlists-title" />
                            <div className="SkSearchResult__playlists-singer" />
                        </div>
                        <div className="SkSearchResult__playlists-item">
                            <div className="SkSearchResult__playlists-img" />
                            <div className="SkSearchResult__playlists-title" />
                            <div className="SkSearchResult__playlists-singer" />
                        </div>
                        <div className="SkSearchResult__playlists-item">
                            <div className="SkSearchResult__playlists-img" />
                            <div className="SkSearchResult__playlists-title" />
                            <div className="SkSearchResult__playlists-singer" />
                        </div>
                    </div>
                </div>
            </div>
        );

    if (page === "detail")
        return (
            <div className="SkDetail">
                <div className="SkDetail__top">
                    <div className="SkDetail__top-thumbnail" />
                    <div className="SkDetail__top-info">
                        <div className="SkDetail__top-title" />
                        <div className="SkDetail__top-artist" />
                        <div className="SkDetail__top-desc" />
                    </div>
                </div>
                <div className="SkDetail__bottom">
                    <div className="SkDetail__bottom-wrapper">
                        <div className="SkDetail__bottom-item">
                            <div className="SkDetail__bottom-img" />
                            <div className="SkDetail__bottom-title" />
                            <div className="SkDetail__bottom-singer" />
                        </div>
                        <div className="SkDetail__bottom-item">
                            <div className="SkDetail__bottom-img" />
                            <div className="SkDetail__bottom-title" />
                            <div className="SkDetail__bottom-singer" />
                        </div>
                        <div className="SkDetail__bottom-item">
                            <div className="SkDetail__bottom-img" />
                            <div className="SkDetail__bottom-title" />
                            <div className="SkDetail__bottom-singer" />
                        </div>
                        <div className="SkDetail__bottom-item">
                            <div className="SkDetail__bottom-img" />
                            <div className="SkDetail__bottom-title" />
                            <div className="SkDetail__bottom-singer" />
                        </div>
                    </div>
                </div>
            </div>
        );

    if (page === "ranking")
        return (
            <div className="SkRanking">
                <div className="SkRanking-heading"></div>
                <div className="SkRanking-top1"></div>
                <div className="SkRanking__wrapper">
                    <div className="SkRanking-item">
                        <div className="SkRanking-item-position"></div>
                        <div className="SkRanking-item-song"></div>
                    </div>

                    <div className="SkRanking-item">
                        <div className="SkRanking-item-position"></div>
                        <div className="SkRanking-item-song"></div>
                    </div>

                    <div className="SkRanking-item">
                        <div className="SkRanking-item-position"></div>
                        <div className="SkRanking-item-song"></div>
                    </div>

                    <div className="SkRanking-item">
                        <div className="SkRanking-item-position"></div>
                        <div className="SkRanking-item-song"></div>
                    </div>

                    <div className="SkRanking-item">
                        <div className="SkRanking-item-position"></div>
                        <div className="SkRanking-item-song"></div>
                    </div>
                </div>
            </div>
        );

    if (page === "artist")
        return (
            <div className="SkArtist">
                <div className="SkArtist__banner"></div>
                <div className="SkArtist__playlists">
                    <div className="SkArtist-heading"></div>
                    <div className="SkArtist__playlists-wrapper">
                        <div className="SkArtist__playlists-item">
                            <div className="SkArtist__playlists-img" />
                            <div className="SkArtist__playlists-title" />
                            <div className="SkArtist__playlists-singer" />
                        </div>
                        <div className="SkArtist__playlists-item">
                            <div className="SkArtist__playlists-img" />
                            <div className="SkArtist__playlists-title" />
                            <div className="SkArtist__playlists-singer" />
                        </div>
                        <div className="SkArtist__playlists-item">
                            <div className="SkArtist__playlists-img" />
                            <div className="SkArtist__playlists-title" />
                            <div className="SkArtist__playlists-singer" />
                        </div>
                        <div className="SkArtist__playlists-item">
                            <div className="SkArtist__playlists-img" />
                            <div className="SkArtist__playlists-title" />
                            <div className="SkArtist__playlists-singer" />
                        </div>
                    </div>
                </div>

                <div className="SkArtist__songs">
                    <div className="SkArtist-heading" />
                    <div className="SkArtist__songs-wrapper">
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                        <div className="SkArtist__songs-item" />
                    </div>
                </div>
            </div>
        );
}

export default Skeleton;
