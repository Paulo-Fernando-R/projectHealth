import type { Axios } from "axios";
import type { GeoIPModel } from "../models/geoIpModel";

export default interface IUserIp {
    axios: Axios;

    getUserIp(): Promise<string>;
    getUserLocation(): Promise<GeoIPModel>
}
