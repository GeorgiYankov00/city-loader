import { DBService } from "../db/db.service";
import { FileParser } from "./fileParser.service";
import fs from "fs";
import readline from "readline";

export class JSONParser implements FileParser {
  private readonly dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  async process(path: string): Promise<void> {
    console.log("Starting to process JSON");

    const readLineStream = this.createReadLineStream(path);
    await this.processFile(readLineStream);

    console.log("JSON processing completed");
  }

  private async processFile(readLineStream: readline.Interface): Promise<void> {

    for await (const line of readLineStream) {
      console.log(line.trim())
      // if(line.trim() === '[' || line.trim() === ']'){
      //   continue;
      // }
      // console.log("Line: " + JSON.parse(line))
      // const elements = line.split(";");
      // const name = elements[0];
      // const area = parseInt(elements[1]);
      // const population = parseInt(elements[2]);
      //to do add density field
      // await this.dbService.save();
    }
  }

  private createReadLineStream(path: string): readline.Interface {
    const fileStream = fs.createReadStream(path);

    return readline.createInterface({
      input: fileStream,
    });
  }
}
