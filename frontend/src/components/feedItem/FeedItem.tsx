import styles from "./feedItem.module.css";
import img from "../../assets/images/rafiki.png";
import { useRef } from "react";
import { useNavigate } from "react-router";

export type FeedItemProps = {
    color: string;
};

export default function FeedItem({ color }: FeedItemProps) {
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
                <h3 className={"titleh3 " + styles.title}>Hospital Sambiquiras Health</h3>
            </div>

            <div className={styles.contentBox}>
                <p className="p2">
                    Endereço: Rua dos Crocodilos, n° 24, Bairro Dos Talaricos. São João Evangelista,
                    MG.:
                </p>
                <p className="p2">Telefone: (11) 9 7545-6574</p>
            </div>
        </div>
    );
}
