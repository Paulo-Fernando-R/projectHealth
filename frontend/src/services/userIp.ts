import type { Axios } from "axios";
import type { GeoIPModel } from "../models/geoIpModel";
import type IUserIp from "./IuserIp";

export default class UserIp implements IUserIp {
    axios: Axios;
    private locationUrl = import.meta.env.VITE_PUBLIC_LOCATION_URL;
    private ipUrl = import.meta.env.VITE_PUBLIC_IP_URL;
    private locationKey = import.meta.env.VITE_PUBLIC_LOCATION_KEY;
    constructor(axios: Axios) {
        this.axios = axios;
    }

    async getUserIp() {
        const res = await this.axios.get(this.ipUrl);
        if (res.status !== 200) {
            throw new Error("Failed to get user ip");
        }
        if (!JSON.parse(res.data).ip) {
            throw new Error("Failed to get user ip");
        }
        return JSON.parse(res.data).ip as string;
    }

    async getUserLocation() {
        const ip = await this.getUserIp();

        const res = await this.axios.get(`${this.locationUrl}${this.locationKey}&ip=${ip}`);
        const data = JSON.parse(res.data) as GeoIPModel;

        if (res.status !== 200) {
            throw new Error("Failed to get user location");
        }
        if (!data) {
            throw new Error("Failed to get user location");
        }
        return data;
    }
}
