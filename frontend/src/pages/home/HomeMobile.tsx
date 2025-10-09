/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./home.module.css";
import img from "../../assets/images/doctor.png";
import Filter from "../../components/filter/Filter";
import { useQuery, useMutation } from "@tanstack/react-query";
import HomeController from "./homeController";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import { useEffect, useRef, useState } from "react";
import Feed from "../../components/Feed/Feed";

export default function HomeMobile() {
    const controller = new HomeController();
    const [city, setCity] = useState<DropdowItem | null>(null);
    const [type, setType] = useState<DropdowItem | null>(null);
    const [search, setSearch] = useState("");
    const [showImg, setShowImg] = useState(true);
    const firstRender = useRef(true);

    const switchImg = (control: boolean) => setShowImg(control);

    const { data, isLoading } = useQuery({
        queryKey: ["cities"],
        queryFn: () => controller.getMetadata(),
        staleTime: 1000 * 60 * 60, // 60 minutes
    });

    const mutation = useMutation({
        mutationKey: ["stablishments"],
        mutationFn: () => controller.getStablishments(city, type, search),
        onMutate: () => {
            switchImg(false);
        },

        onSuccess: (data) => {
            if (data?.length === 0) switchImg(true);
        },
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

            {isLoading || !data ? (
                <div>Loading...</div>
            ) : (
                <Filter
                    cities={data.cities}
                    types={data.types}
                    setCitySelected={setCity}
                    setTypeSelected={setType}
                    search={search}
                    setSearch={setSearch}
                    action={action}
                />
            )}
            {!mutation.data && <h2 className="titleh2">Resultados</h2>}

            {mutation.isPending ? (
                <div>Loading...</div>
            ) : (
                <Feed data={mutation.data!} onDataEnd={action} />
            )}
        </div>
    );
}
