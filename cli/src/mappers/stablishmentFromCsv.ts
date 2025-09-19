import type { StablishmentCSV } from "../models/stablishmentCsv.ts";
import type { Stablishment } from "../models/stablishment.ts";
import { dateFormat } from "../utils/dateFormat.ts";

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
            lastUpdate: dateFormat.normalizeDate(this.csv["TO_CHAR(DT_ATUALIZACAO,'DD/MM/YYYY')"]),
            deactivationCode: this.csv.CO_MOTIVO_DESAB,
            url: this.csv.NO_URL,
            latitude: this.csv.NU_LATITUDE,
            longitude: this.csv.NU_LONGITUDE,
            alwaysOpen: this.csv.TP_ESTAB_SEMPRE_ABERTO,
            contractWithSus: this.csv.ST_CONTRATO_FORMALIZADO,
            unitTypeCode: Number.parseInt(this.csv.TP_UNIDADE || "-1"),
            stablishmentTypeCode: Number.parseInt(this.csv.CO_TIPO_ESTABELECIMENTO || "-1"),
            cityCode: this.csv.CO_MUNICIPIO_GESTOR,
            legalNatureCode: this.csv.CO_NATUREZA_JUR!,
        };

        return stablishment;
    }

    normalizeDate(date: string) {
       
        if (!date) {
            const now = new Date(Date.now());
            return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
        }
        const [day, month, year] = date.split("/").map(Number);
        if (!day || !month || !year) {
            const now = new Date(Date.now());
            return now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate();
        }

        return `${year}-${month}-${day};`;
    }
}
