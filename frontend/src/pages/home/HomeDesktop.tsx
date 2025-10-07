import styles from "./homeDesktop.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import FeedItem from "../../components/feedItem/FeedItem";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";

export default function HomeDesktop() {
    const controller = new HomeController();
    const [city, setCity] = useState<DropdowItem | null>(null);
    const [type, setType] = useState<DropdowItem | null>(null);
    const [search, setSearch] = useState("");
    const firstRender = useRef(true);
    

    const { data, isLoading } = useQuery({
        queryKey: ["cities"],
        queryFn: () => controller.getMetadata(),
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    const mutation = useMutation({
        mutationKey: ["stablishments", city, type, search],
        mutationFn: () => controller.getStablishments(city, type, search),
    });

    const action = () => {
        mutation.mutate();
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        action();
    }, [city, type]);

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

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
                <Filter
                    cities={data.cities}
                    types={data.types}
                    setCitySelected={setCity}
                    setTypeSelected={setType}
                    search={search}
                    setSearch={setSearch}
                    action={action}
                />

                <div className={styles.feed}>
                    {mutation.data?.map((item, index) => {
                        return <FeedItem key={index} color={item.color} data={item.data} />;
                    })}
                </div>
            </div>
        </div>
    );
}
