import { DBService } from "./db/db.service";
import { MongoDBService } from "./db/mongoDB.service";
import { CSVParser } from "./services/csvParser.service";
import { FileParser } from "./services/fileParser.service";
import { JSONParser } from "./services/jsonParser.service";

async function main() {
  const dbService: DBService = new MongoDBService();
  await dbService.connect();
  const csvParser: FileParser = new CSVParser(dbService);
  const jsonParser: FileParser = new JSONParser(dbService);
 
  // await csvParser.process("src/input/test.json");
  await jsonParser.process("src/input/test.json");
  process.exit(0);
}
//to do add dotenv for mongodb url
//to do add test case if file is not structured - CSV/JSON
//to do README
//to
main();
