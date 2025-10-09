
export default class FeedController {
    onDataEnd: VoidFunction;

    constructor(onDataEnd: VoidFunction) {
        this.onDataEnd = onDataEnd;
    }

    onScroll(e: React.UIEvent<HTMLDivElement, UIEvent>) {
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
            this.onDataEnd();
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

    scrollEnd(e: React.UIEvent<HTMLDivElement, UIEvent>) {
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
}
