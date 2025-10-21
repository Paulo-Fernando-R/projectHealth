import GetStablishmentByIdCase from "../../cases/getStablishmentByIdCase";
import type { ExtendedStablishmentModel } from "../../models/stablishmentModel";
import type IStablishmentRepository from "../../repositories/IstablishmentRepository";
import StablishmentRepository from "../../repositories/stablishmentRepository";
import CustomAxios from "../../services/customAxios";
import type { IcustomAxios } from "../../services/IcustomAxios";
import MapLinkFormatter from "../../utils/mapLinkFormatter";

export default class DetailsController {
    axios: IcustomAxios;
    stablishmentRepository: IStablishmentRepository;
    getStablihmentByIdCase: GetStablishmentByIdCase;

    constructor() {
        this.axios = new CustomAxios();
        this.stablishmentRepository = new StablishmentRepository(this.axios);
        this.getStablihmentByIdCase = new GetStablishmentByIdCase(this.stablishmentRepository);
    }

    getStablishmentById(id: string) {
        return this.getStablihmentByIdCase.execute(id);
    }

    formatTags(data: ExtendedStablishmentModel | undefined) {
        const tags = [
            data?.unitType,
            data?.stablishmentType,
            data?.natureDescription,
            `VÍNCULO COM O SUS: ${data?.contractWithSus || data?.isPublic ? "SIM" : "NÃO"}`,
        ];
        return tags;
    }

    formatAppLink(data: ExtendedStablishmentModel | undefined, os: string) {
        const link = MapLinkFormatter.openAppLink(
            os,
            data?.geoposition.latitude,
            data?.geoposition.longitude
        );
        return link;
    }

    openMaps(link: string) {
        window.open(link, "_blank");
    }
}
