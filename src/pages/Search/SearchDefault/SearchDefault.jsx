import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import MaybeHit from "../MaybeHit/MaybeHit";
import "./SearchDefault.scss";

function SearchDefault({
    topKeyList,
    histories,
    setHistories,
    handleDelHistory,
    songMaybeHot,
    handleClickSearchValue,
}) {
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
                                        onClick={() =>
                                            handleDelHistory(history.id)
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
                        <MaybeHit song={songMaybeHot} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchDefault;
