/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./homeDesktop.module.css";
import img from "../../assets/images/doctor_low.png";
import Filter from "../../components/filter/Filter";
import { useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import Feed, { FeedError, FeedLoadingMore, FeedPlaceholder } from "../../components/Feed/Feed";
import { useSearchParams } from "react-router";
import useUpdateParams from "../../hooks/useUpdateParams";
import { MemoizedImage } from "./Home";

export default function HomeDesktop() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [city, setCity] = useState<DropdowItem | null>(
        HomeController.getCityFromUrl(searchParams)
    );
    const [type, setType] = useState<DropdowItem | null>(
        HomeController.getTypeFromUrl(searchParams)
    );
    const [search, setSearch] = useState(HomeController.getSearchFromUrl(searchParams));
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
    });

    function refetch() {
        infiniteQuery.refetch();
        controller.addParams();
    }
    function fetchNextPage() {
        infiniteQuery.fetchNextPage();
    }

    useUpdateParams(refetch, city, type, firstRender);

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
                    <MemoizedImage url={img} />
                </div>
            </div>

            <div className={styles.right}>
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

                {infiniteQuery.isFetching && !infiniteQuery.isFetchingNextPage ? (
                    <FeedPlaceholder />
                ) : infiniteQuery.isError ? (
                    <FeedError />
                ) : infiniteQuery.data?.pages[0].length == 0 ? (
                    <FeedError text="Nenhum estabelecimento encontrado" />
                ) : (
                    <Feed data={infiniteQuery.data?.pages.flat() || []} onDataEnd={fetchNextPage} />
                )}
                <div className={styles.center}>{infiniteQuery.isFetchingNextPage && <FeedLoadingMore />}</div>
            </div>
        </div>
    );
}
