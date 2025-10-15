import styles from "./details.module.css";
import img from "../../assets/images/temp.png";
import { LuHospital, LuPhone, LuMail, LuTag, LuCross, LuCalendarClock } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import DetailsController from "./detailsController";
import PhoneFormatter from "../../utils/phoneFormatter";

export default function DetailsMobile() {
    const [searchParams] = useSearchParams();
    const susId = searchParams.get("susId");

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

    if (query.isLoading) return <DetailsMobilePlaceholder />;
    return (
        <div className={styles.container}>
            <div className={styles.imgBox}>
                <img src={img} alt="" />
            </div>

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

                <div className={styles.section2}>
                    {tags.map((item, index) => (
                        <div key={index}>
                            <LuTag color={cssColors.text100} size={20} />
                            <p className={"p2 " + styles.text}>{item}</p>
                        </div>
                    ))}
                </div>

                <ul className={styles.section3}>
                    <h3 className="titleh3">Serviços</h3>
                    {query.data?.services.map((item, index) => (
                        <li key={index}>
                            <LuCross size={20} color={cssColors.text700} />
                            <p className="p2">{item}</p>
                        </li>
                    ))}
                </ul>

                <ul className={styles.section3}>
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
