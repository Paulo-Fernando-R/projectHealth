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

export default class HomeController {
    axios: IcustomAxios;
    repository: IMetadataRepository;
    stablishmentRepository: IStablishmentRepository;
    getCitiesCase: GetCitiesCase;
    getTypesCase: GetTypesCase;
    getStablishmentsCase: GetStablishmentsCase;

    constructor() {
        this.axios = new CustomAxios();
        this.repository = new MetadataRepository(this.axios);
        this.stablishmentRepository = new StablishmentRepository(this.axios);
        this.getCitiesCase = new GetCitiesCase(this.repository);
        this.getTypesCase = new GetTypesCase(this.repository);
        this.getStablishmentsCase = new GetStablishmentsCase(this.stablishmentRepository);
    }

    async getCities() {
        return await this.getCitiesCase.execute();
    }

    async getTypes() {
        return await this.getTypesCase.execute();
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

        return { cities, types };
    }
    splitType(type: string) {
        const parts = type.split("-");
        return { typeCode: parts[0], type: parts[1] };
    }

    async getStablishments(city: DropdowItem | null, stabType: DropdowItem | null, search: string) {
       
        const { typeCode, type } = stabType
            ? this.splitType(stabType.id)
            : { typeCode: "", type: "" };

        const res = await this.getStablishmentsCase.execute(
            city?.id ? city.id : "",
            type,
            typeCode,
            search
        );

        return res.map((e) => {
            const randomIndex = Math.floor(Math.random() * feedColors.length);

            return { data: e, color: feedColors[randomIndex] };
        });
    }
}
