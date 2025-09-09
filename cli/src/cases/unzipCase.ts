import type { IZip } from "../parsers/Izip.ts";

export class UnzipCase {
    private parser: IZip;
    constructor(parser: IZip) {
        this.parser = parser;
    }

    async execute(filePath: string, extractTo: string) {
        try {
            this.parser.unzip(filePath, extractTo);
        } catch (error) {
            throw error;
        }
    }
}
