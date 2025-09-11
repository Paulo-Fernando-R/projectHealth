// export interface Stablishment {
//     internalId: number;
//     susId: string;
//     cnes: string;
//     personType: boolean;
//     socialReason: string;
//     fantasyName: string;
//     addressNumber: string | null;
//     address: string;
//     addressComplement: string | null;
//     addressDistrict: string;
//     addressCep: string;
//     state: string | null;
//     phone: string | null;
//     email: string | null;
//     cpf: string | null;
//     cnpj: string | null;
//     lastUpdate: Date;
//     deactivationCode: string | null;
//     url: string | null;
//     latitude: string | null;
//     longitude: string | null;
//     alwaysOpen: string | null;
//     contractWithSus: string | null;
//     unitTypeCode: number;
//     stablishmentTypeCode: number;
//     cityCode: string;
//     legalNatureCode: string;
// }

import { PersonType } from "./personTypeEnum.ts";
import { BinaryResponse } from "./binaryResponseEnum.ts";

// Enums para campos com domínios de valores pré-definidos

// Interface principal
export interface Stablishment {
    internalId: number | null;
    susId: string;
    cnes: string;
    personType: PersonType;
    socialReason: string;
    fantasyName: string;
    addressNumber: string | null;
    address: string;
    addressComplement: string | null;
    addressDistrict: string;
    addressCep: string;
    state: string | null;
    phone: string | null;
    email: string | null;
    cpf: string | null;
    cnpj: string | null;
    lastUpdate: Date;
    deactivationCode: string | null;
    url: string | null;
    latitude: string | null;
    longitude: string | null;
    alwaysOpen: BinaryResponse | null;
    contractWithSus: BinaryResponse | null;
    unitTypeCode: number;
    stablishmentTypeCode: number;
    cityCode: string;
    legalNatureCode: string;
}
