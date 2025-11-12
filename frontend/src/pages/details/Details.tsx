import useDeviceType from "../../hooks/useDeviceType";
import DetailsDesktop from "./DetailsDesktop";
import DetailsMobile from "./DetailsMobile";
import { HeadProvider, Title, Meta } from "react-head";

export default function Details() {
    const device = useDeviceType();
    if (device === "desktop") {
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
                <DetailsDesktop />
            </>
        );
    } else {
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
                <DetailsMobile />
            </>
        );
    }
}
