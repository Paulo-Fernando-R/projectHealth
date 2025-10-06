/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import FeedItem from "../../components/feedItem/FeedItem";
import useDeviceType from "../../hooks/useDeviceType";
import HomeDesktop from "./HomeDesktop";
import { useQuery, useMutation } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const list = ["#C8E2FB", "#F7E4DF", "#DCD9F7"];
    const device = useDeviceType();
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

    async function action() {
        await mutation.mutateAsync();
    }

    useEffect(() => {
        if (!firstRender.current) {
            action();
        }
    }, [city, type]);

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }
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

                {list.length !== 0 && (
                    <div className={styles.imgBox}>
                        <img src={img} alt="" className={styles.img} />
                    </div>
                )}

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
                    {list.map((item, index) => {
                        return <FeedItem key={index} color={item} />;
                    })}
                </div>
            </div>
        );
}
