import { DBService } from "../db/db.service";
import { FileParser } from "./fileParser.service";
import { calculateDensity } from "../../utils/densityCalculator.function";
import { createReadLineStream } from "../../utils/readLineStreamCreator.function";
import readline from "readline";
export class JSONParser implements FileParser {
  private readonly dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  async process(path: string): Promise<any> {
    console.log("Starting to process JSON");
    try {
      const readLineStream = createReadLineStream(path);
      await this.processFile(readLineStream);
    } catch (error: any) {
      console.error("Unable to parse JSON file. Error: " + error.message);
    }
    console.log("JSON processing completed");
  }
  async processFile(readLineStream: readline.Interface): Promise<void> {
    for await (const line of readLineStream) {
      try {
        let trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine === "[" || trimmedLine === "]") {
          continue;
        }
        if (trimmedLine.at(trimmedLine.length - 1) === ",") {
          trimmedLine = trimmedLine.slice(0, -1);
        }
        const city = JSON.parse(trimmedLine);
        city.density = calculateDensity(city.population, city.area);

        await this.dbService.save(city);
      } catch (error: any) {
        console.error(
          `Unable to parse JSON line: ${line}. Error: ${error.message}`
        );
      }
    }
  }
}
