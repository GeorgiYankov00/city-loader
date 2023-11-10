export interface FileParser {
  process(path: string): Promise<void>;
}
