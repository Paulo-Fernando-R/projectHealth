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
            await this.switchConstraints(false);
            await this.connection.connection?.query("TRUNCATE TABLE stablishmentService;");
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
        } catch (error) {
            throw new InsertFileError(`Error inserting file: ${file} ` + error);
        } finally {
            await this.switchConstraints(true);
            await this.connection.disconnect();
        }
    }

    private async switchConstraints(control: boolean) {
        if (control) {
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 1;");
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 1;");
        } else {
            await this.connection.connection?.query("SET SQL_SAFE_UPDATES = 0;");
            await this.connection.connection?.query("SET FOREIGN_KEY_CHECKS = 0;");
        }
    }
}
