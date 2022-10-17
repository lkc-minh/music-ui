import nhaccuatuiApi from "nhaccuatui-api";
import { useEffect, useState } from "react";

import "./Home.scss";
import Slider from "./Slider/Slider";

function Home() {
    const [slide, setSlide] = useState([]);
    console.log(slide);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await nhaccuatuiApi.getHome();
            console.log({ res });
            setSlide(res.showcase);
        };

        fetchApi();
    }, []);
    return (
        <div className="Home">
            <Slider data={slide} />
        </div>
    );
}

export default Home;
