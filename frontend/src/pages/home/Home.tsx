
import useDeviceType from "../../hooks/useDeviceType";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

export default function Home() {
    const device = useDeviceType();

    return (
        <>
            {device === "desktop" && <HomeDesktop />}
            {device !== "desktop" && <HomeMobile />}
        </>
    );
}
