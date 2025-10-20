import styles from "./details.module.css";
import img from "../../assets/images/temp.png";
import { LuHospital, LuPhone, LuMail, LuTag, LuCross, LuCalendarClock } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DetailsController from "./detailsController";
import PhoneFormatter from "../../utils/phoneFormatter";
import { useRef } from "react";
import useElementAppear from "../../hooks/useElementAppear";

export default function DetailsMobile() {
    const [searchParams] = useSearchParams();
    const susId = searchParams.get("susId");
    
    const tagsRef = useRef<HTMLUListElement>(null);
    const servicesRef = useRef<HTMLUListElement>(null);
    const hoursRef = useRef<HTMLUListElement>(null);

    const controller = new DetailsController();

    const query = useQuery({
        queryKey: ["stablishment", susId],
        queryFn: () => controller.getStablishmentById(susId!),
    });

    const tags = [
        query.data?.unitType,
        query.data?.stablishmentType,
        query.data?.natureDescription,
        `VÍNCULO COM O SUS: ${query.data?.contractWithSus || query.data?.isPublic ? "SIM" : "NÃO"}`,
    ];

    useElementAppear(tagsRef);
    useElementAppear(servicesRef);
    useElementAppear(hoursRef);

    if (query.isLoading) return <DetailsMobilePlaceholder />;

    //!TODO REFACTOR THIS QUICKLY
    const lat = "-23.551";
    const lon = "-46.635";
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${
        parseFloat(query.data?.geoposition?.longitude || lon) - 0.002
    }%2C${parseFloat(query.data?.geoposition?.latitude || lat) - 0.002}%2C${
        parseFloat(query.data?.geoposition?.longitude || lon) + 0.002
    }%2C${
        parseFloat(query.data?.geoposition?.latitude || lat) + 0.002
    }&layer=mapnik&marker=${parseFloat(
        query.data?.geoposition?.latitude || lat
    )}%2C${parseFloat(query.data?.geoposition?.longitude || lon)}`;

    console.log(query.data?.geoposition, query.data?.susId);

    const link = /iPhone|iPad|Mac/i.test(navigator.userAgent)
  ? `http://maps.apple.com/?ll=${lat},${lon}`
  : `https://www.google.com/maps?q=${lat},${lon}`;

    return (
        <div className={styles.container}>
            <div className={styles.imgBox}>
                {/* <img src={img} alt="" /> */}
                <iframe
                    width="425"
                    height="350"
                    scrolling="no"
                    src={src}
                    style={{ border: "none", filter:"saturate(300%)" }}
                ></iframe>
               
            </div>
 <a href={link}>Abrir no Google Maps</a>
            <div className={styles.info}>
                <div className={styles.section1}>
                    <span>
                        <LuHospital size={32} color={cssColors.primary200} />
                        <h2 className={"titleh2 " + styles.title}>{query.data?.fantasyName}</h2>
                    </span>
                    <p>
                        Endereço: {query.data?.address.address}, n° {query.data?.address.number},{" "}
                        {query.data?.address.district}. {query.data?.address.city},{" "}
                        {query.data?.address.state}.
                    </p>

                    {query.data?.phone && (
                        <span>
                            <LuPhone size={24} color={cssColors.text700} />
                            <p className="p1">{PhoneFormatter.format(query.data?.phone)}</p>
                        </span>
                    )}

                    {query.data?.email && (
                        <span>
                            <LuMail size={24} color={cssColors.text700} />
                            <p className="p1">{query.data?.email}</p>
                        </span>
                    )}
                </div>

                <ul className={styles.section2} ref={tagsRef}>
                    {tags.map((item, index) => (
                        <li key={index}>
                            <LuTag color={cssColors.text100} size={20} />
                            <p className={"p2 " + styles.text}>{item}</p>
                        </li>
                    ))}
                </ul>

                <ul className={styles.section3} ref={servicesRef}>
                    <h3 className="titleh3">Serviços</h3>
                    {query.data?.services.map((item, index) => (
                        <li key={index}>
                            <LuCross size={20} color={cssColors.text700} />
                            <p className="p2">{item}</p>
                        </li>
                    ))}
                </ul>

                <ul className={styles.section3} ref={hoursRef}>
                    <h3 className="titleh3">Horários de atendimento</h3>
                    {query.data?.openingHours.map((item, index) => (
                        <li key={index}>
                            <LuCalendarClock size={20} color={cssColors.text700} />
                            <p className="p2">
                                {item.day}: {item.startHour} - {item.endHour}
                            </p>
                        </li>
                    ))}
                </ul>

                <div>MAP IFRAME HERE</div>
            </div>
        </div>
    );
}

function DetailsMobilePlaceholder() {
    return (
        <div className={styles.placeholder}>
            <div className={styles.placeholderImage}></div>
            <div className={styles.placeholderTitle}></div>
            <div className={styles.placeholderTitle}></div>
            <div className={styles.placeholderList}></div>
            <div className={styles.placeholderList}></div>
        </div>
    );
}
