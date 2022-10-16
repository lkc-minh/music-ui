import nhaccuatuiApi from "nhaccuatui-api";
import { useEffect, useState } from "react";

export default function Slider() {
    const [slide, setSlide] = useState([]);
    console.log(slide);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await nhaccuatuiApi.getHome();
            setSlide(res.showcase);
        };

        fetchApi();
    }, []);
    return <></>;
}
