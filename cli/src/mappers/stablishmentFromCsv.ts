import type { StablishmentCSV } from "../models/stablishmentCsv.ts";
import type { Stablishment } from "../models/stablishment.ts";

export class StablismentFromCsv {
    csv: StablishmentCSV;
    constructor(csv: StablishmentCSV) {
        this.csv = csv;
    }

    map(): Stablishment {
        const stablishment: Stablishment = {
            internalId: null,
            susId: this.csv.CO_UNIDADE,
            cnes: this.csv.CO_CNES!,
            personType: this.csv.TP_PFPJ!,
            socialReason: this.csv.NO_RAZAO_SOCIAL,
            fantasyName: this.csv.NO_FANTASIA,
            addressNumber: this.csv.NU_ENDERECO,
            address: this.csv.NO_LOGRADOURO,
            addressComplement: this.csv.NO_COMPLEMENTO,
            addressDistrict: this.csv.NO_BAIRRO,
            addressCep: this.csv.CO_CEP,
            state: this.csv.CO_ESTADO_GESTOR,
            phone: this.csv.NU_TELEFONE,
            email: this.csv.NO_EMAIL,
            cnpj: this.csv.NU_CNPJ,
            cpf: this.csv.NU_CPF,
            lastUpdate: new Date(this.csv.DT_ATUALIZACAO),
            deactivationCode: this.csv.CO_MOTIVO_DESAB,
            url: this.csv.NO_URL,
            latitude: this.csv.NU_LATITUDE,
            longitude: this.csv.NU_LONGITUDE,
            alwaysOpen: this.csv.TP_ESTAB_SEMPRE_ABERTO,
            contractWithSus: this.csv.ST_CONTRATO_FORMALIZADO,
            unitTypeCode: Number.parseInt(this.csv.TP_UNIDADE!), //this.csv.TP_UNIDADE
            stablishmentTypeCode: Number.parseInt(this.csv.CO_TIPO_ESTABELECIMENTO!),
            cityCode: this.csv.CO_MUNICIPIO_GESTOR,
            legalNatureCode: this.csv.CO_NATUREZA_JUR!,
        };

        return stablishment;
    }
}
