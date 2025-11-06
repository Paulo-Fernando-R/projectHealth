/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./detailsDesktop.module.css";
import { LuTag, LuCross, LuCalendarClock, LuMap } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DetailsController from "./detailsController";

import { useRef } from "react";
import useDeviceOS from "../../hooks/useDeviceOS";
import useElementAppear from "../../hooks/useElementAppear";
import Map from "../../components/map/Map";
import ActionButton from "../../components/actionButton/ActionButton";
import DetailsInfo from "../../components/detailsInfo/DetailsInfo";
import AdBanner from "../../components/adBanner/AdBanner";

export default function DetailsDesktop() {
    const [searchParams] = useSearchParams();
    const susId = searchParams.get("susId");

    const tagsRef = useRef<HTMLUListElement>(null);
    const servicesRef = useRef<HTMLUListElement>(null);
    const hoursRef = useRef<HTMLUListElement>(null);
    const os = useDeviceOS();

    const controller = new DetailsController();

    const query = useQuery({
        queryKey: ["stablishment", susId],
        queryFn: () => controller.getStablishmentById(susId!),
    });

    useElementAppear(tagsRef);
    useElementAppear(servicesRef);
    useElementAppear(hoursRef);

    const tags = controller.formatTags(query.data);
    const link = controller.formatAppLink(query.data, os);

    if (query.isLoading) return <DetailsDesktopPlaceholder />;

    return (
        <div className={styles.container}>
            <div className={styles.imgBox}>
                <Map
                    latitude={query.data?.geoposition?.latitude}
                    longitude={query.data?.geoposition?.longitude}
                />
                <AdBanner/>
            </div>

            <div className={styles.info}>
                <DetailsInfo data={query.data} />

                <div className={styles.section2}>
                    {tags.map((item, index) => (
                        <div key={index}>
                            <LuTag color={cssColors.text100} size={20} />
                            <p className={"p2 " + styles.text}>{item}</p>
                        </div>
                    ))}
                </div>

                <ul className={styles.section3}>
                    {query.data?.services.length === 0 ? null : (
                        <h3 className="titleh3">Serviços</h3>
                    )}
                    {query.data?.services.map((item, index) => (
                        <li key={index}>
                            <LuCross size={20} color={cssColors.text700} />
                            <p className="p2">{item}</p>
                        </li>
                    ))}
                </ul>

                <ul className={styles.section3}>
                    {query.data?.openingHours.length === 0 ? null : (
                        <h3 className="titleh3">Horários de atendimento</h3>
                    )}
                    {query.data?.openingHours.map((item, index) => (
                        <li key={index}>
                            <LuCalendarClock size={20} color={cssColors.text700} />
                            <p className="p2">
                                {item.day}: {item.startHour} - {item.endHour}
                            </p>
                        </li>
                    ))}
                </ul>

                <ActionButton
                    onClick={() => controller.openMaps(link)}
                    text={`Abrir Localização no ${os === "Apple" ? "Apple" : "Google"} Maps`}
                    icon={<LuMap color={cssColors.text100} size={24} />}
                />
            </div>
        </div>
    );
}

function DetailsDesktopPlaceholder() {
    return (
        <div className={styles.placeholder}>
            <div className={styles.placeholderLeft}>
                <div className={styles.placeholderImage}></div>
                <div className={styles.placeholderImage}></div>
            </div>

            <div className={styles.placeholderRight}>
                <div className={styles.placeholderTitle}></div>
                <div className={styles.placeholderTitle}></div>
                <div className={styles.placeholderList}></div>
                <div className={styles.placeholderList}></div>
            </div>
        </div>
    );
}
