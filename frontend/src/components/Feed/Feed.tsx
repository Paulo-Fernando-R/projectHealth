import styles from "./feed.module.css";
import FeedItem, { type FeedItemProps } from "../feedItem/FeedItem";
import FeedController from "./feedController";

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
