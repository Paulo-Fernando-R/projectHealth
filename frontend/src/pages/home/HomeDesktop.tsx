import styles from "./homeDesktop.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import FeedItem from "../../components/feedItem/FeedItem";

export default function HomeDesktop() {
    const list = ["#C8E2FB", "#F7E4DF", "#DCD9F7"];

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.head}>
                    <h1 className="titleh1">
                        Encontre os melhores lugares para <span>Cuidar</span> da Sua{" "}
                        <span>Saúde</span>
                    </h1>
                    <p className={styles.subtitle + " p2"}>
                        Procure por nomes, tipos, lugares ou categorias de estabelecimentos de saúde
                    </p>
                </div>

                <div className={styles.imgBox}>
                    <img src={img} alt="" className={styles.img} />
                </div>
            </div>

            <div className={styles.right}>
                <Filter />

                <div className={styles.feed}>
                    {list.map((item, index) => {
                        return <FeedItem key={index} color={item} />;
                    })}
                </div>
            </div>
        </div>
    );
}
