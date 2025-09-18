import type { ConfigType } from "../types/configType.ts";
import type { IConnection } from "./Iconnection.ts";
import { openingHoursHeaders } from "../utils/csvHeaders.ts";
import fs from "fs";
import type { IOpeningHoursRepository } from "./IopeningHoursRepository.ts";

export class OpeningHoursRepository implements IOpeningHoursRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertFile(file: string) {
        await this.connection.connect();

        try {
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
            await this.connection.connection?.query({
                sql: `LOAD DATA LOCAL INFILE '${file}'
                INTO TABLE openingHours
                FIELDS TERMINATED BY ','
                ENCLOSED BY '"'
                LINES TERMINATED BY '\n'
                IGNORE 1 LINES
                (${openingHoursHeaders.join(", ")});`,
                infileStreamFactory: () => fs.createReadStream(file),
            });
            await this.connection.disconnect();
        } catch (error) {
            await this.connection.disconnect();
            throw new Error(`Error inserting file: ${file} ` + error);
        }
    }
}
