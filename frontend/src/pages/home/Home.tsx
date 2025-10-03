import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import FeedItem from "../../components/feedItem/FeedItem";
import useDeviceType from "../../hooks/useDeviceType";
import HomeDesktop from "./HomeDesktop";
import { useQuery } from "@tanstack/react-query";
import CustomAxios from "../../services/customAxios";

export default function Home() {
    const list = ["#C8E2FB", "#F7E4DF", "#DCD9F7"];
    const device = useDeviceType();
    const axios = new CustomAxios();

    const {data, isLoading} = useQuery({
        queryKey: ["cities"],
        queryFn : async () => {
            const res = axios.instance.get("/Home/Cities");
            return res;
        }
    })

    if(isLoading) {
        return <div>Loading...</div>
    }
    console.log(data);

    if (device === "desktop") {
        return <HomeDesktop />;
    } else
        return (
            <div className={styles.container}>
                <div className={styles.head}>
                    <h1 className="titleh1">
                        Encontre os melhores lugares para <span>Cuidar</span> da Sua{" "}
                        <span>Saúde</span>
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
                    {list.map((item, index) => {
                        return <FeedItem key={index} color={item} />;
                    })}
                </div>
            </div>
        );
}
