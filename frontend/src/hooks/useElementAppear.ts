import { useEffect } from "react";

const useElementAppear = (ref: React.RefObject<HTMLUListElement | null>) => {
    function action() {
        if (!ref.current) return;
        const children = ref.current?.children as HTMLCollectionOf<HTMLElement>;

        for (let i = 0; i < children.length; i++) {
            if (isElemntInViewport(children[i])) {
                children[i].style.opacity = "1";
            } else {
                children[i].style.opacity = "0";
            }
        }
    }

    function isElemntInViewport(e: HTMLElement) {
        const rect = e.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    useEffect(() => {
        window.addEventListener("scroll", action);

        return () => {
            window.removeEventListener("scroll", action);
        };
    }, []);
};

export default useElementAppear;
