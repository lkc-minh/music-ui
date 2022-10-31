import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import useDebounce from "~/hooks/useDebounce";

import useLocalStorage from "~/hooks/useLocalStorage";
import "./Search.scss";
import SearchDefault from "./SearchDefault/SearchDefault";
import SearchResult from "./SearchResult/SearchResult";

function Search() {
    const [histories, setHistories] = useLocalStorage("histories", []);
    const [topKeyList, setTopKeyList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState({});
    const [songMaybeHot, setSongMaybeHot] = useState({});
    let [searchParams, setSearchParams] = useSearchParams("");

    const inputRef = useRef();
    const param = searchParams.get("q");

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue?.trim()) {
            setSearchResult({});
            return;
        }

        const fetchApi = async () => {
            setIsLoading(true);
            const result = await NhacCuaTui.searchByKeyword(debouncedValue);
            setSearchResult(result.search);
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

    useEffect(() => {
        setSearchValue(param);
    }, [param]);

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
        setSearchParams({ q: searchValue });
        if (histories.length > 5)
            setHistories((prev) => {
                prev.pop();
                return prev;
            });
    };

    const handleDelHistory = (id) => {
        setHistories((prev) => prev.filter((history) => history.id !== id));
    };

    const handleClickSearchValue = (key) => {
        setSearchValue(key);
        setSearchParams({ q: key });
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
                    />
                    {searchValue && (
                        <TfiClose
                            className="icon-close"
                            onClick={handleDeleteText}
                        />
                    )}
                </form>
            </div>
            {param ? (
                <SearchResult searchResult={searchResult} />
            ) : (
                <SearchDefault
                    handleDelHistory={handleDelHistory}
                    topKeyList={topKeyList}
                    songMaybeHot={songMaybeHot}
                    histories={histories}
                    setHistories={setHistories}
                    setSearchValue={setSearchResult}
                    handleClickSearchValue={handleClickSearchValue}
                />
            )}
        </div>
    );
}

export default Search;
