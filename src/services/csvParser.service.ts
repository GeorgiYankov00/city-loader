import { DBService } from "./../db/db.service";
import { FileParser } from "./fileParser.service";
import fs from "fs";
import readline from "readline";

export class CSVParser implements FileParser {
  private readonly dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  async process(path: string): Promise<void> {
    console.log("Starting file processing");

    const readLineStream = this.createReadLineStream(path);
    await this.skipFirstLine(readLineStream);
    await this.processFile(readLineStream);

    console.log("File processing completed");
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
      const area = parseInt(elements[1]);
      const population = parseInt(elements[2]);
      //to do add density field
      await this.dbService.save({ name, area, population });
    }
  }

  private createReadLineStream(path: string): readline.Interface {
    const fileStream = fs.createReadStream(path);

    return readline.createInterface({
      input: fileStream,
    });
  }
}
