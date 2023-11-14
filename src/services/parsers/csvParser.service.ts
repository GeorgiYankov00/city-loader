import { FileParser } from "./fileParser.service";
import readline from "readline";
import { DBService } from "../db/db.service";
import { calculateDensity } from "../../utils/densityCalculator.function";
import { createReadLineStream } from "../../utils/readLineStreamCreator.function";

export class CSVParser implements FileParser {
  private readonly dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  async process(path: string): Promise<void> {
    console.log("Starting to process CSV");
    try {
      const readLineStream = createReadLineStream(path);
      await this.skipFirstLine(readLineStream);
      await this.processFile(readLineStream);
    } catch (error: any) {
      console.error("Unable to parse CSV file. Error: " + error.message);
    }
    console.log("CSV processing completed");
  }

  private async skipFirstLine(
    readLineStream: readline.Interface
  ): Promise<void> {
    await readLineStream[Symbol.asyncIterator]().next();
  }

  private async processFile(readLineStream: readline.Interface): Promise<void> {
    for await (const line of readLineStream) {
      try {
        const trimmedLine = line.trim();
        if (!trimmedLine) {
          continue;
        }

        const elements = trimmedLine.split(";");
        const name = elements[0];
        const area = parseFloat(elements[1]);
        const population = parseFloat(elements[2]);
        const density = calculateDensity(population, area);

        await this.dbService.save({ name, area, population, density });
      } catch (error: any) {
        console.error(
          `Unable to parse CSV line: ${line}. Error: ${error.message}`
        );
      }
    }
  }
}
