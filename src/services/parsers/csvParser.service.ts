import { FileParser } from "./fileParser.service";
import fs from "fs";
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
    } catch (err: any) {
      console.log("Unable to parse CSV file. Error: " + err.message);
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
      const elements = line.split(";");
      const name = elements[0];
      const area = parseFloat(elements[1]);
      const population = parseFloat(elements[2]);
      const density = calculateDensity(area, population);

      await this.dbService.save({ name, area, population, density });
    }
  }
}
