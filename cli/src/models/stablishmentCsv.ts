import { BinaryResponse } from "./binaryResponseEnum.ts";

import { PersonType } from "./personTypeEnum.ts";

// Enums para campos com domínios de valores pré-definidos

export enum DependencyLevel {
    Individual = "1",
    Mantido = "3",
}

export enum ConsignorEntity {
    SES = "1",
    SMS = "2",
}

export enum SanitaryLicenseType {
    Total = "1",
    ParcialOuRestricoes = "2",
}

// Interface principal combinando nomes e restrições
export interface StablishmentCSV {
    CO_UNIDADE: string;
    CO_CNES: string | null;
    NU_CNPJ_MANTENEDORA: string | null;
    TP_PFPJ: PersonType | null;
    NIVEL_DEP: DependencyLevel | null;
    NO_RAZAO_SOCIAL: string;
    NO_FANTASIA: string;
    NO_LOGRADOURO: string;
    NU_ENDERECO: string | null;
    NO_COMPLEMENTO: string | null;
    NO_BAIRRO: string;
    CO_CEP: string;
    CO_REGIAO_SAUDE: string | null;
    CO_MICRO_REGIAO: string | null;
    CO_DISTRITO_SANITARIO: string | null;
    CO_DISTRITO_ADMINISTRATIVO: string | null;
    NU_TELEFONE: string | null;
    NU_FAX: string | null;
    NO_EMAIL: string | null;
    NU_CPF: string | null;
    NU_CNPJ: string | null;
    CO_ATIVIDADE: string | null;
    CO_CLIENTELA: string | null;
    NU_ALVARA: string | null;
    DT_EXPEDICAO: Date | null;
    TP_ORGAO_EXPEDIDOR: ConsignorEntity | null;
    DT_VAL_LIC_SANI: Date | null;
    TP_LIC_SANI: SanitaryLicenseType | null;
    TP_UNIDADE: string | null;
    CO_TURNO_ATENDIMENTO: string | null;
    CO_ESTADO_GESTOR: string | null;
    CO_MUNICIPIO_GESTOR: string;
    //DT_ATUALIZACAO: string;
   "TO_CHAR(DT_ATUALIZACAO,'DD/MM/YYYY')": string;
    CO_USUARIO: string;
    CO_CPFDIRETORCLN: string | null;
    REG_DIRETORCLN: string | null;
    ST_ADESAO_FILANTROP: BinaryResponse | null;
    CO_MOTIVO_DESAB: string | null;
    NO_URL: string | null;
    NU_LATITUDE: string | null;
    NU_LONGITUDE: string | null;
    "TO_CHAR(DT_ATU_GEO,'DD/MM/YYYY')": Date | null;
    NO_USUARIO_GEO: string | null;
    CO_NATUREZA_JUR: string | null;
    TP_ESTAB_SEMPRE_ABERTO: BinaryResponse | null;
    ST_GERACREDITO_GERENTE_SGIF: BinaryResponse | null;
    ST_CONEXAO_INTERNET: BinaryResponse | null;
    CO_TIPO_UNIDADE: string | null;
    NO_FANTASIA_ABREV: string | null;
    TP_GESTAO: string | null;
    "TO_CHAR(DT_ATUALIZACAO_ORIGEM,'DD/MM/YYYY')": string | null;
    CO_TIPO_ESTABELECIMENTO: string | null;
    CO_ATIVIDADE_PRINCIPAL: string | null;
    ST_CONTRATO_FORMALIZADO: BinaryResponse | null;
    CO_TIPO_ABRANGENCIA: string | null;
    ST_COWORKING: string | null;
}
