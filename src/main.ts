import { DBService } from "./db/db.service";
import { MongoDBService } from "./db/mongoDB.service";
import { CSVParser } from "./services/csvParser.service";
import { FileParser } from "./services/fileParser.service";

async function main() {
  const dbService: DBService = new MongoDBService();
  const csvParser: FileParser = new CSVParser(dbService);

  await dbService.connect();
  await csvParser.process("src/input/cities.csv");

  process.exit(0);
}
//to do add dotenv for mongodb url
main();
