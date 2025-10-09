import styles from "./feed.module.css";
import FeedItem, { type FeedItemProps } from "../feedItem/FeedItem";

export type FeedProps = {
    data: FeedItemProps[];
    onDataEnd: VoidFunction;
};

export default function Feed({ data, onDataEnd }: FeedProps) {
    function onScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        e.currentTarget.style.paddingTop = "40px";

        const first = e.currentTarget.children[0] as HTMLDivElement;
        const last = e.currentTarget.children[
            e.currentTarget.children.length - 1
        ] as HTMLDivElement;

        if (first) {
            first.style.boxShadow = "0px -10px 10px rgba(0, 0, 0, 0.05)";
        }

        if (
            e.currentTarget.scrollHeight -
                e.currentTarget.scrollTop -
                e.currentTarget.clientHeight <
            150
        ) {
            onDataEnd();
        }

        if (
            e.currentTarget.scrollHeight -
                e.currentTarget.scrollTop -
                e.currentTarget.clientHeight <
            1
        ) {
            e.currentTarget.scrollIntoView({ behavior: "smooth" });
        } else {
            e.currentTarget.style.paddingBottom = "40px";
            if (last) {
                last.style.boxShadow = "0px 10px 10px rgba(0, 0, 0, 0.05)";
            }
        }
    }

    function scrollEnd(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        if (e.currentTarget.scrollTop === 0) {
            e.currentTarget.style.paddingTop = "0px";

            const first = e.currentTarget.children[0] as HTMLDivElement;
            if (first) {
                first.style.boxShadow = "none";
            }
        }

        if (
            e.currentTarget.scrollTop -
                e.currentTarget.scrollHeight -
                e.currentTarget.clientHeight <
            1
        ) {
            e.currentTarget.style.paddingBottom = "0px";

            const last = e.currentTarget.children[
                e.currentTarget.children.length - 1
            ] as HTMLDivElement;

            if (last) {
                last.style.boxShadow = "none";
            }
        }
    }

    return (
        <div className={styles.feed} onScroll={onScroll} onScrollEnd={scrollEnd}>
            {data?.map((item, index) => {
                return <FeedItem key={index} color={item.color} data={item.data} />;
            })}
        </div>
    );
}
