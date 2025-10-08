import styles from "./feedItem.module.css";
import img from "../../assets/images/rafiki.png";
import { useRef } from "react";
import { useNavigate } from "react-router";
import type StablishmentModel from "../../models/stablishmentModel";

export type FeedItemProps = {
    color: string;
    data: StablishmentModel;
};

export default function FeedItem({ color, data }: FeedItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/details");
    };

    const onLoad = () => {
        if (ref.current) {
            ref.current.style.backgroundColor = color;
        }
    };

    return (
        <div className={styles.feedItem} ref={ref} onLoad={onLoad} onClick={handleClick}>
            <div className={styles.titleBox}>
                <img src={img} alt="" />
                <h3 className={"titleh3 " + styles.title}>{data.fantasyName}</h3>
            </div>

            <div className={styles.contentBox}>
                <p className="p2">
                    Endereço:{" "}
                    {`${data.address.address}, n°${data.address.number}, ${data.address.district}. ${data.address.city}, ${data.address.state}.`}
                </p>
                <p className="p2">Telefone: {data.phone}</p>
            </div>
        </div>
    );
}
