import styles from "./feed.module.css";
import FeedItem, { type FeedItemProps } from "../feedItem/FeedItem";
import FeedController from "./feedController";
import { BiMessageSquareError } from "react-icons/bi";
import cssColors from "../../utils/cssColors";
import Spinner from "../spinner/Spinner";

export type FeedProps = {
    data: FeedItemProps[];
    onDataEnd: VoidFunction;
};

export default function Feed({ data, onDataEnd }: FeedProps) {
    const controller = new FeedController(onDataEnd);
    function onScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        controller.onScroll(e);
    }

    function scrollEnd(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        controller.scrollEnd(e);
    }

    return (
        <div className={styles.feed} onScroll={onScroll} onScrollEnd={scrollEnd}>
            {data?.map((item, index) => {
                return <FeedItem key={index} color={item.color} data={item.data} />;
            })}
        </div>
    );
}

export function FeedPlaceholder() {
    return (
        <div className={styles.placeholder}>
            <span className={styles.placeholderItem}></span>
            <span className={styles.placeholderItem}></span>
            <span className={styles.placeholderItem}></span>
        </div>
    );
}

export function FeedError({ text }: { text?: string }) {
    if (!text) text = "Ocorreu um erro ao carregar os dados";
    return (
        <div className={styles.error}>
            <BiMessageSquareError size={48} color={cssColors.text600} />
            <h3 className={"titleh3 " + styles.errorText}>{text}</h3>
        </div>
    );
}

export function FeedLoadingMore() {
    return (
        <div className={styles.LoadingMore}>
            <p className="p2">Carregando mais itens</p>

            <Spinner />
        </div>
    );
}
