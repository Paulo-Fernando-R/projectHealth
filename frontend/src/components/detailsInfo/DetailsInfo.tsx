import styles from "./detailsInfo.module.css";
import cssColors from "../../utils/cssColors";
import PhoneFormatter from "../../utils/phoneFormatter";
import { LuHospital, LuMail, LuPhone } from "react-icons/lu";
import type { ExtendedStablishmentModel } from "../../models/stablishmentModel";
import { ToastContainer, toast } from "react-toastify";
export type DetailsInfoProps = {
    data: ExtendedStablishmentModel | undefined;
};

export default function DetailsInfo({ data }: DetailsInfoProps) {
    function clipboardCopy(text: string, type: "phone" | "email") {
        navigator.clipboard.writeText(text);
        notify(type);
    }

    const notify = (type: "phone" | "email") => {
        if (type === "phone") {
            toast.success("Número de telefone copiado para a área de transferência!", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
                hideProgressBar: true,
                icon: <LuPhone size={24} color={cssColors.primary100} />,
            });
        } else {
            toast.success("E-mail copiado para a área de transferência!", {
                position: "top-right",
                autoClose: 2000,
                closeOnClick: true,
                draggable: true,
                hideProgressBar: true,
                icon: <LuMail size={24} color={cssColors.primary100} />,
            });
        }
    };

    return (
        <div className={styles.section1}>
            <span>
                <LuHospital size={32} color={cssColors.primary200} />
                <h2 className={"titleh2 " + styles.title}>{data?.fantasyName}</h2>
            </span>
            <p>
                Endereço: {data?.address.address}, n° {data?.address.number},{" "}
                {data?.address.district}. {data?.address.city}, {data?.address.state}.
            </p>

            {data?.phone && (
                <span onClick={() => clipboardCopy(data?.phone, "phone")}>
                    <LuPhone size={24} color={cssColors.text700} />
                    <p className="p1">{PhoneFormatter.format(data?.phone)}</p>
                </span>
            )}

            {data?.email && (
                <span onClick={() => clipboardCopy(data?.email, "email")}>
                    <LuMail size={24} color={cssColors.text700} />
                    <p className="p1">{data?.email}</p>
                </span>
            )}
            <ToastContainer />
        </div>
    );
}
