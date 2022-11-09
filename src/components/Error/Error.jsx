import "./Error.scss";
import images from "~/assets/images";

function Error({ message = "No data to display" }) {
    return (
        <div className="Error">
            <h3>{message}</h3>
            <img src={images.iconNoData} alt="" />
        </div>
    );
}

export default Error;
