/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";
import Feed, { FeedError, FeedPlaceholder } from "../../components/Feed/Feed";

export default function HomeMobile() {
    const controller = new HomeController();
    const [city, setCity] = useState<DropdowItem | null>(null);
    const [type, setType] = useState<DropdowItem | null>(null);
    const [search, setSearch] = useState("");
    const [showImg, setShowImg] = useState(true);
    const firstRender = useRef(true);

    const { data, isLoading } = useQuery({
        queryKey: ["cities"],
        queryFn: () => controller.getMetadata(),
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["stablishments"],
        queryFn: ({ pageParam }) => controller.getStablishments(city, type, search, pageParam),
        initialPageParam: 0,
        getNextPageParam: controller.handleNextPage,
        enabled: false,
    });

    function refetch() {
        infiniteQuery.refetch();
        setShowImg(false);
    }
    function fetchNextPage() {
        infiniteQuery.fetchNextPage();
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        refetch();
    }, [city, type]);

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

            {showImg && (
                <div className={styles.imgBox}>
                    <img src={img} alt="" className={styles.img} />
                </div>
            )}

            <Filter
                cities={data?.cities ||[]}
                types={data?.types || []}
                setCitySelected={setCity}
                setTypeSelected={setType}
                search={search}
                setSearch={setSearch}
                action={refetch}
                enabled={!isLoading}
            />

            {infiniteQuery.isRefetching ? (
                <FeedPlaceholder />
            ) : infiniteQuery.isError ? (
                <FeedError />
            ) : infiniteQuery.data?.pages[0].length == 0 ? (
                <FeedError text="Nenhum estabelecimento encontrado" />
            ) : (
                <Feed data={infiniteQuery.data?.pages.flat() || []} onDataEnd={fetchNextPage} />
            )}
        </div>
    );
}
