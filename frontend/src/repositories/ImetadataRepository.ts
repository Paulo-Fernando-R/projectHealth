import type CityModel from "../models/cityModel"
import type TypeModel from "../models/typeModel"

export default interface IMetadataRepository {
    getCities(): Promise<CityModel[]>
    getTypes(): Promise<TypeModel[]>
}