import { DBService } from "../db/db.service";
import { FileParser } from "./fileParser.service";
import { calculateDensity } from "../../utils/densityCalculator.function";
import { createReadLineStream } from "../../utils/readLineStreamCreator.function";

export class JSONParser implements FileParser {
  private readonly dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  async process(path: string): Promise<any> {
    const readLineStream = createReadLineStream(path);

    for await (const line of readLineStream) {
      try {
        let trimmedLine = line.trim();
        if (trimmedLine === "[" || trimmedLine === "]") {
          continue;
        }
        if (trimmedLine.at(trimmedLine.length - 1) === ",") {
          trimmedLine = trimmedLine.slice(0, -1);
        }
        const city = JSON.parse(trimmedLine);
        city.density = calculateDensity(city.population, city.area);

        await this.dbService.save(city);
      } catch (err) {
        console.log("Unable to parse JSON: " + line);
      }
    }
  }
}
