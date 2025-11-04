import MapLinkFormatter from "../../utils/mapLinkFormatter";
import styles from "./map.module.css";

export type MapProps = {
    latitude: string | undefined;
    longitude: string | undefined;
};

export default function Map({ latitude, longitude }: MapProps) {
    let src = "";

    if (latitude && longitude) {
        src = MapLinkFormatter.embedMapLink(latitude || "", longitude || "", 0.0015);
    } else {
        src = MapLinkFormatter.embedMapLink("0", "0");
    }

    return <iframe src={src} className={styles.mapBox}></iframe>;
}
