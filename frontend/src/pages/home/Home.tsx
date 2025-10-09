
import useDeviceType from "../../hooks/useDeviceType";
import HomeMobile from "./HomeMobile";

export default function Home() {
    const device = useDeviceType();

    return (
        <>
            {device === "desktop" && <HomeMobile />}
            {device !== "desktop" && <HomeMobile />}
        </>
    );
}
