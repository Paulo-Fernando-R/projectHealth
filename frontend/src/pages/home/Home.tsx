import useDeviceType from "../../hooks/useDeviceType";
import HomeMobile from "./HomeMobile";
import HomeDesktop from "./HomeDesktop";
import { memo } from "react";
import { HeadProvider, Title, Meta } from "react-head";

export default function Home() {
    const device = useDeviceType();

    return (
        <>
            <HeadProvider>
                <Title>Saúde Localiza - Encontre estabelecimentos de saúde próximos</Title>
                <Meta
                    name="description"
                    content="Busque hospitais, clínicas e laboratórios próximos a você. Dados oficiais do CNES."
                />
                <meta
                    name="keywords"
                    content="saúde, hospitais, clínicas, CNES, SUS, mapa de saúde"
                />
                <link rel="canonical" href="https://saudelocaliza.com.br/" />
            </HeadProvider>
            {device === "desktop" && <HomeDesktop />}
            {device !== "desktop" && <HomeMobile />}
        </>
    );
}

export const MemoizedImage = memo(({ url }: { url: string }) => {
    return <img src={url} alt="" />;
});
