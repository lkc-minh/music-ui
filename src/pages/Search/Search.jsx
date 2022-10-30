import NhacCuaTui from "nhaccuatui-api-full";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { useParams, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useDebounce from "~/hooks/useDebounce";

import useLocalStorage from "~/hooks/useLocalStorage";
import MaybeHit from "./MaybeHit/MaybeHit";
import "./Search.scss";

function Search() {
    const [histories, setHistories] = useLocalStorage("histories", []);
    const [topKeyList, setTopKeyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [songMaybeHot, setSongMaybeHot] = useState({});
    let [searchParams, setSearchParams] = useSearchParams();

    const inputRef = useRef();
    console.log({ searchResult });
    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setIsLoading(true);

            const result = await NhacCuaTui.searchByKeyword(debouncedValue);
            setSearchResult(result);

            setIsLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await NhacCuaTui.getTopKeyword();
                const resSongMaybeHot = await NhacCuaTui.getHome();
                setSongMaybeHot(resSongMaybeHot?.newRelease?.song[0]);
                setTopKeyList(res?.topkeyword);
            } catch (error) {}
            setIsLoading(false);
        })();
    }, []);

    const handleChangeSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const handleDeleteText = () => {
        setSearchValue("");
        inputRef.current.focus();
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();
        setHistories((prev) => [{ id: uuidv4(), name: searchValue }, ...prev]);
        // console.log(e.target.querySelector("input").value);
        // let params = serializeFormQuery(e.target);
        setSearchParams({ q: searchValue });
        if (histories.length > 5)
            setHistories((prev) => {
                prev.pop();
                return prev;
            });
    };

    useEffect(() => {
        setSearchValue(searchParams.get("q"));
    }, [searchParams]);

    const handleDelHistory = (id) => {
        setHistories((prev) => prev.filter((history) => history.id !== id));
    };

    return (
        <div className="Search">
            <div className="Search__top">
                <form
                    className="Search__top-search"
                    onSubmit={handleSubmitSearch}
                >
                    <CiSearch className="icon-search" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search ..."
                        value={searchValue}
                        onChange={handleChangeSearch}
                        name="keyword"
                    />
                    {searchValue !== "" && (
                        <TfiClose
                            className="icon-close"
                            onClick={handleDeleteText}
                        />
                    )}
                </form>
            </div>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : (
                <div className="Search__container">
                    <div className="Search__container-item">
                        <h2>Top Keyword</h2>
                        <div className="Search__container-item-key">
                            {topKeyList?.map((key) => (
                                <div
                                    key={key.order}
                                    onClick={() => setSearchValue(key.name)}
                                >
                                    <span>#{key.order}</span> {key.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    {!!histories.length && (
                        <div className="Search__container-item">
                            <h2>Search History</h2>
                            <button
                                className="Search__clearAll"
                                onClick={() => setHistories([])}
                            >
                                Clear all
                            </button>
                            <div className="Search-histories">
                                {histories.map((history) => (
                                    <p
                                        key={history.id}
                                        onClick={() =>
                                            setSearchValue(history.name)
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

                    <div className="Search__container-item">
                        <h2>Maybe Hit</h2>
                        <div className="Search__songHot">
                            <MaybeHit song={songMaybeHot} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;
