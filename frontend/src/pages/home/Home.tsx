import useDeviceType from "../../hooks/useDeviceType";
import HomeMobile from "./HomeMobile";
import HomeDesktop from "./HomeDesktop";
import { memo } from "react";
export default function Home() {
    const device = useDeviceType();

    return (
        <>
            {device === "desktop" && <HomeDesktop />}
            {device !== "desktop" && <HomeMobile />}
        </>
    );
}

export const MemoizedImage = memo(({ url }: { url: string }) => {
    return <img src={url} alt="" />;
});
