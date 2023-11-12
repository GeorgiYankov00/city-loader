import { DBService } from "./services/db/db.service";
import { MongoDBService } from "./services/db/mongoDB.service";
import { CSVParser } from "./services/parsers/csvParser.service";
import { FileParser } from "./services/parsers/fileParser.service";
import { JSONParser } from "./services/parsers/jsonParser.service";
import "dotenv/config";

async function main() {
  const dbService: DBService = new MongoDBService();

  await dbService.connect();

  const csvParser: FileParser = new CSVParser(dbService);
  const jsonParser: FileParser = new JSONParser(dbService);

  await Promise.allSettled([
    csvParser.process("src/input/test.csv"),
    jsonParser.process("src/input/test.json"),
  ]);

  process.exit(0);
}

main();
