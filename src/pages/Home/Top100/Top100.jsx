import { Link } from "react-router-dom"
import Card from "~/components/Card/Card"
import "./Top100.scss"

function Top100({ data }) {
    console.log(data)
    return (
        <div className="Top100">
            <Link>
                <h2 className="link">Top 100</h2>
            </Link>
            <div className="Top100__container">
                {data.map((item) => (
                    <Card key={item.key} data={item} type="top100" />
                ))}
            </div>
        </div>
    )
}

export default Top100
