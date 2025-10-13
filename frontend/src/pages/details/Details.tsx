import useDeviceType from "../../hooks/useDeviceType";
import DetailsDesktop from "./DetailsDesktop";
import DetailsMobile from "./DetailsMobile";

export default function Details() {
    const device = useDeviceType();
    if (device === "desktop") {
        return <DetailsDesktop />;
    } else {
        return <DetailsMobile />;
    }
}
