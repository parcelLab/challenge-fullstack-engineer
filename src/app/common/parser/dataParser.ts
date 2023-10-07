export interface DataParser {
    parse: (path: string) => Promise<any[]>;
}