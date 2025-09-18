import { InsertFileError } from "../errors/customErrors.ts";
import type { ConfigType } from "../types/configType.ts";
import { stablishmentServiceHeaders } from "../utils/csvHeaders.ts";
import type { IConnection } from "./Iconnection.ts";
import fs from "fs";

export class StablishmentServiceRepository {
    appConfig: ConfigType;
    connection: IConnection;

    constructor(appConfig: ConfigType, connection: IConnection) {
        this.appConfig = appConfig;
        this.connection = connection;
    }

    async insertFile(file: string) {
        await this.connection.connect();

        try {
            await this.connection.connection?.query({
                sql: `LOAD DATA LOCAL INFILE '${file}'
                INTO TABLE stablishmentService
                FIELDS TERMINATED BY ','
                ENCLOSED BY '"'
                LINES TERMINATED BY '\n'
                IGNORE 1 LINES
                (${stablishmentServiceHeaders.join(", ")});`,
                infileStreamFactory: () => fs.createReadStream(file),
            });
            await this.connection.disconnect();
        } catch (error) {
            await this.connection.disconnect();
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        }
    }
}
