import type IUserIp from "../services/IuserIp";

export default class GetUserLocationCase {
    geoIp: IUserIp;

    constructor(geoIp: IUserIp) {
        this.geoIp = geoIp;
    }

    async execute() {
        try {
            return await this.geoIp.getUserLocation();
        } catch (error) {
            console.log(`Failed to get user location: ${error}`);
            return null;
        }
    }
}
