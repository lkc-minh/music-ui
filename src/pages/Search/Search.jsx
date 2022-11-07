import NhacCuaTui from "nhaccuatui-api-full";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import useDebounce from "~/hooks/useDebounce";

import useLocalStorage from "~/hooks/useLocalStorage";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import "./Search.scss";
import SearchDefault from "./SearchDefault/SearchDefault";
import SearchResult from "./SearchResult/SearchResult";
import SearchResultDeb from "./SearchResultDeb/SearchResultDeb";

function Search() {
    const [histories, setHistories] = useLocalStorage("histories", []);
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState({});
    const [searchResultDeb, setSearchResultDeb] = useState({});
    const [showResult, setShowResult] = useState(false);
    let [searchParams, setSearchParams] = useSearchParams("");
    const [isLoading, setIsLoading] = useState(false);

    const inputRef = useRef();
    const formRef = useRef();
    const param = searchParams.get("q");

    const debouncedValue = useDebounce(searchValue, 500);
    const isEmptyObj = Object.keys(searchResultDeb).length === 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            setIsLoading(true);
            if (!param) {
                setSearchResult({});
                setIsLoading(false);
                return;
            }
            const result = await NhacCuaTui.searchByKeyword(param);
            if (result.error) {
                toast.error(result.error.message);
                setIsLoading(false);
                return;
            }
            setSearchResult(result.search);
            setSearchValue(param);
            setIsLoading(false);
        };
        fetchApi();
    }, [param]);

    useEffect(() => {
        const fetchApi = async () => {
            if (!debouncedValue) {
                setSearchResultDeb({});
                return;
            }
            const result = await NhacCuaTui.searchByKeyword(debouncedValue);
            result?.search && setSearchResultDeb(result?.search);
        };
        fetchApi();
    }, [debouncedValue]);

    useEffect(() => {
        if (histories.length > 5)
            setHistories((prev) => {
                prev.pop();
                return prev;
            });
    }, [histories, setHistories]);

    const handleClear = () => {
        setSearchValue("");
        setSearchParams({});
        setShowResult(false);
        inputRef.current.focus();
    };

    const handleSubmitSearch = (e) => {
        e.preventDefault();

        const value = e.target.querySelector("input").value.trim();
        if (!value) return;

        setHistories((prev) => [{ id: uuidv4(), name: searchValue }, ...prev]);
        setSearchParams({ q: value });
        setShowResult(false);
    };

    const handleDelHistory = (id, e) => {
        e.stopPropagation();
        setHistories((prev) => prev.filter((history) => history.id !== id));
    };

    const handleClickSearchValue = (key, e) => {
        setSearchValue(key);
        setSearchParams({ q: key });
        setHistories((prev) => [{ id: uuidv4(), name: key }, ...prev]);
    };

    useOnClickOutside(formRef, () => setShowResult(false));

    return (
        <div className="Search">
            <div className="Search__top">
                <form className="Search__top-search" onSubmit={handleSubmitSearch} ref={formRef}>
                    <CiSearch className="icon-search" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search ..."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                    {searchValue && <TfiClose className="icon-close" onClick={handleClear} />}
                    {showResult && !isEmptyObj && (
                        <SearchResultDeb searchResult={searchResultDeb} />
                    )}
                </form>
            </div>

            {param ? (
                <SearchResult searchResult={searchResult} param={param} isLoading={isLoading} />
            ) : (
                <SearchDefault
                    handleDelHistory={handleDelHistory}
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
