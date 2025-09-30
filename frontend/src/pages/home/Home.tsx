import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import FeedItem from "../../components/feedItem/FeedItem";

export default function Home() {
    const list = ["#C8E2FB", "#F7E4DF", "#DCD9F7"];
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

            {list.length === 0 && (
                <div className={styles.imgBox}>
                    <img src={img} alt="" className={styles.img} />
                </div>
            )}

            <Filter />

            <div className={styles.feed}>
                {list.map((item) => {
                    return <FeedItem color={item} />;
                })}
            </div>
        </div>
    );
}
