import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1 className="titleh1">
                    Encontre os melhores lugares para <span>Cuidar</span> da Sua <span>Saúde</span>
                </h1>
                <p className={styles.subtitle + " p2"}>
                    Procure por nomes, tipos, lugares ou categorias de estabelecimentos de saúde
                </p>
            </div>

            <div className={styles.imgBox}>
                <img src={img} alt="" className={styles.img} />
            </div>
        </div>
    );
}
