import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import MaybeHit from "../MaybeHit/MaybeHit";
import NhacCuaTui from "nhaccuatui-api-full";
import "./SearchDefault.scss";

function SearchDefault({
    histories,
    setHistories,
    handleDelHistory,
    handleClickSearchValue,
}) {
    const [songMaybeHit, setSongMaybeHit] = useState({});
    const [topKeyList, setTopKeyList] = useState([]);

    console.log({ topKeyList });

    useEffect(() => {
        (async () => {
            try {
                const res = await NhacCuaTui.getTopKeyword();
                const resSongMaybeHot = await NhacCuaTui.getHome();
                setSongMaybeHit(resSongMaybeHot?.newRelease?.song[0]);
                setTopKeyList(res?.topkeyword);
            } catch (error) {}
        })();
    }, []);

    return (
        <div className="SearchDefault">
            <div className="SearchDefault__container">
                <div className="SearchDefault__container-item">
                    <h2>Top Keyword</h2>
                    <div className="SearchDefault__container-item-key">
                        {topKeyList?.map((key) => (
                            <div
                                key={key.order}
                                onClick={() => handleClickSearchValue(key.name)}
                            >
                                <span>#{key.order}</span> {key.name}
                            </div>
                        ))}
                    </div>
                </div>

                {!!histories.length && (
                    <div className="SearchDefault__container-item">
                        <h2>Search History</h2>
                        <button
                            className="SearchDefault__clearAll"
                            onClick={() => setHistories([])}
                        >
                            Clear all
                        </button>
                        <div className="SearchDefault-histories">
                            {histories.map((history) => (
                                <p
                                    key={history.id}
                                    onClick={() =>
                                        handleClickSearchValue(history.name)
                                    }
                                >
                                    <span>{history.name}</span>
                                    <RiDeleteBin6Line
                                        className="Search-del-icon"
                                        onClick={(e) =>
                                            handleDelHistory(history.id, e)
                                        }
                                    />
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="SearchDefault__container-item">
                    <h2>Maybe Hit</h2>
                    <div className="SearchDefault__songHot">
                        <MaybeHit song={songMaybeHit} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchDefault;
