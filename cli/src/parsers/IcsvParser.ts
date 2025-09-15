import type Stream from "stream";

export interface ICsvParser {
 parse(filePath: string, separator?: string): Promise<Stream.Transform>
}
