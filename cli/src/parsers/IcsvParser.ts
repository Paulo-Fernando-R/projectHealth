import type Stream from "stream";

export interface ICsvParser {
    parse(filePath: string): Promise<Stream.Transform>
}
