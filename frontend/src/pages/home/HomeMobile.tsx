/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";
import Feed, { FeedError, FeedPlaceholder } from "../../components/Feed/Feed";
import { useSearchParams } from "react-router";

export default function HomeMobile() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [city, setCity] = useState<DropdowItem | null>(
        HomeController.getCityFromUrl(searchParams)
    );
    const [type, setType] = useState<DropdowItem | null>(
        HomeController.getTypeFromUrl(searchParams)
    );
    const [search, setSearch] = useState(HomeController.getSearchFromUrl(searchParams));

    const [showImg, setShowImg] = useState(true);
    const firstRender = useRef(true);

    const controller = new HomeController(
        city,
        setCity,
        type,
        setType,
        search,
        setSearch,
        searchParams,
        setSearchParams
    );

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
        staleTime: 1000 * 60 * 60,
    });

    function refetch() {
        infiniteQuery.refetch();
        controller.addParams();
      //  setShowImg(false);
    }
    function fetchNextPage() {
        infiniteQuery.fetchNextPage();
    }

    useEffect(() => {
        if (city) {
            refetch();
            return;
        }

        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        refetch();
    }, [city, type]);

    useEffect(() => {
        if (search || city || type) {
            setShowImg(false);
            return;
        }

        setShowImg(true);
    }, [search, city, type]);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1 className="titleh1">
                    Encontre os melhores lugares para <span>Cuidar</span> da Sua <span>Saúde</span>
                </h1>
                {showImg && (
                    <p className={styles.subtitle + " p2"}>
                        Procure por nomes, tipos, lugares ou categorias de estabelecimentos de saúde
                    </p>
                )}
            </div>
            {/* <button onClick={() => setShowImg(!showImg)}>aaaa</button> */}
            <div className={showImg ? styles.imgBox : styles.imgBoxColapse}>
                <img src={img} alt="" className={styles.img} />
                <span>
                    <h2 className={"titleh2 " + styles.imgTitle}>Saúde Localiza</h2>
                    <p className={styles.subtitle + " p2"}>
                        Procure por nomes, tipos, lugares ou categorias de estabelecimentos de saúde
                    </p>
                </span>
            </div>

            <Filter
                cities={data?.cities || []}
                types={data?.types || []}
                citySelected={city}
                setCitySelected={setCity}
                typeSelected={type}
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
