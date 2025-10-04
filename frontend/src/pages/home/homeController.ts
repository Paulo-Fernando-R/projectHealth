import GetCitiesCase from "../../cases/getCitiesCase";
import GetTypesCase from "../../cases/getTypesCase";
import type { DropdowItem } from "../../components/dropdown/Dropdown";
import type IMetadataRepository from "../../repositories/ImetadataRepository";
import MetadataRepository from "../../repositories/metadataRepository";
import CustomAxios from "../../services/customAxios";
import type { IcustomAxios } from "../../services/IcustomAxios";

export default class HomeController {
    axios: IcustomAxios;
    repository: IMetadataRepository;
    getCitiesCase: GetCitiesCase;
    getTypesCase: GetTypesCase;

    constructor() {
        this.axios = new CustomAxios();
        this.repository = new MetadataRepository(this.axios);
        this.getCitiesCase = new GetCitiesCase(this.repository);
        this.getTypesCase = new GetTypesCase(this.repository);
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
            return { id: parseInt(city.code), name: `${city.name} (${city.state})` };
        });

        const types: DropdowItem[] = res2.map((type) => {
            return { id: parseInt(type.typeCode), name: type.description };
        });

        return { cities, types };
    }
}
