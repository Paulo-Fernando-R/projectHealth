/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./details.module.css";
import img from "../../assets/images/temp.png";
import { LuHospital, LuPhone, LuMail, LuTag, LuCross } from "react-icons/lu";
import cssColors from "../../utils/cssColors";
export default function Details() {
    return (
        <div className={styles.container}>
            <div className={styles.imgBox}>
                <img src={img} alt="" />
            </div>

            <div className={styles.info}>
                <div className={styles.section1}>
                    <span>
                        <LuHospital size={32} color={cssColors.primary200} />
                        <h2 className={"titleh2 " + styles.title}>Hospital Sambiquiras Health</h2>
                    </span>
                    <p>
                        Endereço: Rua dos Crocodilos, n° 24, Bairro Dos Talaricos. São João
                        Evangelista, MG.
                    </p>

                    <span>
                        <LuPhone size={24} color={cssColors.text700} />
                        <p className="p1">(11) 9 7545-6574</p>
                    </span>

                    <span>
                        <LuMail size={24} color={cssColors.text700} />
                        <p className="p1">E-mail: hospital@sambiquiras.com</p>
                    </span>
                </div>

                <div className={styles.section2}>
                    {["ATENTE SUS", "UNIDADE MISTA", "UNIDADE MISTA", "UNIDADE MISTA"].map(
                        (item) => (
                            <div>
                                <LuTag color={cssColors.text100} size={20} />
                                <p className={"p2 " + styles.text}>{item}</p>
                            </div>
                        )
                    )}
                </div>

                <ul className={styles.section3}>
                    <h3 className="titleh3">Serviços</h3>
                    {[
                        "Atendimento 24 horas",
                        "Clínica Médica",
                        "Pediatria",
                        "Cardiologia",
                        "Exames de Imagem",
                        "Laboratório de Análises Clínicas",
                        "Centro Cirúrgico",
                        "Internação",
                        "Pronto Atendimento",
                        "Farmácia 24 horas",
                    ].map((item, index) => (
                        <li key={index}>
                            <LuCross size={20} color={cssColors.text700} />
                            <p className="p2">{item}</p>
                        </li>
                    ))}
                </ul>

                <div>
                    MAP IFRAME HERE
                </div>
            </div>
        </div>
    );
}
