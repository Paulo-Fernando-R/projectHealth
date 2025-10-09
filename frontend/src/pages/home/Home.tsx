
import useDeviceType from "../../hooks/useDeviceType";
import HomeMobile from "./HomeMobile";
import HomeDesktop from "./HomeDesktop";

export default function Home() {
    const device = useDeviceType();

    return (
        <>
            {device === "desktop" && <HomeDesktop />}
            {device !== "desktop" && <HomeMobile />}
        </>
    );
}
