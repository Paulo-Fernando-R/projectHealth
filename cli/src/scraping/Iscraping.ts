export interface IScraping {
    fetchData(): Promise<
        | {
              href: string | null;
              text: string;
          }
        | undefined
    >;

    downloadFile(fileName: string, directory?: string): Promise<void>;
    scrapeUrl: string;
    downloadUrl: string;
}
