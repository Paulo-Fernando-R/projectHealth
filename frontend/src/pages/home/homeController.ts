import GetCitiesCase from "../../cases/getCitiesCase";
import GetTypesCase from "../../cases/getTypesCase";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import type IMetadataRepository from "../../repositories/ImetadataRepository";
import MetadataRepository from "../../repositories/metadataRepository";
import CustomAxios from "../../services/customAxios";
import type { IcustomAxios } from "../../services/IcustomAxios";
import GetStablishmentsCase from "../../cases/getStablishmentsCase";
import StablishmentRepository from "../../repositories/stablishmentRepository";
import type IStablishmentRepository from "../../repositories/IstablishmentRepository";
import { feedColors } from "../../utils/cssColors";
import type { FeedItemProps } from "../../components/feedItem/FeedItem";
import GetUserLocationCase from "../../cases/getUserLocationCase";
import type IUserIp from "../../services/IuserIp";
import UserIp from "../../services/userIp";
import StringSimilarity from "../../utils/stringSimilarity";
import { Axios } from "axios";

export default class HomeController {
    axios: IcustomAxios;
    repository: IMetadataRepository;
    stablishmentRepository: IStablishmentRepository;
    geoIp: IUserIp;
    getCitiesCase: GetCitiesCase;
    getTypesCase: GetTypesCase;
    getStablishmentsCase: GetStablishmentsCase;
    getUserLocationCase: GetUserLocationCase;
    stringSimilarity: StringSimilarity;
    setCity: React.Dispatch<React.SetStateAction<DropdowItem | null>> = () => {};

    constructor(setCity: React.Dispatch<React.SetStateAction<DropdowItem | null>>) {
        this.axios = new CustomAxios();
        this.repository = new MetadataRepository(this.axios);
        this.stablishmentRepository = new StablishmentRepository(this.axios);
        this.geoIp = new UserIp(new Axios());
        this.getCitiesCase = new GetCitiesCase(this.repository);
        this.getTypesCase = new GetTypesCase(this.repository);
        this.getStablishmentsCase = new GetStablishmentsCase(this.stablishmentRepository);
        this.getUserLocationCase = new GetUserLocationCase(this.geoIp);
        this.stringSimilarity = new StringSimilarity();
        this.setCity = setCity;
    }

    async getCities() {
        return await this.getCitiesCase.execute();
    }

    async getTypes() {
        return await this.getTypesCase.execute();
    }

    async geGeoIp() {
        return await this.getUserLocationCase.execute();
    }

    async getCityByGeoIp(cities: DropdowItem[]) {
        const location = await this.geGeoIp();
        if (!location) return;

        const res = this.stringSimilarity.compare(cities, location.location.city);
        if (res) this.setCity(() => res);
    }

    async getMetadata() {
        const res1 = await this.getCitiesCase.execute();
        const res2 = await this.getTypesCase.execute();

        const cities: DropdowItem[] = res1.map((city) => {
            return { id: city.code, name: `${city.name} (${city.state})` };
        });

        const types: DropdowItem[] = res2.map((type) => {
            return { id: `${type.typeCode}-${type.type}`, name: type.description };
        });

        this.getCityByGeoIp(cities);

        return { cities, types };
    }
    splitType(type: string) {
        const parts = type.split("-");
        return { typeCode: parts[0], type: parts[1] };
    }

    async getStablishments(
        city: DropdowItem | null,
        stabType: DropdowItem | null,
        search: string,
        page: number
    ) {
        const { typeCode, type } = stabType
            ? this.splitType(stabType.id)
            : { typeCode: "", type: "" };

        const res = await this.getStablishmentsCase.execute(
            city?.id ? city.id : "",
            type,
            typeCode,
            search,
            page
        );

        return res.map((e) => {
            const randomIndex = Math.floor(Math.random() * feedColors.length);

            return { data: e, color: feedColors[randomIndex] };
        });
    }

    handleNextPage(lastPage: FeedItemProps[], _pages: FeedItemProps[][], lastPageParam: number) {
        if (lastPage.length < 10) {
            return;
        }
        return lastPageParam + 10;
    }
}
